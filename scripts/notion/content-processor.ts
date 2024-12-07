import { CalculatorContent, NotionBlock, TocItem } from '@/types/calculators/content'
import { SyncLogger } from './logger'
import { NotionSyncError, NotionSyncErrorCode } from './errors'
import { syncConfig } from './config'
import fs from 'fs/promises'
import path from 'path'

export class NotionContentProcessor {
  private readonly logger: SyncLogger

  constructor() {
    this.logger = SyncLogger.getInstance()
  }

  public async process(content: CalculatorContent): Promise<void> {
    try {
      // 1. 生成目录
      content.toc = this.generateToc(content.blocks)

      // 2. 保存内容到文件
      await this.saveContent(content)

      // 3. 新增：生成并保存类型定义
      await this.saveTypeDefinition(content)
    } catch (error) {
      throw new NotionSyncError(
        NotionSyncErrorCode.CONTENT_PROCESSING_FAILED,
        `处理内容失败: ${error}`,
        error
      )
    }
  }

  private generateToc(blocks: NotionBlock[]): TocItem[] {
    const toc: TocItem[] = []
    const stack: TocItem[] = []

    blocks.forEach((block, index) => {
      if (block.type.startsWith('heading_')) {
        const level = parseInt(block.type.slice(-1)) as 1 | 2 | 3
        const text = Array.isArray(block.content)
          ? block.content.map(item => item.text).join('')
          : ''
        
        const item: TocItem = {
          text,
          level,
          id: `heading-${index}`
        }

        // 根据层级关系构建目录树
        while (stack.length > 0 && stack[stack.length - 1].level >= level) {
          stack.pop()
        }

        if (stack.length === 0) {
          toc.push(item)
        } else {
          const parent = stack[stack.length - 1]
          if (!parent.children) {
            parent.children = []
          }
          parent.children.push(item)
        }

        stack.push(item)
      }
    })

    return toc
  }

  private async saveContent(content: CalculatorContent): Promise<void> {
    const { calculatorId } = content.metadata

    if (!calculatorId) {
      throw new NotionSyncError(
        NotionSyncErrorCode.CONTENT_INVALID,
        '内容没有有效的 calculatorId'
      )
    }

    // 构建文件路径
    const filename = `${calculatorId}.json`
    const outputPath = path.join(syncConfig.paths.content, filename)

    try {
      // 确保目录存在
      await fs.mkdir(path.dirname(outputPath), { recursive: true })

      // 保存内容到文件
      await fs.writeFile(
        outputPath,
        JSON.stringify(content, null, 2),
        'utf-8'
      )

      this.logger.info(`内容已保存到: ${outputPath}`)
    } catch (error) {
      throw new NotionSyncError(
        NotionSyncErrorCode.FILE_OPERATION_FAILED,
        `保存内容到文件失败: ${error}`,
        error
      )
    }
  }

  // 新增：分析内容中使用的块类型
  private analyzeBlockTypes(blocks: NotionBlock[]): Set<string> {
    const types = new Set<string>()
    blocks.forEach(block => {
      types.add(block.type)
      if (block.children) {
        this.analyzeBlockTypes(block.children).forEach(type => types.add(type))
      }
    })
    return types
  }

  // 新增：生成类型定义内容
  private generateTypeDefinition(blockTypes: Set<string>): string {
    return `// 此文件由 content-processor.ts 自动生成
// 最后更新时间: ${new Date().toLocaleString()}

export type BlockType = ${Array.from(blockTypes)
  .map(type => `'${type}'`)
  .join(' | ')};

export interface Block {
  id: string;
  type: BlockType;
  content: any;
  children?: Block[];
}

export interface Content {
  blocks: Block[];
  metadata: Record<string, any>;
  toc?: TocItem[];
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
  children?: TocItem[];
}`
  }

  // 新增：保存类型定义的方法
  private async saveTypeDefinition(content: CalculatorContent): Promise<void> {
    const { calculatorId } = content.metadata
    
    if (!calculatorId) {
      throw new NotionSyncError(
        NotionSyncErrorCode.CONTENT_INVALID,
        '内容没有有效的 calculatorId'
      )
    }

    try {
      // 分析内容中使用的所有块类型
      const blockTypes = this.analyzeBlockTypes(content.blocks)
      
      // 生成类型定义内容
      const typeDefinition = this.generateTypeDefinition(blockTypes)
      
      // 构建类型定义文件路径
      const typePath = path.join(
        syncConfig.paths.types,
        `${calculatorId}.ts`
      )
      
      // 确保目录存在
      await fs.mkdir(path.dirname(typePath), { recursive: true })
      
      // 保存类型定义
      await fs.writeFile(typePath, typeDefinition, 'utf-8')
      
      this.logger.info(`类型定义已保存到: ${typePath}`)
    } catch (error) {
      throw new NotionSyncError(
        NotionSyncErrorCode.FILE_OPERATION_FAILED,
        `保存类型定义失败: ${error}`,
        error
      )
    }
  }
}