'use client'

import { useState, useCallback } from 'react'
import { CalculationMethod, FormData, DisplayData, BodyFatResult } from '@/types/calculators/body-fat'

// 为每种测量方法定义默认值
const defaultValues = {
  bmi: {
    gender: 'male' as const,
    age: '25',
    weight: '70',
    height: '175',
  },
  skinfold: {
    gender: 'male' as const,
    age: '25',
    weight: '70',
    height: '175',
    skinfold: {
      chest: '15',
      abdominal: '25',
      thigh: '20',
      triceps: '18',
      suprailiac: '22',
    },
  },
  waist: {
    gender: 'male' as const,
    age: '25',
    weight: '70',
    height: '175',
    waist: '85',
  },
  bioimpedance: {
    gender: 'male' as const,
    age: '25',
    weight: '70',
    height: '175',
    impedance: '500',
  },
  navy: {
    gender: 'male' as const,
    age: '25',
    weight: '70',
    height: '175',
    waist: '85',
    neck: '38',
    hip: '95',
  },
} as const

// 计算体脂率的函数
function calculateBodyFat(data: FormData): BodyFatResult | undefined {
  const { method, gender, age, weight, height } = data
  const ageNum = parseFloat(age)
  const weightNum = parseFloat(weight)
  const heightNum = parseFloat(height)

  // 基本验证
  if (isNaN(ageNum) || isNaN(weightNum) || isNaN(heightNum)) {
    return undefined
  }

  let bodyFatPercentage = 0
  
  switch (method) {
    case 'bmi': {
      // BMI 方法
      const bmi = weightNum / Math.pow(heightNum / 100, 2)
      if (gender === 'male') {
        bodyFatPercentage = (1.20 * bmi) + (0.23 * ageNum) - 16.2
      } else {
        bodyFatPercentage = (1.20 * bmi) + (0.23 * ageNum) - 5.4
      }
      break
    }
    case 'skinfold': {
      // 皮褶测量法
      if (!data.skinfold) return undefined
      const { chest, abdominal, thigh, triceps, suprailiac } = data.skinfold
      const values = gender === 'male' 
        ? [parseFloat(chest || '0'), parseFloat(abdominal || '0'), parseFloat(thigh || '0')]
        : [parseFloat(triceps || '0'), parseFloat(suprailiac || '0'), parseFloat(thigh || '0')]
      
      if (values.some(isNaN)) return undefined
      
      const sum = values.reduce((acc, val) => acc + val, 0)
      bodyFatPercentage = gender === 'male'
        ? (495 / (1.10938 - (0.0008267 * sum) + (0.0000016 * sum * sum) - (0.0002574 * ageNum))) - 450
        : (495 / (1.089733 - (0.0009245 * sum) + (0.0000025 * sum * sum) - (0.0000979 * ageNum))) - 450
      break
    }
    case 'waist': {
      // 腰围法
      if (!data.waist) return undefined
      const waistNum = parseFloat(data.waist)
      if (isNaN(waistNum)) return undefined
      
      const bmi = weightNum / Math.pow(heightNum / 100, 2)
      bodyFatPercentage = (waistNum * 0.15) + (bmi * 1.2) - 5.4
      break
    }
    case 'bioimpedance': {
      // 生物电阻抗法
      if (!data.impedance) return undefined
      const impedanceNum = parseFloat(data.impedance)
      if (isNaN(impedanceNum)) return undefined
      
      const height2 = Math.pow(heightNum / 100, 2)
      const resistance = impedanceNum
      
      if (gender === 'male') {
        bodyFatPercentage = (0.756 * height2 / resistance) + (0.18 * weightNum) - (0.11 * ageNum) + 14.2
      } else {
        bodyFatPercentage = (0.756 * height2 / resistance) + (0.18 * weightNum) - (0.11 * ageNum) + 8.5
      }
      break
    }
    default:
      return undefined
  }

  // 计算健康范围
  const healthyRange = gender === 'male'
    ? { min: 8, max: 20 }
    : { min: 15, max: 25 }

  // 计算理想体重范围
  const idealHeight = heightNum / 100 // 转换为米
  const idealBMI = { min: 18.5, max: 24.9 }
  const idealWeight = {
    min: idealBMI.min * idealHeight * idealHeight,
    max: idealBMI.max * idealHeight * idealHeight,
  }

  // 确定体型分类
  let classification = '健康'
  if (bodyFatPercentage < healthyRange.min) {
    classification = '偏瘦'
  } else if (bodyFatPercentage > healthyRange.max) {
    classification = '偏胖'
  }

  return {
    bodyFatPercentage: parseFloat(bodyFatPercentage.toFixed(1)),
    healthyRange,
    classification,
    idealWeight,
    healthRisks: [],
    bodyType: classification
  }
}

export function useBodyFatCalculator() {
  // 使用 BMI 方法的默认值初始化
  const [formData, setFormData] = useState<FormData>({
    ...defaultValues.bmi,
    method: 'bmi',
  } as FormData)

  const [displayData, setDisplayData] = useState<DisplayData>(() => {
    const initialData = { ...defaultValues.bmi, method: 'bmi' } as FormData
    return {
      ...initialData,
      result: undefined,
    }
  })

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => {
      // 处理嵌套字段（如 skinfold.chest）
      const newFormData = field.includes('.')
        ? {
            ...prev,
            [field.split('.')[0]]: {
              ...(prev[field.split('.')[0] as keyof FormData] as Record<string, string>),
              [field.split('.')[1]]: value,
            },
          }
        : { ...prev, [field]: value }

      return newFormData as FormData
    })
  }, [])

  const handleCalculate = useCallback(() => {
    const result = calculateBodyFat(formData)
    setDisplayData(prev => ({
      ...prev,
      ...formData,
      result,
    }))
  }, [formData])

  return {
    formData,
    displayData,
    handleInputChange,
    handleCalculate,
  }
} 