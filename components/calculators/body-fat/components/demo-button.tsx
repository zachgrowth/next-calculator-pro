'use client'

import { Button } from '@/components/ui/button'

export function DemoButton() {
  return (
    <Button
      className="px-8 py-2"
      onClick={() => {
        const calculator = document.getElementById('calculator-section')
        calculator?.scrollIntoView({ behavior: 'smooth' })
      }}
    >
      开始计算
    </Button>
  )
} 