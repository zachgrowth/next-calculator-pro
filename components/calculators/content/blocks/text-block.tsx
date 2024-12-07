import React from 'react'
import type { ParagraphBlock } from '../../../../types/calculators/content'
import { RichText } from '../RichText'
import { cn } from '@/lib/utils'

interface Props {
  block: ParagraphBlock
}

export function TextBlock({ block }: Props) {
  const isEmpty = block.content.length === 0 || 
    (block.content.length === 1 && block.content[0].text === '')

  return (
    <div className={cn(
      "my-3 text-base leading-7",
      isEmpty && "h-[1.5em]"
    )}>
      <RichText content={block.content} />
    </div>
  )
} 