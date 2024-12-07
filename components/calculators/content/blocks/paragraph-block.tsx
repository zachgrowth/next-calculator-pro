import React from 'react'
import { RichText } from '../RichText'
import type { ParagraphBlockProps } from '@/types/calculators/block-components'

export function ParagraphBlock({ block }: ParagraphBlockProps) {
  return (
    <p className="my-4 text-zinc-700 dark:text-zinc-300">
      <RichText content={block.content} />
    </p>
  )
}

export default ParagraphBlock 