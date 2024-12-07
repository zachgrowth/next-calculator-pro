import React from 'react'
import { RichText } from '../RichText'
import { cn } from '@/lib/utils'
import type { TableRowBlockProps } from '@/types/calculators/block-components'

export function TableRowBlock({ block, blockId }: TableRowBlockProps) {
  if (!block.content || !block.content.cells) {
    return null
  }

  return (
    <tr className="border-b border-slate-200 dark:border-slate-800">
      {block.content.cells.map((cell, index) => (
        <td
          key={`${blockId || block.type}-cell-${index}`}
          className={cn(
            "px-4 py-2 text-sm",
            "first:pl-0 last:pr-0",
            "text-zinc-700 dark:text-zinc-300"
          )}
        >
          <RichText content={cell} />
        </td>
      ))}
    </tr>
  )
}

export default TableRowBlock 