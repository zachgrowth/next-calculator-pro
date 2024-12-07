'use client'

import React, { Suspense } from 'react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface Props {
  expression: string
}

function KaTeXFallback() {
  return (
    <div className="h-16 animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg" />
  )
}

function KaTeXContent({ expression }: Props) {
  return (
    <BlockMath
      math={expression}
      errorColor="#ef4444"
      renderError={(error) => {
        console.warn('LaTeX 渲染错误:', error)
        return (
          <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
            <p>公式渲染错误：</p>
            <pre className="mt-2 text-xs">{error.message}</pre>
          </div>
        )
      }}
      settings={{
        strict: 'ignore',
        trust: true,
        macros: {
          '\\dd': '\\mathrm{d}',
          '\\RR': '\\mathbb{R}',
          '\\NN': '\\mathbb{N}',
          '\\ZZ': '\\mathbb{Z}',
          '\\CC': '\\mathbb{C}',
          '\\QQ': '\\mathbb{Q}',
          '\\ee': '\\mathrm{e}',
          '\\ii': '\\mathrm{i}'
        }
      }}
    />
  )
}

export default function KaTeXRenderer({ expression }: Props) {
  return (
    <Suspense fallback={<KaTeXFallback />}>
      <KaTeXContent expression={expression} />
    </Suspense>
  )
} 