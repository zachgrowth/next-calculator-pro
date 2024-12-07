'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { BMIFormData, BMIResult, BMICategory } from '@/types/calculators/bmi'

type BMIState = BMIResult | null

const BMICalculator: React.FC = () => {
  const [formData, setFormData] = useState({
    gender: 'male' satisfies 'male' | 'female',
    age: '',
    height: '',
    weight: '',
  })

  const [result, setResult] = useState<BMIState>(null)

  const handleInputChange = (field: keyof BMIFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateBMI = () => {
    const height = parseFloat(formData.height) / 100 // 转换为米
    const weight = parseFloat(formData.weight)
    
    if (height > 0 && weight > 0) {
      const bmi = weight / (height * height)
      const category = getBMICategory(bmi)
      const healthRisk = getHealthRisk(bmi)
      
      setResult({
        bmi: Math.round(bmi * 10) / 10,
        category,
        description: getBMIDescription(bmi),
        healthRisk
      })
    }
  }

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return '体重过轻'
    if (bmi < 24) return '正常范围'
    if (bmi < 28) return '超重'
    if (bmi < 30) return '轻度肥胖'
    if (bmi < 40) return '中度肥胖'
    return '重度肥胖'
  }

  const getHealthRisk = (bmi: number): string => {
    if (bmi < 18.5) return '营养不良风险增加，免疫力下降'
    if (bmi < 24) return '健康风险较低'
    if (bmi < 28) return '超重可能增加健康风险'
    if (bmi < 30) return '肥胖带来的健康风险增加'
    if (bmi < 40) return '严重健康风险'
    return '极度严重的健康风险'
  }

  const getBMIDescription = (bmi: number): string => {
    if (bmi < 18.5) return '体重过轻可能会影响身体健康，建议适当增重。';
    if (bmi < 24) return '恭喜！您的体重在健康范围内。';
    if (bmi < 28) return '体重略高，建议通过运动和饮食管理来控制。';
    if (bmi < 30) return '需要注意体重管理，建议咨询医生获取建议。';
    if (bmi < 40) return '体重过高会影响健康，建议在专业指导下减重。';
    return '严重超重，请立即就医并制定减重计划。';
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">BMI 计算器</h2>
          <p className="text-sm text-muted-foreground">
            计算您的身体质量指数 (BMI)，了解您的体重是否在健康范围内
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label>性别</Label>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => handleInputChange('gender', value)}
              className="flex space-x-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">男性</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">女性</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="age">年龄 (岁)</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="mt-1"
                min="0"
                max="120"
              />
            </div>
            <div>
              <Label htmlFor="height">身高 (cm)</Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                className="mt-1"
                min="0"
                max="300"
              />
            </div>
            <div>
              <Label htmlFor="weight">体重 (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                className="mt-1"
                min="0"
                max="500"
              />
            </div>
          </div>

          <Button 
            onClick={calculateBMI}
            className="w-full"
            disabled={!formData.height || !formData.weight}
          >
            计算 BMI
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
            <h3 className="font-semibold mb-2">计算结果</h3>
            <div className="space-y-2">
              <p>您的 BMI 值：<span className="font-medium">{result.bmi}</span></p>
              <p>体重状态：<span className="font-medium">{result.category}</span></p>
              <p>健康提示：<span className="font-medium">{result.healthRisk}</span></p>
            </div>
          </div>
        )}

        <div>
          <h3 className="font-medium mb-2">BMI ��考标准</h3>
          <div className="space-y-1 text-sm">
            <p>• BMI ＜ 18.5：体重过轻</p>
            <p>• BMI 18.5-23.9：正常范围</p>
            <p>• BMI 24.0-27.9：超重</p>
            <p>• BMI 28.0-29.9：轻度肥胖</p>
            <p>• BMI 30.0-39.9：中度肥胖</p>
            <p>• BMI ≥ 40.0：重度肥胖</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default BMICalculator 