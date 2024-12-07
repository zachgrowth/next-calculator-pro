import React from 'react'
import type { DividerBlock as DividerBlockType } from '../../../../types/calculators/content'

interface Props {
  block: DividerBlockType
}

export function DividerBlock({ block }: Props) {
  return (
    <hr className="my-8 border-t border-zinc-200 dark:border-zinc-800" />
  )
} 