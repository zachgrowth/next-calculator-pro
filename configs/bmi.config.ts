import { BMICategory } from '@/types/calculators/bmi';

export const calculatorConfig = {
  age: {
    min: 2,
    max: 120,
    step: 1
  },
  height: {
    min: 50,
    max: 300,
    step: 0.1
  },
  weight: {
    min: 2,
    max: 500,
    step: 0.1
  }
};

export const healthTips = {
  diet: [
    '保持均衡饮食，注意营养搭配',
    '控制每日热量摄入',
    '增加蔬菜水果摄入',
    '少吃高糖、高脂食物',
    '保持规律饮食习惯'
  ],
  exercise: [
    '每周进行至少150分钟中等强度运动',
    '坚持有氧运动和力量训练相结合',
    '避免久坐，每小时起身活动',
    '选择适合自己的运动方式',
    '循序渐进增加运动强度'
  ]
};

export const categories: BMICategory[] = [
  {
    label: '体重过轻',
    min: 0,
    max: 18.4,
    description: '您的体重过轻，可能存在营养不良风险。建议：\n1. 适当增加热量摄入\n2. 注意营养均衡\n3. 进行适度运动增加肌肉量\n4. 必要时咨询营养师'
  },
  {
    label: '体重正常',
    min: 18.5,
    max: 23.9,
    description: '您的体重在正常范围内，请继续保持健康的生活方式。'
  },
  {
    label: '超重',
    min: 24.0,
    max: 27.9,
    description: '您的体重略高，存在一定健康风险。建议：\n1. 控制热量摄入\n2. 增加运动量\n3. 避免久坐少动\n4. 定期监测体重变化'
  },
  {
    label: '轻度肥胖',
    min: 28.0,
    max: 29.9,
    description: '您已处于肥胖范围，需要采取措施。建议：\n1. 制定科学的减重计划\n2. 严格控制饮食\n3. 坚持有氧运动\n4. 考虑咨询专业医生'
  },
  {
    label: '中度肥胖',
    min: 30.0,
    max: 39.9,
    description: '您处于中度肥胖状态，健康风险较高。建议：\n1. 在医生指导下减重\n2. 可能需要药物干预\n3. 调整生活方式\n4. 定期进行相关检查'
  },
  {
    label: '重度肥胖',
    min: 40.0,
    max: Infinity,
    description: '您处于重度肥胖状态，需要立即采取措施。建议：\n1. 及时就医寻求帮助\n2. 可能需要手术治疗\n3. 在专业指导下减重\n4. 密切监测身体状况'
  }
]; 