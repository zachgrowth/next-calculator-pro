import React from 'react'
import type { NotionBlock } from '@/types/calculators/content'
import { blockTypeGuards } from '@/types/calculators/block-components'

// SEO 关键组件 - 静态导入以确保服务端渲染
import { HeadingBlock } from './heading-block'
import { ParagraphBlock } from './paragraph-block'
import { ListItemBlock } from './list-item-block'
import { QuoteBlock } from './quote-block'
import { TableBlock } from './table-block'
import { TableRowBlock } from './table-row-block'
import { ImageBlock } from './image-block'
import { EquationBlock } from './equation-block'

interface Props {
  block: NotionBlock
  blockId?: string
}

export function BlockRenderer({ block, blockId }: Props) {
  const id = blockId || `${block.type}-${Math.random().toString(36).substring(2, 9)}`

  const renderBlock = () => {
    switch (block.type) {
      // SEO 关键内容 - 服务端渲染
      case 'heading_1':
      case 'heading_2':
      case 'heading_3':
        if (blockTypeGuards.isHeading(block)) {
          return <HeadingBlock key={id} block={block} blockId={id} />
        }
        break

      case 'paragraph':
        if (blockTypeGuards.isParagraph(block)) {
          return <ParagraphBlock key={id} block={block} blockId={id} />
        }
        break

      case 'bulleted_list_item':
      case 'numbered_list_item':
        if (blockTypeGuards.isListItem(block)) {
          return <ListItemBlock key={id} block={block} blockId={id} />
        }
        break

      case 'table':
        if (blockTypeGuards.isTable(block)) {
          return <TableBlock key={id} block={block} blockId={id} />
        }
        break

      case 'table_row':
        if (blockTypeGuards.isTableRow(block)) {
          return <TableRowBlock key={id} block={block} blockId={id} />
        }
        break

      case 'quote':
        if (blockTypeGuards.isQuote(block)) {
          return <QuoteBlock key={id} block={block} blockId={id} />
        }
        break

      case 'image':
        if (blockTypeGuards.isImage(block)) {
          return <ImageBlock key={id} block={block} blockId={id} />
        }
        break

      case 'equation':
        if (blockTypeGuards.isEquation(block)) {
          return <EquationBlock key={id} block={block} blockId={id} />
        }
        break

      case 'divider':
        return <hr key={id} className="my-8 border-t border-muted" role="separator" aria-hidden="true" />

      default:
        if (process.env.NODE_ENV === 'development') {
          console.warn(`未处理的块类型: ${block.type}`, block)
        }
        return null
    }

    // 如果类型守卫失败，记录错误并返回 null
    console.error(`块类型不匹配: ${block.type}`, block)
    return null
  }

  // 递归渲染子块
  if (block.children?.length) {
    return (
      <div className="block-wrapper" key={id}>
        {renderBlock()}
        <div className="block-children">
          {block.children.map((child, index) => (
            <BlockRenderer 
              key={`${id}-child-${index}`}
              block={child} 
              blockId={`${id}-${index}`}
            />
          ))}
        </div>
      </div>
    )
  }

  return renderBlock()
} 