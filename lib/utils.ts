import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 合并 Tailwind CSS 类名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 将文本转换为 URL 友好的 slug
 * @param text 要转换的文本
 * @returns 转换后的 slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\u4e00-\u9fa5a-z0-9]+/g, '-') // 保留中文、字母和数字
    .replace(/^-+|-+$/g, '') // 移除首尾的连字符
} 