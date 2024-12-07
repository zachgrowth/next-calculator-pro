import React from 'react'
import katex from 'katex'
import type { EquationBlockProps } from '@/types/calculators/block-components'
import { cn } from '@/lib/utils'

// 导入 KaTeX CSS
import 'katex/dist/katex.min.css'

export function EquationBlock({ block, blockId }: EquationBlockProps) {
  const { expression } = block.content

  try {
    // 服务端渲染 LaTeX 公式
    const html = katex.renderToString(expression, {
      displayMode: true,     // 显示模式（居中显示）
      throwOnError: false,   // 发生错误时不抛出异常
      trust: false,          // 禁用不安全的命令
      strict: false,         // 宽松模式，允许一些常见错误
      macros: {
        // 常用宏定义
        '\\RR': '\\mathbb{R}',
        '\\NN': '\\mathbb{N}',
        '\\ZZ': '\\mathbb{Z}',
        '\\QQ': '\\mathbb{Q}',
        '\\CC': '\\mathbb{C}'
      }
    })

    return (
      <div 
        id={blockId}
        className="my-8"
      >
        {/* 公式容器 */}
        <div className={cn(
          "overflow-x-auto",
          "py-6 px-4",
          "bg-zinc-50/50 dark:bg-zinc-900/50",
          "border border-zinc-200 dark:border-zinc-800",
          "rounded-lg"
        )}>
          <div
            className="min-w-0 text-center"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        {/* 公式说明 */}
        {block.content.caption && block.content.caption.length > 0 && (
          <div className={cn(
            "mt-2 text-sm text-center",
            "text-zinc-600 dark:text-zinc-400"
          )}>
            {block.content.caption.map((item, index) => (
              <span
                key={index}
                className={cn(
                  item.annotations?.bold && 'font-bold',
                  item.annotations?.italic && 'italic',
                  item.annotations?.underline && 'underline',
                  item.annotations?.strikethrough && 'line-through',
                  item.annotations?.code && 'font-mono bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-sm'
                )}
              >
                {item.text}
              </span>
            ))}
          </div>
        )}
      </div>
    )
  } catch (error) {
    // 错误处理
    console.error('LaTeX 公式渲染错误:', error)
    return (
      <div 
        className={cn(
          "my-8 p-4",
          "bg-red-50 dark:bg-red-900/20",
          "border border-red-200 dark:border-red-800",
          "rounded-lg"
        )}
        role="alert"
        aria-live="polite"
      >
        <p className="text-sm text-red-600 dark:text-red-400">
          公式渲染失败：{(error as Error).message}
        </p>
      </div>
    )
  }
}

// 添加自定义 KaTeX 样式
const styles = `
  .katex-display {
    margin: 0 !important;
    padding: 0.5rem 0;
  }
  .katex {
    font-size: 1.1em;
    text-rendering: optimizeLegibility;
  }
  .katex-html {
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
  }
`

// 注入自定义样式
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}

export default EquationBlock 