"use client"

import { TextContent } from '@/types/calculators/content'
import { cn } from '@/lib/utils'

interface Props {
  content: TextContent[]
}

export function RichText({ content }: Props) {
  return (
    <>
      {content.map((item, index) => {
        const {
          text,
          annotations = {},
          href
        } = item

        const className = cn(
          annotations.bold && 'font-bold',
          annotations.italic && 'italic',
          annotations.strikethrough && 'line-through',
          annotations.underline && 'underline',
          annotations.code && 'font-mono bg-muted px-1.5 py-0.5 rounded',
          annotations.color && `text-${annotations.color}`
        )

        if (href) {
          return (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(className, 'text-primary hover:underline')}
            >
              {text}
            </a>
          )
        }

        return (
          <span
            key={index}
            className={className}
          >
            {text}
          </span>
        )
      })}
    </>
  )
} 