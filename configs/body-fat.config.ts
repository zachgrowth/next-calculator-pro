import { Gender } from '@/types/calculators/body-fat'

type Categories = Record<Gender, Array<{
  max: number
  label: string
  description: string
}>>

export const categories: Categories = {
  male: [
    {
      max: 2,
      label: '必需脂肪',
      description: '这是维持生命所必需的最低脂肪水平。'
    },
    {
      max: 5,
      label: '极低',
      description: '体脂率极低，可能影响健康，建议适当增加。'
    },
    {
      max: 13,
      label: '运动员',
      description: '这是运动员的理想体脂率范围。'
    },
    {
      max: 17,
      label: '健康',
      description: '这是健康的体脂率范围，继续保持！'
    },
    {
      max: 24,
      label: '可接受',
      description: '体脂率略高，但仍在可接受范围内。'
    },
    {
      max: 100,
      label: '过高',
      description: '体脂率过高，建议通过运动和饮食进行调整。'
    }
  ],
  female: [
    {
      max: 10,
      label: '必需脂肪',
      description: '这是维持生命所必需的最低脂肪水平。'
    },
    {
      max: 13,
      label: '极低',
      description: '体脂率极低，可能影响健康，建议适当增加。'
    },
    {
      max: 20,
      label: '运动员',
      description: '这是运动员的理想体脂率范围。'
    },
    {
      max: 24,
      label: '健康',
      description: '这是健康的体脂率范围，继续保持！'
    },
    {
      max: 31,
      label: '可接受',
      description: '体脂率略高，但仍在可接受范围内。'
    },
    {
      max: 100,
      label: '过高',
      description: '体脂率过高，建议通过运动和饮食进行调整。'
    }
  ]
} 