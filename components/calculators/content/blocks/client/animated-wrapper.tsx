'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-in'
}

const animations = {
  'fade-up': {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  },
  'fade-in': {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  }
}

export function AnimatedBlock({ children, className, animation = 'fade-in' }: Props) {
  if (typeof window === 'undefined') {
    return <div className={className}>{children}</div>
  }

  const animationProps = animations[animation]
  return (
    <motion.div
      {...animationProps}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
} 