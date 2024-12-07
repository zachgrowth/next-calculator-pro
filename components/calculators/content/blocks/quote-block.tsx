'use client'

import React from 'react'
import type { QuoteBlock as QuoteBlockType } from '@/types/calculators/content'
import { RichText } from '../RichText'
import { cn } from '@/lib/utils'
import { Quote } from 'lucide-react'
import { AnimatedBlock } from './client/animated-wrapper'

interface Props {
  block: QuoteBlockType
  blockId: string
}

export function QuoteBlock({ block, blockId }: Props) {
  const content = (
    <figure className="relative rounded-lg border bg-muted/5 p-6">
      <Quote className="absolute left-4 top-4 h-6 w-6 text-primary/10" />
      <blockquote className={cn(
        "pl-8 pt-4",
        "text-lg text-muted-foreground"
      )}>
        <RichText content={block.content.content} />
        {block.content.caption && block.content.caption.length > 0 && (
          <footer className="mt-2 text-sm text-muted-foreground/80">
            <RichText content={block.content.caption} />
          </footer>
        )}
      </blockquote>
    </figure>
  )

  return typeof window === 'undefined' ? content : (
    <AnimatedBlock animation="fade-up" className="my-8">
      {content}
    </AnimatedBlock>
  )
} 