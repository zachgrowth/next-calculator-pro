'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { Gender } from '@/types/calculators/body-fat'

interface BasicInputsProps {
  gender: Gender
  age: string
  weight: string
  height: string
  onInputChange: (field: string, value: string) => void
}

export function BasicInputs({
  gender,
  age,
  weight,
  height,
  onInputChange,
}: BasicInputsProps) {
  // 处理数字输入
  const handleNumberInput = (field: string, value: string) => {
    // 允许空值和小数点
    if (value === '' || value === '.') {
      onInputChange(field, value)
      return
    }

    // 允许输入小数点后的数字
    if (value.includes('.') && !isNaN(parseFloat(value))) {
      onInputChange(field, value)
      return
    }

    // 验证是否为有效数字
    const numberValue = parseFloat(value)
    if (!isNaN(numberValue)) {
      // 根据字段设置不同的限制
      switch (field) {
        case 'age':
          if (numberValue >= 0 && numberValue <= 120) {
            onInputChange(field, value)
          }
          break
        case 'weight':
          if (numberValue >= 20 && numberValue <= 300) {
            onInputChange(field, value)
          }
          break
        case 'height':
          if (numberValue >= 50 && numberValue <= 250) {
            onInputChange(field, value)
          }
          break
        default:
          onInputChange(field, value)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>性别</Label>
        <div className="flex gap-4">
          <Button
            type="button"
            variant={gender === 'male' ? 'default' : 'outline'}
            onClick={() => onInputChange('gender', 'male')}
            className="flex-1"
            aria-label="男性"
          >
            男性
          </Button>
          <Button
            type="button"
            variant={gender === 'female' ? 'default' : 'outline'}
            onClick={() => onInputChange('gender', 'female')}
            className="flex-1"
            aria-label="女性"
          >
            女性
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="weight">体重 (kg)</Label>
          <Input
            id="weight"
            type="text"
            inputMode="decimal"
            placeholder="请输入体重"
            value={weight}
            onChange={(e) => handleNumberInput('weight', e.target.value)}
            aria-label="体重"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">身高 (cm)</Label>
          <Input
            id="height"
            type="text"
            inputMode="decimal"
            placeholder="请输入身高"
            value={height}
            onChange={(e) => handleNumberInput('height', e.target.value)}
            aria-label="身高"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">年龄 (岁)</Label>
          <Input
            id="age"
            type="text"
            inputMode="decimal"
            placeholder="请输入年龄"
            value={age}
            onChange={(e) => handleNumberInput('age', e.target.value)}
            aria-label="年龄"
          />
        </div>
      </div>
    </div>
  )
} 