import { useState } from 'react'
import { categories } from '@/configs/bmi.config'
import type { BMIFormData, BMIResult } from '@/types/calculators/bmi'

export function useBMICalculator() {
  const [formData, setFormData] = useState<BMIFormData>({
    gender: 'male',
    age: '',
    height: '',
    weight: '',
  })

  const [displayData, setDisplayData] = useState<{
    result: BMIResult | null
    error: string | null
    hasInteracted: boolean
  }>({
    result: null,
    error: null,
    hasInteracted: false,
  })

  const handleInputChange = (field: keyof BMIFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleUserInteraction = () => {
    if (!displayData.hasInteracted) {
      setDisplayData(prev => ({ ...prev, hasInteracted: true }))
    }
  }

  const calculateBMI = () => {
    try {
      const height = parseFloat(formData.height) / 100 // 转换为米
      const weight = parseFloat(formData.weight)
      
      if (height > 0 && weight > 0) {
        const bmi = weight / (height * height)
        const roundedBMI = Math.round(bmi * 10) / 10
        
        // 查找对应的 BMI 分类
        const category = categories.find(
          cat => roundedBMI >= cat.min && roundedBMI <= cat.max
        )

        if (category) {
          const healthRisk = getHealthRisk(roundedBMI)
          
          setDisplayData({
            result: {
              bmi: roundedBMI,
              category: category.label,
              description: category.description,
              healthRisk
            },
            error: null,
            hasInteracted: true
          })
        }
      }
    } catch (error) {
      setDisplayData(prev => ({
        ...prev,
        error: '计算过程中出现错误，请检查输入值是否正确。',
        result: null
      }))
    }
  }

  const getHealthRisk = (bmi: number): string => {
    if (bmi < 18.5) return '营养不良风险增加，免疫力下降'
    if (bmi < 24) return '健康风险较低'
    if (bmi < 28) return '超重可能增加健康风险'
    if (bmi < 30) return '肥胖带来的健康风险增加'
    if (bmi < 40) return '严重健康风险'
    return '极度严重的健康风险'
  }

  const validateInputs = (): boolean => {
    const height = parseFloat(formData.height)
    const weight = parseFloat(formData.weight)
    const age = parseFloat(formData.age)

    return (
      !isNaN(height) && height > 0 && height < 300 &&
      !isNaN(weight) && weight > 0 && weight < 500 &&
      !isNaN(age) && age > 0 && age < 120
    )
  }

  return {
    formData,
    displayData,
    handleInputChange,
    handleUserInteraction,
    calculateBMI,
    validateInputs,
  }
} 