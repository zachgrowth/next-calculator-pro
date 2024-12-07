'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Gender, SkinfoldData } from '@/types/calculators/body-fat'

interface SkinfoldInputsProps {
  gender: Gender
  skinfoldData: SkinfoldData
  onInputChange: (field: string, value: string) => void
}

export function SkinfoldInputs({
  gender,
  skinfoldData,
  onInputChange,
}: SkinfoldInputsProps) {
  // 处理数字输入
  const handleNumberInput = (field: string, value: string) => {
    // 允许空值
    if (value === '') {
      onInputChange(`skinfold.${field}`, '')
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
      onInputChange(`skinfold.${field}`, '0.')
      return
    }

    // 如果以小数点开头，添加前导零
    if (value.startsWith('.')) {
      onInputChange(`skinfold.${field}`, `0${value}`)
      return
    }

    // 始终更新输入值
    onInputChange(`skinfold.${field}`, value)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gender === 'male' ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="chest">胸部皮褶 (mm)</Label>
              <Input
                id="chest"
                type="text"
                inputMode="decimal"
                value={skinfoldData.chest || ''}
                onChange={(e) => handleNumberInput('chest', e.target.value)}
                placeholder="请输入胸部皮褶厚度"
              />
              <div className="text-xs text-muted-foreground">
                范围：0-100
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="abdominal">腹部皮褶 (mm)</Label>
              <Input
                id="abdominal"
                type="text"
                inputMode="decimal"
                value={skinfoldData.abdominal || ''}
                onChange={(e) => handleNumberInput('abdominal', e.target.value)}
                placeholder="请输入腹部皮褶厚度"
              />
              <div className="text-xs text-muted-foreground">
                范围：0-100
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="thigh">大腿皮褶 (mm)</Label>
              <Input
                id="thigh"
                type="text"
                inputMode="decimal"
                value={skinfoldData.thigh || ''}
                onChange={(e) => handleNumberInput('thigh', e.target.value)}
                placeholder="请输入大腿皮褶厚度"
              />
              <div className="text-xs text-muted-foreground">
                范围：0-100
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="triceps">三头肌皮褶 (mm)</Label>
              <Input
                id="triceps"
                type="text"
                inputMode="decimal"
                value={skinfoldData.triceps || ''}
                onChange={(e) => handleNumberInput('triceps', e.target.value)}
                placeholder="请输入三头肌皮褶厚度"
              />
              <div className="text-xs text-muted-foreground">
                范围：0-100
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="suprailiac">髂上皮褶 (mm)</Label>
              <Input
                id="suprailiac"
                type="text"
                inputMode="decimal"
                value={skinfoldData.suprailiac || ''}
                onChange={(e) => handleNumberInput('suprailiac', e.target.value)}
                placeholder="请输入髂上皮褶厚度"
              />
              <div className="text-xs text-muted-foreground">
                范围：0-100
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="thigh">大腿皮褶 (mm)</Label>
              <Input
                id="thigh"
                type="text"
                inputMode="decimal"
                value={skinfoldData.thigh || ''}
                onChange={(e) => handleNumberInput('thigh', e.target.value)}
                placeholder="请输入大腿皮褶厚度"
              />
              <div className="text-xs text-muted-foreground">
                范围：0-100
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
} 