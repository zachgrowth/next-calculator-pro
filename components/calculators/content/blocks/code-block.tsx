'use client'

import React from 'react'
import { AnimatedBlock } from './AnimatedBlock'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyButton } from './CopyButton'
import type { CodeBlockProps } from '@/types/calculators/block-components'

export function CodeBlock({ block, blockId }: CodeBlockProps) {
  const content = (
    <div className="relative rounded-lg">
      <div className="absolute right-4 top-4 z-20">
        <CopyButton text={block.content.code} />
      </div>
      <SyntaxHighlighter
        language={block.content.language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          lineHeight: '1.5rem',
        }}
      >
        {block.content.code}
      </SyntaxHighlighter>
    </div>
  )

  return typeof window === 'undefined' ? content : (
    <AnimatedBlock animation="fade-up" className="my-8">
      {content}
    </AnimatedBlock>
  )
}

export default CodeBlock 