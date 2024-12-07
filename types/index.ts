/**
 * 全局类型定义导出
 * 这个文件作为所有类型定义的根入口点
 * 
 * 使用说明：
 * 1. 导入特定模块的类型：
 *    import { BodyFatResult } from '@/types/calculators'
 * 
 * 2. 导入多个模块的类型：
 *    import { BodyFatResult, SEOConfig } from '@/types'
 */

// 导出基础类型
export * from './calculators/content';

// 导出计算器特定类型
export type { BodyFatContent } from './calculators';

// 导出SEO相关类型
export * from './seo';

// 导出导航相关类型
export * from './shared/navigation';