import { BodyFatParams, BodyFatResult } from '@/types/calculators/body-fat';
import { categories } from '@/configs/body-fat.config';

export function calculateBodyFat(params: BodyFatParams): BodyFatResult {
  // 确保使用正确的参数
  if (params.method !== 'navy') {
    throw new Error('This calculation only supports navy method');
  }
  
  if (!params.navy) {
    throw new Error('Navy method parameters are required');
  }

  const { height } = params;
  const { waist, neck, hip } = params.navy;
  let bodyFatPercentage: number;

  if (params.gender === 'male') {
    bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    if (!hip) {
      throw new Error('Hip measurement is required for female calculation');
    }
    bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
  }

  // 确保百分比在合理范围内
  bodyFatPercentage = Math.max(0, Math.min(100, bodyFatPercentage));
  
  // 根据性别和百分比确定分类
  const category = categories[params.gender].find(cat => bodyFatPercentage <= cat.max);
  
  if (!category) {
    throw new Error('Unable to determine body fat category');
  }

  // 计算健康范围
  const healthyRange = {
    min: params.gender === 'male' ? 10 : 20,
    max: params.gender === 'male' ? 20 : 30
  };

  // 计算理想体重范围
  const bmi = params.weight / Math.pow(height / 100, 2);
  const idealWeight = {
    min: 18.5 * Math.pow(height / 100, 2),
    max: 24.9 * Math.pow(height / 100, 2)
  };

  return {
    bodyFatPercentage: Number(bodyFatPercentage.toFixed(1)),
    healthyRange,
    classification: category.label,
    healthRisks: [category.description],
    idealWeight,
    bodyType: category.label,
    metrics: {
      bmi: Number(bmi.toFixed(1)),
      fatMass: Number((params.weight * bodyFatPercentage / 100).toFixed(1)),
      leanMass: Number((params.weight * (1 - bodyFatPercentage / 100)).toFixed(1))
    }
  };
}

export function validateInput(value: string, field: keyof BodyFatParams): number {
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(`${field} must be a valid number`);
  }
  return num;
}

export function formatResult(result: BodyFatResult): string {
  return `您的体脂率为 ${result.bodyFatPercentage}%，属于${result.classification}类别。${result.healthRisks[0]}`;
} 