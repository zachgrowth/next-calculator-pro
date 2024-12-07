import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import type { 
  PageObjectResponse, 
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import type { 
  NotionBlock, 
  TextContent, 
  CalculatorContent,
  TocItem,
  ListItemBlock,
  TableRowBlock,
  HeadingBlock,
} from '../types/calculators/content'

// 简单的内存缓存实现
const memoryCache = new Map<string, any>()
const cacheWithTTL = (key: string, value: any, ttl: number = 3600000) => {
  memoryCache.set(key, {
    value,
    expiry: Date.now() + ttl
  })
}
const getFromCache = (key: string) => {
  const cached = memoryCache.get(key)
  if (!cached) return null
  if (Date.now() > cached.expiry) {
    memoryCache.delete(key)
    return null
  }
  return cached.value
}

// 检查环境变量
const NOTION_TOKEN = process.env.NOTION_TOKEN
if (!NOTION_TOKEN) {
  throw new Error('NOTION_TOKEN is not defined')
}

console.log('初始化 Notion 客户端...')
console.log('Token:', NOTION_TOKEN)

// 创建 Notion 客户端
const notion = new Client({
  auth: NOTION_TOKEN,
  notionVersion: '2022-06-28'
})

// 创建 NotionToMarkdown 实例
const n2m = new NotionToMarkdown({ notionClient: notion })

// 将 Notion 富文本转换为我们的文本内容格式
function convertRichText(richText: RichTextItemResponse[]): TextContent[] {
  try {
    return richText.map(item => ({
      text: item.plain_text,
      annotations: item.annotations,
      href: item.href ?? undefined,
    }))
  } catch (error) {
    console.error('Error converting rich text:', error)
    return []
  }
}

// 处理图片 URL
function getLocalImageUrl(notionUrl: string): string {
  // 示例图片映射
  const imageMap: Record<string, string> = {
    'male-reference': '/images/body-fat/male-reference.jpg',
    'female-reference': '/images/body-fat/female-reference.jpg',
    'waist-measurement': '/images/body-fat/waist-measurement.jpg',
    'neck-measurement': '/images/body-fat/neck-measurement.jpg',
    'hip-measurement': '/images/body-fat/hip-measurement.jpg',
    'measurement-tips': '/images/body-fat/measurement-tips.jpg',
  }

  // 从 Notion URL 中提取图片名称
  const imageName = Object.keys(imageMap).find(name => notionUrl.includes(name))
  return imageName ? imageMap[imageName] : notionUrl
}

// 将 Notion 块转换为我们的块格式
async function convertBlock(block: BlockObjectResponse): Promise<NotionBlock | null> {
  try {
    console.log('Converting block:', block.type)
    
    const baseBlock = {
      id: block.id,
      type: block.type,
    }

    switch (block.type) {
      case 'paragraph':
        return {
          ...baseBlock,
          type: 'paragraph',
          content: convertRichText(block.paragraph.rich_text),
        }

      case 'heading_1':
        return {
          ...baseBlock,
          type: 'heading_1',
          content: convertRichText(block.heading_1.rich_text),
        }

      case 'heading_2':
        return {
          ...baseBlock,
          type: 'heading_2',
          content: convertRichText(block.heading_2.rich_text),
        }

      case 'heading_3':
        return {
          ...baseBlock,
          type: 'heading_3',
          content: convertRichText(block.heading_3.rich_text),
        }

      case 'bulleted_list_item': {
        const children = block.has_children
          ? await getBlockChildren(block.id)
          : undefined

        const filteredChildren = children?.filter((child): child is ListItemBlock => 
          child?.type === 'bulleted_list_item' || child?.type === 'numbered_list_item'
        )

        return {
          ...baseBlock,
          type: 'bulleted_list_item',
          content: convertRichText(block.bulleted_list_item.rich_text),
          children: filteredChildren,
        }
      }

      case 'numbered_list_item': {
        const children = block.has_children
          ? await getBlockChildren(block.id)
          : undefined

        const filteredChildren = children?.filter((child): child is ListItemBlock => 
          child?.type === 'bulleted_list_item' || child?.type === 'numbered_list_item'
        )

        return {
          ...baseBlock,
          type: 'numbered_list_item',
          content: convertRichText(block.numbered_list_item.rich_text),
          children: filteredChildren,
        }
      }

      case 'table': {
        // 获取表格的子块
        const children = await getBlockChildren(block.id)
        const rows = children
          .filter((child): child is TableRowBlock => child.type === 'table_row')
          .map(row => row.content.cells)

        return {
          ...baseBlock,
          type: 'table',
          content: {
            type: 'table',
            rows,
            hasColumnHeader: block.table.has_column_header,
            hasRowHeader: block.table.has_row_header,
          },
        }
      }

      case 'image':
        return {
          ...baseBlock,
          type: 'image',
          content: {
            type: 'image',
            url: block.image.type === 'external' 
              ? block.image.external?.url 
              : block.image.file?.url,
            caption: block.image.caption?.length 
              ? convertRichText(block.image.caption)
              : undefined,
          },
        }

      case 'equation':
        return {
          ...baseBlock,
          type: 'equation',
          content: {
            type: 'equation',
            expression: block.equation.expression,
          },
        }

      case 'code':
        return {
          ...baseBlock,
          type: 'code',
          content: {
            type: 'code',
            code: block.code.rich_text[0]?.plain_text || '',
            language: block.code.language,
            caption: block.code.caption?.length 
              ? convertRichText(block.code.caption)
              : undefined,
          },
        }

      case 'quote':
        return {
          ...baseBlock,
          type: 'quote',
          content: convertRichText(block.quote.rich_text),
        }

      case 'divider':
        return {
          ...baseBlock,
          type: 'divider',
          content: []
        }

      case 'table_row': {
        const cells = block.table_row.cells.map(cellArray => 
          cellArray.map(richText => convertRichText([richText]))
        ).flat();
        return {
          ...baseBlock,
          type: 'table_row',
          content: {
            type: 'table_row',
            cells,
          },
        };
      }

      default:
        console.warn('Unsupported block type:', block.type)
        return null
    }
  } catch (error) {
    console.error('Error converting block:', error, block)
    return null
  }
}

// 获取块的子块
async function getBlockChildren(blockId: string): Promise<NotionBlock[]> {
  try {
    console.log('Getting children for block:', blockId)
    
    // 检查缓存
    const cacheKey = `block_children_${blockId}`
    const cached = getFromCache(cacheKey)
    if (cached) return cached

    const blocks: NotionBlock[] = []
    let cursor: string | undefined

    while (true) {
      const { results, next_cursor } = await notion.blocks.children.list({
        block_id: blockId,
        start_cursor: cursor,
      })

      const convertedBlocks = await Promise.all(
        results
          .filter((block): block is BlockObjectResponse => 'type' in block)
          .map(block => convertBlock(block))
      )

      blocks.push(...convertedBlocks.filter((block): block is NotionBlock => block !== null))

      if (!next_cursor) break
      cursor = next_cursor
    }

    // 缓存结果
    cacheWithTTL(cacheKey, blocks)

    return blocks
  } catch (error) {
    console.error('Error getting block children:', error)
    return []
  }
}

// 生成目录
function generateToc(blocks: NotionBlock[]): TocItem[] {
  const toc: TocItem[] = []
  let currentH1: TocItem | null = null
  let currentH2: TocItem | null = null

  blocks.forEach(block => {
    if (!('content' in block)) return

    const headingBlock = block as HeadingBlock
    const text = headingBlock.content[0]?.text || ''
    const id = text.toLowerCase().replace(/\s+/g, '-')

    switch (block.type) {
      case 'heading_1':
        currentH1 = { text, id, level: 1, children: [] }
        currentH2 = null
        toc.push(currentH1)
        break

      case 'heading_2':
        if (currentH1) {
          currentH2 = { text, id, level: 2, children: [] }
          currentH1.children = currentH1.children || []
          currentH1.children.push(currentH2)
        }
        break

      case 'heading_3':
        if (currentH2) {
          currentH2.children = currentH2.children || []
          currentH2.children.push({ text, id, level: 3 })
        }
        break
    }
  })

  return toc
}

// 获取页面内容
export async function getPageContent(pageId: string): Promise<CalculatorContent | null> {
  try {
    console.log('Getting page content for:', pageId)

    // 检查缓存
    const cacheKey = `page_content_${pageId}`
    const cached = getFromCache(cacheKey)
    if (cached) return cached

    // 获取页面元数据
    const page = await notion.pages.retrieve({ page_id: pageId })
    if (!('properties' in page)) {
      throw new Error('Invalid page object')
    }

    // 获取页面内容
    const blocks = await getBlockChildren(pageId)
    const toc = generateToc(blocks)

    const content: CalculatorContent = {
      metadata: {
        title: '',
        description: '',
        calculatorId: '',
        status: 'published',
        languages: ['zh-CN'],
        lastUpdated: page.last_edited_time,
        notionId: {
          prefix: null,
          number: 0,
        },
        createDate: page.created_time,
        lastEditTime: page.last_edited_time,
        author: null,
        lastEditor: null,
        url: '',
      },
      blocks,
      toc,
    }

    // 缓存结果
    cacheWithTTL(cacheKey, content)

    return content
  } catch (error) {
    console.error('Error getting page content:', error)
    return null
  }
}

// 获取数据库内容
export async function getDatabase(databaseId: string) {
  try {
    // 检查缓存
    const cacheKey = `database_${databaseId}`
    const cached = getFromCache(cacheKey)
    if (cached) return cached

    const response = await notion.databases.query({
      database_id: databaseId,
    })

    // 缓存结果
    cacheWithTTL(cacheKey, response)

    return response
  } catch (error) {
    console.error('Error getting database:', error)
    return null
  }
} 