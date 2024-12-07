import React from 'react'
import type { ListItemBlock } from '@/types/calculators/content'
import { RichText } from '../RichText'
import { cn } from '@/lib/utils'

interface Props {
  block: ListItemBlock
}

export function ListBlock({ block }: Props) {
  const isNested = block.children?.some(child => 
    child.type === 'bulleted_list_item' || child.type === 'numbered_list_item'
  )

  const content = (
    <div className={cn(
      "my-2",
      isNested ? "ml-6" : ""
    )}>
      <div className="flex gap-2">
        <RichText content={block.content} />
        {block.children?.map((child, index) => {
          if (child.type !== 'bulleted_list_item' && child.type !== 'numbered_list_item') {
            return null
          }
          return <ListBlock key={index} block={child as ListItemBlock} />
        })}
      </div>
    </div>
  )

  if (!isNested) {
    const Tag = block.type === 'bulleted_list_item' ? 'ul' : 'ol'
    return <Tag>{content}</Tag>
  }

  return content
} 