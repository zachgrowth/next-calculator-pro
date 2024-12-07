'use client'

import React from 'react'
import Image from 'next/image'
import { RichText } from '../RichText'
import { cn } from '@/lib/utils'
import type { ImageBlockProps } from '@/types/calculators/block-components'

export function ImageBlock({ block, blockId }: ImageBlockProps) {
  const { url, caption } = block.content

  // 如果没有有效的图片URL，显示错误状态
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return (
      <div 
        className="my-8 p-4 rounded-xl bg-destructive/10 border border-destructive/20"
        role="alert"
        aria-live="polite"
      >
        <p className="text-sm text-destructive">
          图片加载失败：无效的图片地址
        </p>
      </div>
    )
  }

  return (
    <figure className="my-8">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-white to-zinc-50/80 dark:from-zinc-900 dark:to-zinc-800/90 border border-zinc-200 dark:border-zinc-700">
        <div className="relative aspect-[16/9]">
          <Image
            src={url}
            alt={caption?.map(item => item.text).join('') || ''}
            fill
            className={cn(
              "object-cover transition-all duration-300",
              "group-hover:scale-105"
            )}
            sizes="(min-width: 1024px) 80vw, 100vw"
            priority={true}
            onError={(e) => {
              console.error('图片加载失败:', url)
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.parentElement?.insertAdjacentHTML(
                'beforeend',
                `<div class="absolute inset-0 flex items-center justify-center bg-muted">
                  <p class="text-sm text-muted-foreground">图片加载失败</p>
                </div>`
              )
            }}
          />
        </div>
      </div>
      {caption && caption.length > 0 && (
        <figcaption className="mt-3 text-sm text-center text-zinc-500 dark:text-zinc-400">
          <RichText content={caption} />
        </figcaption>
      )}
    </figure>
  )
}

export default ImageBlock 