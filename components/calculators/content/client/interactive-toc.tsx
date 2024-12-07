'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { TocItem } from '@/types/calculators/content'
import type { TocProps } from '../TableOfContents'

// 客户端链接组件
function ClientTocLink({ 
  id, 
  text, 
  isActive, 
  isNested = false 
}: { 
  id: string; 
  text: string; 
  isActive: boolean; 
  isNested?: boolean;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  return (
    <a
      href={`#${id}`}
      onClick={handleClick}
      className={cn(
        "inline-block py-1 transition-colors",
        isNested 
          ? "text-sm text-muted-foreground/80 hover:text-muted-foreground" 
          : "text-muted-foreground hover:text-foreground",
        isActive && (isNested ? "font-medium text-muted-foreground" : "font-medium text-foreground")
      )}
    >
      {text}
    </a>
  )
}

interface InteractiveTocItemProps extends TocProps {
  activeId?: string;
}

function InteractiveTocItem({ items = [], level = 1, activeId }: InteractiveTocItemProps) {
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
              <ClientTocLink
                id={item.id}
                text={item.text}
                isActive={activeId === item.id}
              />
              {item.children?.length ? (
                <InteractiveTocItem 
                  items={item.children} 
                  level={level + 1}
                  activeId={activeId}
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
          <ClientTocLink
            id={item.id}
            text={item.text}
            isActive={activeId === item.id}
            isNested
          />
          {item.children?.length ? (
            <InteractiveTocItem 
              items={item.children} 
              level={level + 1}
              activeId={activeId}
            />
          ) : null}
        </li>
      ))}
    </ul>
  )
}

export default function InteractiveToc({ items, level = 1 }: TocProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (!items.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '0% 0% -80% 0%',
        threshold: 1.0,
      }
    )

    // 递归观察所有标题
    const observeHeadings = (items: TocItem[]) => {
      items.forEach((item) => {
        const element = document.getElementById(item.id)
        if (element) {
          observer.observe(element)
        }
        if (item.children?.length) {
          observeHeadings(item.children)
        }
      })
    }

    observeHeadings(items)

    return () => {
      const unobserveHeadings = (items: TocItem[]) => {
        items.forEach((item) => {
          const element = document.getElementById(item.id)
          if (element) {
            observer.unobserve(element)
          }
          if (item.children?.length) {
            unobserveHeadings(item.children)
          }
        })
      }

      unobserveHeadings(items)
    }
  }, [items])

  return <InteractiveTocItem items={items} level={level} activeId={activeId} />
} 