/**
 * SEO配置类型定义，用于生成SEO元数据
 * 1. 增加类型安全性：更严格的类型检查
 * 2. 支持新的 SEO 特性：如多语言、备用链接等
 * 3. 完善结构化数据的类型定义
 */
import { Metadata } from 'next'

// Twitter 卡片类型定义
interface TwitterMetadata {
  handle?: string
  site?: string
  cardType?: 'summary' | 'summary_large_image' | 'app' | 'player'
  title?: string
  description?: string
  images?: string | string[]
  creator?: string
}

// 扩展 Offer 类型
interface Offer {
  '@type': string
  price: string
  priceCurrency: string
  availability?: string
  seller?: {
    '@type': string
    name: string
    url: string
  }
}

export interface SEOConfig {
  default: {
    title: string
    titleSuffix?: string
    description: string
    keywords?: string[]
    author: string
    canonical: string
    alternates: {
      canonical: string
      languages: {
        [key: string]: string
      }
    }
    metadataBase: URL
  }
  siteVerification: {
    google?: string
    bing?: string
    baidu?: string
    yandex?: string
  }
  robots: Metadata['robots']
  analytics: {
    googleAnalytics?: {
      id?: string
      gtag?: boolean
    }
    baiduAnalytics?: {
      id?: string
    }
  }
  advertising: {
    googleAdsense?: {
      id?: string
      autoAds?: boolean
    }
  }
  structuredData: {
    organization: any
    website: any
  }
  social: {
    openGraph: Metadata['openGraph']
    twitter: TwitterMetadata
  }
  i18n?: {
    defaultLocale: string
    locales: string[]
    translations: Record<string, {
      title: string
      description: string
      keywords: string[]
    }>
  }
}

export interface Page {
  path: string
  url: string
  lastModified: string
  changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
  title: string
  description: string
  breadcrumb?: Array<{
    name: string
    item: string
  }>
}

export interface PageSEO {
  title: string
  description: string
  keywords?: string[]
  alternates?: {
    canonical?: string
    languages?: Record<string, string>
  }
  openGraph?: Metadata['openGraph']
  breadcrumb?: Array<{
    name: string
    item: string
  }>
  structuredData?: CalculatorSchema
}

export interface CalculatorSchema {
  '@context': 'https://schema.org'
  '@type': 'WebApplication'
  name: string
  description: string
  applicationCategory: 'HealthApplication'
  operatingSystem: string
  offers: Offer
  featureList: string[]
  screenshot: Array<{
    '@type': 'ImageObject'
    url: string
    caption: string
  }>
  aggregateRating?: {
    '@type': 'AggregateRating'
    ratingValue: string
    ratingCount: string
    bestRating: string
    worstRating: string
  }
  review?: {
    '@type': 'Review'
    reviewRating: {
      '@type': 'Rating'
      ratingValue: string
      bestRating: string
      worstRating: string
    }
    author: {
      '@type': 'Organization'
      name: string
    }
    reviewBody: string
  }
  mainEntityOfPage?: {
    '@type': 'WebPage'
    '@id': string
  }
} 