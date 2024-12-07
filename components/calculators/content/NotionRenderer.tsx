import { memo, useMemo } from 'react'
import { NotionBlock } from '@/types/calculators/content'
import { BlockRenderer } from './blocks/BlockRenderer'

/**
 * Generate a unique key for each Notion block
 * 为每个 Notion 块生成唯一的 key
 * @param block - The Notion block / Notion 内容块
 * @param index - Fallback index if content is empty / 当内容为空时的后备索引
 * @returns A unique string key / 返回唯一的字符串 key
 */
const getBlockKey = (block: NotionBlock, index: number) => {
  const content = Array.isArray(block.content) 
    ? block.content.map(item => typeof item === 'string' ? item : item.text).join('')
    : ''
  return `${block.type}-${content || index}`
}

/**
 * Props interface for NotionRenderer
 * NotionRenderer 的属性接口
 */
interface NotionRendererProps {
  readonly blocks: readonly NotionBlock[] // Immutable blocks array / 不可变的内容块数组
}

/**
 * Component that renders Notion blocks
 * 渲染 Notion 内容块的组件
 * 
 * Features / 特性:
 * 1. Memoized rendering for performance / 使用记忆化渲染以提高性能
 * 2. Unique key generation for each block / 为每个块生成唯一的 key
 * 3. Read-only props to ensure immutability / 只读属性以确保不可变性
 */
function NotionRendererComponent({ blocks }: NotionRendererProps) {
  // Memoize rendered blocks to prevent unnecessary re-renders
  // 使用 useMemo 缓存渲染结果，防止不必要的重渲染
  const renderedBlocks = useMemo(() => {
    return blocks.map((block, index) => (
      <BlockRenderer key={getBlockKey(block, index)} block={block} />
    ))
  }, [blocks])

  return (
    <div className="notion-content space-y-6">
      {renderedBlocks}
    </div>
  )
}

// Export memoized component with custom comparison
// 导出带有自定义比较函数的记忆化组件
export const NotionRenderer = memo(NotionRendererComponent, (prevProps, nextProps) => {
  // Only re-render if the blocks reference changes
  // 仅当 blocks 数组引用发生变化时才重新渲染
  return prevProps.blocks === nextProps.blocks
}) 