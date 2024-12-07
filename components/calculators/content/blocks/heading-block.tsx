import React from 'react'
import { cn, slugify } from '@/lib/utils'
import { RichText } from '../RichText'
import type { HeadingBlockProps } from '@/types/calculators/block-components'

export function HeadingBlock({ block, blockId }: HeadingBlockProps) {
  const text = block.content.map(item => item.text).join('')
  const id = blockId || slugify(text)
  const Tag = block.type === 'heading_1' 
    ? 'h1' 
    : block.type === 'heading_2'
      ? 'h2'
      : 'h3'

  return (
    <Tag 
      id={id}
      className={cn(
        "scroll-m-20 font-semibold tracking-tight",
        block.type === 'heading_1' && "mt-12 mb-4 text-4xl",
        block.type === 'heading_2' && "mt-10 mb-3 text-2xl",
        block.type === 'heading_3' && "mt-8 mb-2 text-xl"
      )}
    >
      <RichText content={block.content} />
    </Tag>
  )
}

export default HeadingBlock 