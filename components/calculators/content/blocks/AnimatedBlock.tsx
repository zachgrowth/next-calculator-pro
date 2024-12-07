'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-in' | 'slide-in' | 'zoom-in'
  delay?: number
}

export function AnimatedBlock({
  children,
  className,
  animation = 'fade-up',
  delay = 0
}: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold: 0.1,
      }
    )

    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [delay])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        // 淡入上移动画
        animation === 'fade-up' && [
          "translate-y-8 opacity-0",
          isVisible && "translate-y-0 opacity-100"
        ],
        // 淡入动画
        animation === 'fade-in' && [
          "opacity-0",
          isVisible && "opacity-100"
        ],
        // 滑入动画
        animation === 'slide-in' && [
          "-translate-x-8 opacity-0",
          isVisible && "translate-x-0 opacity-100"
        ],
        // 缩放动画
        animation === 'zoom-in' && [
          "scale-95 opacity-0",
          isVisible && "scale-100 opacity-100"
        ],
        className
      )}
    >
      {children}
    </div>
  )
} 