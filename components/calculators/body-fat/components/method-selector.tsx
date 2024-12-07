'use client'

import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalculationMethod } from '@/types/calculators/body-fat'

interface MethodSelectorProps {
  selectedMethod: CalculationMethod
  onMethodChange: (method: CalculationMethod) => void
}

const methods = [
  { value: 'bmi', label: 'BMI法' },
  { value: 'skinfold', label: '皮褶法' },
  { value: 'waist', label: '腰围法' },
  { value: 'bioimpedance', label: '生物电阻抗法' },
] as const

export function MethodSelector({ selectedMethod, onMethodChange }: MethodSelectorProps) {
  return (
    <div className="space-y-2">
      <Tabs value={selectedMethod} onValueChange={(value) => onMethodChange(value as CalculationMethod)}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          {methods.map((method) => (
            <TabsTrigger
              key={method.value}
              value={method.value}
              className="text-sm"
            >
              {method.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
} 