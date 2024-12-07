'use client'

import React, { Suspense } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
}

function AnimatedContent({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

export default function AnimatedEquation({ children }: Props) {
  return (
    <Suspense fallback={children}>
      <AnimatedContent>{children}</AnimatedContent>
    </Suspense>
  )
} 