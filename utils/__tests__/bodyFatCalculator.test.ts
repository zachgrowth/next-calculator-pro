import { calculateBodyFat } from '../bodyFatCalculator'

describe('Body Fat Calculator', () => {
  it('should calculate body fat percentage correctly for male', () => {
    const result = calculateBodyFat({
      gender: 'male',
      age: 30,
      weight: 70,
      height: 175,
    })

    expect(result.bodyFatPercentage).toBeGreaterThan(0)
    expect(result.bodyFatPercentage).toBeLessThan(50)
    expect(result.healthyRange).toEqual({ min: 8, max: 20 })
  })

  it('should calculate body fat percentage correctly for female', () => {
    const result = calculateBodyFat({
      gender: 'female',
      age: 30,
      weight: 55,
      height: 165,
    })

    expect(result.bodyFatPercentage).toBeGreaterThan(0)
    expect(result.bodyFatPercentage).toBeLessThan(50)
    expect(result.healthyRange).toEqual({ min: 15, max: 25 })
  })

  it('should classify body fat percentage correctly', () => {
    // 偏瘦
    const underweight = calculateBodyFat({
      gender: 'male',
      age: 25,
      weight: 50,
      height: 175,
    })
    expect(underweight.classification).toBe('偏瘦')

    // 健康
    const healthy = calculateBodyFat({
      gender: 'male',
      age: 25,
      weight: 70,
      height: 175,
    })
    expect(healthy.classification).toBe('健康')

    // 偏胖
    const overweight = calculateBodyFat({
      gender: 'male',
      age: 25,
      weight: 90,
      height: 175,
    })
    expect(overweight.classification).toBe('偏胖')
  })
}) 