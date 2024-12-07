import React from 'react'
import { RichText } from '../RichText'
import { BlockRenderer } from './BlockRenderer'
import type { ListItemBlockProps } from '@/types/calculators/block-components'

export function ListItemBlock({ block, blockId }: ListItemBlockProps) {
  const isNested = block.children?.some(child => 
    child.type === 'bulleted_list_item' || child.type === 'numbered_list_item'
  )

  const content = (
    <li className="my-2 text-zinc-700 dark:text-zinc-300">
      <RichText content={block.content} />
      {block.children && (
        <div className={isNested ? 'ml-4' : ''}>
          {block.children.map((child, index) => (
            <BlockRenderer 
              key={`${blockId || child.type}-${index}`} 
              block={child} 
              blockId={`${blockId || child.type}-${index}`}
            />
          ))}
        </div>
      )}
    </li>
  )

  // 只有在最外层时才包装 ul/ol 标签
  if (!isNested) {
    const Tag = block.type === 'bulleted_list_item' ? 'ul' : 'ol'
    return <Tag>{content}</Tag>
  }

  return content
}

export default ListItemBlock 