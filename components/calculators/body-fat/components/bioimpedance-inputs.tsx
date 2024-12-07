'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface BioimpedanceInputsProps {
  impedance: string
  onInputChange: (field: string, value: string) => void
}

export function BioimpedanceInputs({
  impedance,
  onInputChange,
}: BioimpedanceInputsProps) {
  // 处理数字输入
  const handleNumberInput = (value: string) => {
    // 允许空值
    if (value === '') {
      onInputChange('impedance', '')
      return
    }

    // 处理数字和小数点
    // 允许：空字符串、单个小数点、数字开头的小数点、小数点后的数字
    const regex = /^$|^[0-9]+\.?[0-9]*$|^\.[0-9]*$/
    if (!regex.test(value)) {
      return
    }

    // 如果是单个小数点，转换为 "0."
    if (value === '.') {
      onInputChange('impedance', '0.')
      return
    }

    // 如果以小数点开头，添加前导零
    if (value.startsWith('.')) {
      onInputChange('impedance', `0${value}`)
      return
    }

    // 始终更新输入值
    onInputChange('impedance', value)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="impedance">电阻抗值 (Ω)</Label>
        <Input
          id="impedance"
          type="text"
          inputMode="decimal"
          value={impedance}
          onChange={(e) => handleNumberInput(e.target.value)}
          placeholder="请输入电阻抗值"
        />
        <div className="text-xs text-muted-foreground">
          范围：200-1000
        </div>
      </div>
    </div>
  )
} 