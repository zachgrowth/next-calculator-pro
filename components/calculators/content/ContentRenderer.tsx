import dynamic from 'next/dynamic'
import { Suspense, memo, useMemo } from 'react'
import { CalculatorContent } from '@/types/calculators/content'
import { NotionRenderer } from './NotionRenderer'
import { TableOfContents } from './TableOfContents'

// 客户端动态导入的组件
const DynamicTableOfContents = dynamic(() => Promise.resolve(TableOfContents), {
  loading: () => (
    <div className="mb-8 space-y-2">
      <div className="animate-pulse bg-gray-200 h-4 w-1/4 rounded"></div>
      <div className="animate-pulse bg-gray-200 h-4 w-1/2 rounded"></div>
    </div>
  ),
  ssr: true // 启用服务端渲染
})

interface ContentRendererProps {
  content: CalculatorContent
}

function ContentRendererComponent({ content }: ContentRendererProps) {
  const memoizedBlocks = useMemo(() => content.blocks, [content])
  const memoizedToc = useMemo(() => content.toc, [content])

  return (
    <div className="max-w-4xl mx-auto">
      {/* 目录部分 */}
      <aside className="mb-8">
        <DynamicTableOfContents items={memoizedToc} />
      </aside>

      {/* 内容部分 - 直接渲染以支持 SEO */}
      <article className="prose prose-slate max-w-none">
        <NotionRenderer blocks={memoizedBlocks} />
      </article>
    </div>
  )
}

// 使用 memo 包装整个组件
export const ContentRenderer = memo(ContentRendererComponent) 