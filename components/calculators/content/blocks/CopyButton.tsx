'use client'

import { useState } from 'react'
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

interface Props {
  text: string
}

export function CopyButton({ text }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "absolute right-4 top-4 rounded-md p-2 transition-colors",
        "hover:bg-muted-foreground/10",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      )}
      title="复制公式"
      type="button"
    >
      {copied ? (
        <CheckIcon className="h-4 w-4 text-green-500" />
      ) : (
        <ClipboardIcon className="h-4 w-4 text-muted-foreground" />
      )}
      <span className="sr-only">复制公式</span>
    </button>
  )
} 