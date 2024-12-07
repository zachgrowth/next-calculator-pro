'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ExternalLinkIcon } from 'lucide-react'

interface Props {
  href: string
  children: React.ReactNode
  className?: string
}

export function LinkPreview({ href, children, className }: Props) {
  const [isHovered, setIsHovered] = useState(false)
  const isExternal = href.startsWith('http')

  return (
    <span className="relative inline-block">
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={cn(
          "inline-flex items-center gap-0.5 font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
        {isExternal && (
          <ExternalLinkIcon className="h-3 w-3" />
        )}
      </a>
      {isHovered && isExternal && (
        <div
          className={cn(
            "absolute -top-14 left-0 z-50 w-64 animate-in fade-in zoom-in-95",
            "rounded-lg border bg-background p-3 shadow-lg"
          )}
        >
          <div className="text-xs text-muted-foreground">
            {new URL(href).hostname}
          </div>
          <div className="mt-1 truncate text-sm">
            {href}
          </div>
        </div>
      )}
    </span>
  )
} 