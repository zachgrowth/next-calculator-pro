"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import type { TocItem } from '@/types/calculators/content'

// 导出类型定义
export interface TocProps {
  items: TocItem[]
  level?: number
}

// 基础静态目录组件
function StaticTocLink({ 
  id, 
  text, 
  isNested = false 
}: { 
  id: string; 
  text: string; 
  isNested?: boolean;
}) {
  return (
    <a
      href={`#${id}`}
      className={cn(
        "inline-block py-1 transition-colors",
        isNested 
          ? "text-sm text-muted-foreground/80 hover:text-muted-foreground" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {text}
    </a>
  )
}

// 导出主组件
export function TableOfContents({ items = [], level = 1 }: TocProps) {
  if (!items?.length) {
    return null
  }

  if (level === 1) {
    return (
      <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-auto">
        <div className="mb-4 text-sm font-medium">目录</div>
        <ul className="space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.id}>
              <StaticTocLink
                id={item.id}
                text={item.text}
              />
              {item.children?.length ? (
                <TableOfContents 
                  items={item.children} 
                  level={level + 1}
                />
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  return (
    <ul className="mt-2 space-y-2 border-l pl-4">
      {items.map((item) => (
        <li key={item.id}>
          <StaticTocLink
            id={item.id}
            text={item.text}
            isNested
          />
          {item.children?.length ? (
            <TableOfContents 
              items={item.children} 
              level={level + 1}
            />
          ) : null}
        </li>
      ))}
    </ul>
  )
} 