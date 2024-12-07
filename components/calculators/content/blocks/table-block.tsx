import React from 'react'
import { AnimatedBlock } from './AnimatedBlock'
import { RichText } from '../RichText'
import { cn } from '@/lib/utils'
import type { TableBlockProps } from '@/types/calculators/block-components'

export function TableBlock({ block, blockId }: TableBlockProps) {
  if (!block.content.rows || block.content.rows.length === 0) {
    return null;
  }

  const headerRow = block.content.rows[0]
  const dataRows = block.content.rows.slice(1)

  return (
    <AnimatedBlock
      animation="fade-up"
      className="my-8 w-full"
    >
      <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-white to-zinc-50/80 dark:from-zinc-900 dark:to-zinc-800/90 border border-zinc-200 dark:border-zinc-700">
        <div className="ring-1 ring-zinc-200 dark:ring-zinc-700 shadow-xl">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b-2 border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                {headerRow?.map((cell, index) => (
                  <th
                    key={`${blockId || 'header'}-${index}`}
                    className={cn(
                      "h-14 px-6 text-left align-middle font-bold text-blue-900 dark:text-blue-100",
                      "relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500/40 dark:after:bg-blue-400/40",
                      index === 0 && "rounded-tl-xl",
                      index === headerRow.length - 1 && "rounded-tr-xl"
                    )}
                  >
                    <RichText content={cell} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-700/70">
              {dataRows.map((row, rowIndex) => (
                <tr
                  key={`${blockId || 'row'}-${rowIndex}`}
                  className={cn(
                    "transition-all duration-200",
                    "hover:bg-blue-50/90 dark:hover:bg-blue-900/30 hover:shadow-inner",
                    rowIndex % 2 === 0 && "bg-gradient-to-r from-zinc-50/50 to-transparent dark:from-zinc-800/30 dark:to-transparent",
                    rowIndex === dataRows.length - 1 && "last-row"
                  )}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${blockId || 'cell'}-${rowIndex}-${cellIndex}`}
                      className={cn(
                        "px-6 py-4 align-middle text-zinc-700 dark:text-zinc-300",
                        "transition-colors duration-200",
                        cellIndex === 0 && "font-semibold text-blue-800 dark:text-blue-200",
                        rowIndex === dataRows.length - 1 && cellIndex === 0 && "rounded-bl-xl",
                        rowIndex === dataRows.length - 1 && cellIndex === row.length - 1 && "rounded-br-xl"
                      )}
                    >
                      <RichText content={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-black/5 dark:ring-white/5" />
      </div>
    </AnimatedBlock>
  )
}

export default TableBlock 