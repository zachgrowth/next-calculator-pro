export const demoData = {
  bmi: {
    gender: 'male' as const,
    age: 30,
    weight: 70,
    height: 175,
    result: {
      bodyFatPercentage: 15.8,
      healthyRange: {
        min: 11,
        max: 22
      },
      classification: '健康',
      healthRisks: [],
      idealWeight: {
        min: 56.7,
        max: 76.1
      },
      bodyType: '健康'
    }
  },
  skinfold: {
    gender: 'male' as const,
    age: 28,
    weight: 75,
    height: 180,
    skinfold: {
      chest: 12,
      abdomen: 18,
      thigh: 15
    },
    result: {
      bodyFatPercentage: 12.5,
      healthyRange: {
        min: 8,
        max: 20
      },
      classification: '运动员级别',
      healthRisks: [],
      idealWeight: {
        min: 61.6,
        max: 82.8
      },
      bodyType: '运动员级别'
    }
  },
  waist: {
    gender: 'male' as const,
    age: 35,
    weight: 80,
    height: 178,
    waist: 85,
    result: {
      bodyFatPercentage: 18.2,
      healthyRange: {
        min: 11,
        max: 22
      },
      classification: '健康',
      healthRisks: [],
      idealWeight: {
        min: 60.1,
        max: 80.8
      },
      bodyType: '健康'
    }
  },
  bioimpedance: {
    gender: 'male' as const,
    age: 32,
    weight: 72,
    height: 173,
    impedance: 16.5,
    result: {
      bodyFatPercentage: 16.5,
      healthyRange: {
        min: 11,
        max: 22
      },
      classification: '健康',
      healthRisks: [],
      idealWeight: {
        min: 56.8,
        max: 76.3
      },
      bodyType: '健康'
    }
  }
} 