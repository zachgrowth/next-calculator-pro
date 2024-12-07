import { Metadata } from 'next'
import { PageSEO, CalculatorSchema } from '@/types/seo'
import { seoConfig } from '@/configs/seo.config'

/**
 * 生成页面 SEO 元数据
 */
export function generateMetadata(pageConfig: PageSEO): Metadata {
  // 获取默认图片
  const defaultImage = {
    url: '/og-image.png',
    width: 1200,
    height: 630,
    alt: pageConfig.title,
  }

  // 获取配置的图片
  const configImage = Array.isArray(seoConfig.social.openGraph?.images) 
    ? seoConfig.social.openGraph.images[0] 
    : seoConfig.social.openGraph?.images

  let ogImage = defaultImage
  if (typeof configImage === 'string') {
    ogImage = { ...defaultImage, url: configImage }
  } else if (configImage instanceof URL) {
    ogImage = { ...defaultImage, url: configImage.toString() }
  } else if (configImage && 'url' in configImage) {
    ogImage = { 
      ...defaultImage,
      url: configImage.url.toString(),
      width: Number(configImage.width ?? defaultImage.width),
      height: Number(configImage.height ?? defaultImage.height),
      alt: configImage.alt ?? defaultImage.alt
    }
  }

  return {
    title: pageConfig.title,
    description: pageConfig.description,
    keywords: pageConfig.keywords,
    alternates: pageConfig.alternates,
    openGraph: pageConfig.openGraph || {
      title: pageConfig.title,
      description: pageConfig.description,
      type: 'website',
      siteName: seoConfig.default.title,
      images: [ogImage],
    },
  }
}

/**
 * 生成结构化数据
 */
export function generateStructuredData(pageConfig: PageSEO): CalculatorSchema & {
  breadcrumb?: {
    '@context': 'https://schema.org'
    '@type': 'BreadcrumbList'
    itemListElement: Array<{
      '@type': 'ListItem'
      position: number
      name: string
      item: string
    }>
  }
} {
  const { structuredData, breadcrumb } = pageConfig

  const baseStructuredData: CalculatorSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: structuredData?.name || pageConfig.title,
    description: structuredData?.description || pageConfig.description,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY',
    },
    featureList: [],
    screenshot: []
  }

  return {
    ...baseStructuredData,
    breadcrumb: breadcrumb ? {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumb.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.item,
      })),
    } : undefined,
  }
} 