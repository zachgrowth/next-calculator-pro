interface BodyFatInput {
  gender: 'male' | 'female'
  age: number
  weight: number
  height: number
}

interface BodyFatResult {
  bodyFatPercentage: number
  healthyRange: {
    min: number
    max: number
  }
  classification: string
}

export function calculateBodyFat(input: BodyFatInput): BodyFatResult {
  const { gender, age, weight, height } = input
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)
  
  // 使用 BMI 法计算体脂率
  let bodyFatPercentage = gender === 'male'
    ? (1.20 * bmi) + (0.23 * age) - 16.2
    : (1.20 * bmi) + (0.23 * age) - 5.4

  // 确保结果在合理范围内
  bodyFatPercentage = Math.max(2, Math.min(60, bodyFatPercentage))

  // 根据性别确定健康范围
  const healthyRange = gender === 'male'
    ? { min: 8, max: 20 }
    : { min: 15, max: 25 }

  // 确定分类
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
  }
} 