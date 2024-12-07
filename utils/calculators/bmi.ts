import { BMIParams, BMIResult } from '@/types/calculators/bmi';
import { categories } from '@/configs/bmi.config';

export function calculateBMI(params: BMIParams): BMIResult {
  const { height, weight } = params;
  
  // 将身高转换为米
  const heightInMeters = height / 100;
  
  // 计算 BMI
  const bmi = weight / (heightInMeters * heightInMeters);
  
  // 确保 BMI 在合理范围内
  const value = Math.max(0, Math.min(100, Number(bmi.toFixed(1))));
  
  // 根据 BMI 值确定分类
  const category = categories.find(cat => 
    value >= cat.min && value <= cat.max
  );
  
  if (!category) {
    throw new Error('Unable to determine BMI category');
  }

  return {
    bmi: value,
    category: category.label,
    description: category.description,
    healthRisk: getHealthRisk(value)
  };
}

export function validateInput(value: string, field: keyof BMIParams): number {
  const num = Number(value);
  
  if (isNaN(num)) {
    throw new Error(`${String(field)} must be a valid number`);
  }
  
  // 添加合理性检查
  switch (field) {
    case 'height':
      if (num < 50 || num > 300) {
        throw new Error('身高必须在 50-300 厘米之间');
      }
      break;
    case 'weight':
      if (num < 20 || num > 300) {
        throw new Error('体重必须在 20-300 千克之间');
      }
      break;
  }
  
  return num;
}

export function formatResult(result: BMIResult): string {
  return `您的 BMI 指数为 ${result.bmi}，属于${result.category}。${result.description}`;
}

function getHealthRisk(bmi: number): string {
  if (bmi < 18.5) return '营养不良风险增加，免疫力下降';
  if (bmi < 24) return '健康风险较低';
  if (bmi < 28) return '超重可能增加健康风险';
  if (bmi < 30) return '肥胖带来的健康风险增加';
  if (bmi < 40) return '严重健康风险';
  return '极度严重的健康风险';
} 