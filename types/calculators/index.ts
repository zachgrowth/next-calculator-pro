/**
 * 计算器模块类型定义导出
 * 这个文件作为计算器相关类型的模块级入口点
 * 
 * 使用说明：
 * 1. 在计算器模块内使用：
 *    import { BodyFatResult } from '@/types/calculators'
 * 
 * 2. 导入特定计算器的类型：
 *    import { BodyFatParams } from '@/types/calculators/body-fat'
 */

// 导出基础类型
export * from './content';

// 导出计算器特定类型
export type { Content as BodyFatContent } from './body-fat';

// 为将来可能添加的计算器预留扩展空间
// export { Content as BmiContent } from './bmi';
// export * from './calorie' 