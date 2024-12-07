"use client"

import React from 'react'
import { CalculatorContent } from '@/types/calculators/content'
import { BlockRenderer } from './blocks/BlockRenderer'
import { TableOfContents } from './TableOfContents'
import { cn } from '@/lib/utils'

interface Props {
  content: CalculatorContent
}

export function ContentArea({ content }: Props) {
  if (!content?.blocks?.length) {
    return null
  }

  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr,280px]">
        {/* 主要内容区域 */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          {content.blocks.map((block, index) => (
            <BlockRenderer key={index} block={block} />
          ))}
        </div>

        {/* 目录区域 */}
        {content.toc?.length > 0 && (
          <div className="hidden lg:block">
            <TableOfContents items={content.toc} />
          </div>
        )}
      </div>

      {/* 底部装饰 */}
      <div className="mt-16 flex justify-center space-x-8">
        <div className="h-16 w-16">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-full w-full text-muted-foreground/20"
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <path d="M9 9h.01" />
            <path d="M15 9h.01" />
          </svg>
        </div>
        <div className="h-16 w-16">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-full w-full text-muted-foreground/20"
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <path d="M9 9h.01" />
            <path d="M15 9h.01" />
          </svg>
        </div>
      </div>
    </div>
  )
} 