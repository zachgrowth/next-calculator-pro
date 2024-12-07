// 此文件由 content-processor.ts 自动生成
// 最后更新时间: 12/4/2024, 4:41:03 AM

import { NotionBlock, TextContent, TocItem } from './content';

// 块类型定义
export type BlockType = 'heading_2' | 'paragraph' | 'heading_3' | 'image' | 'equation' | 'bulleted_list_item' | 'table';

// 块接口
export interface Block extends NotionBlock {
  type: BlockType;
  content: TextContent[];
  children?: Block[];
}

// 内容接口
export interface Content {
  blocks: Block[];
  metadata: {
    title: string;
    calculatorId: string;
    description: string;
    status: 'published' | 'draft';
    languages: string[];
    lastUpdated: string;
  };
  toc: TocItem[];
}

// 验证规则接口
export interface ValidationRules {
  min: number;
  max: number;
  step?: number;
  integer?: boolean;
}

// 体脂率分类接口
export interface BodyFatCategory {
  max: number;
  label: string;
  description: string;
}

// 导出所有类型
export type { TextContent, TocItem } from './content';

export type Gender = 'male' | 'female'
export type MeasurementUnit = 'metric' | 'imperial'
export type CalculationMethod = 'bmi' | 'skinfold' | 'waist' | 'bioimpedance' | 'navy'

export interface BodyFatBaseInputs {
  gender: Gender
  age: number
  height: number
  weight: number
  unit: MeasurementUnit
}

export interface SkinfoldMeasurements {
  chest?: number      // 男性
  abdomen?: number    // 男性
  thigh: number       // 通用
  triceps?: number    // 女性
  suprailiac?: number // 女性
  subscapular?: number // 通用
  biceps?: number     // 通用
  calf?: number       // 通用
}

export interface WaistMeasurement {
  waist: number       // 腰围
  neck: number        // 颈围
  hip?: number        // 臀围（女性需要）
  unit: MeasurementUnit
}

export interface BioimpedanceData {
  bodyFatPercentage: number
  date: string
  impedance?: number  // 电阻值
  totalBodyWater?: number // 总身体水分
  muscleMass?: number    // 肌肉量
  boneMass?: number      // 骨量
}

export interface NavyMethodParams {
  waist: number      // 腰围
  neck: number       // 颈围
  hip?: number       // 臀围（女性需要）
  unit: MeasurementUnit
}

export interface BMIMethodParams {
  height: number
  weight: number
  unit: MeasurementUnit
}

export interface BodyFatResult {
  bodyFatPercentage: number
  healthyRange: {
    min: number
    max: number
  }
  classification: string
  healthRisks: string[]
  idealWeight: {
    min: number
    max: number
  }
  bodyType: string
  metrics?: {
    bmi?: number
    leanMass?: number
    fatMass?: number
    muscleMass?: number
    bodyWater?: number
  }
  recommendations?: string[]
}

export interface VisualizationData {
  current: number
  target?: number
  history?: Array<{
    date: string
    value: number
  }>
  healthyRange: {
    min: number
    max: number
  }
}

export interface SkinfoldData {
  chest?: string
  abdominal?: string
  thigh?: string
  triceps?: string
  suprailiac?: string
  subscapular?: string
}

export interface FormData {
  method: CalculationMethod
  gender: Gender
  age: string
  weight: string
  height: string
  skinfold?: SkinfoldData
  waist?: string
  impedance?: string
}

export interface DisplayData extends FormData {
  result?: BodyFatResult
}

// 新增：BodyFatParams 接口
export interface BodyFatParams extends BodyFatBaseInputs {
  method: CalculationMethod
  skinfold?: SkinfoldMeasurements
  waist?: WaistMeasurement
  bioimpedance?: BioimpedanceData
  navy?: NavyMethodParams
  bmi?: BMIMethodParams
}
