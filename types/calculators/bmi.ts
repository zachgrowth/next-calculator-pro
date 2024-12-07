export interface BMIFormData {
  gender: 'male' | 'female'
  age: string
  height: string
  weight: string
}

export interface BMIParams {
  height: number
  weight: number
}

export interface BMIResult {
  bmi: number
  category: string
  description: string
  healthRisk: string
}

export interface BMICategory {
  label: string
  min: number
  max: number
  description: string
} 