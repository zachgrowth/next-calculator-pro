import { MetadataRoute } from 'next'
import { pageSEOConfigs } from '@/configs/seo.config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL ?? 'https://www.calculatorhub.com'
  
  // 从 SEO 配置中获取所有页面
  const pages = Object.entries(pageSEOConfigs).map(([path, config]) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  // 添加首页
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1
    },
    ...pages
  ]

  return routes
} 