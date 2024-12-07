// JsonLd 组件 - 服务端渲染的结构化数据
// JsonLd Component - Server-side rendered structured data

import { type ReactNode } from 'react'

// 面包屑项类型定义
// Breadcrumb item type definition
interface BreadcrumbItem {
  name: string  // 导航项名称 / Navigation item name
  item: string  // 导航项链接 / Navigation item URL
}

// 面包屑组件属性类型定义
// Breadcrumb component props type definition
interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[]  // 导航项列表 / List of navigation items
}

/**
 * 面包屑导航结构化数据组件
 * Breadcrumb structured data component
 * 
 * 用途 / Usage:
 * - 帮助搜索引擎理解页面层级结构 / Help search engines understand page hierarchy
 * - 提升搜索结果的展示效果 / Improve search result presentation
 * - 增加用户点击率 / Increase click-through rate
 */
export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps): ReactNode {
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  }

  // 使用 JSON.stringify 时添加格式化，便于调试
  // Add formatting to JSON.stringify for debugging
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbList, null, 2),
      }}
    />
  )
}

/**
 * 站点导航结构化数据组件
 * Site navigation structured data component
 * 
 * 用途 / Usage:
 * - 帮助搜索引擎理解网站结构 / Help search engines understand site structure
 * - 提升网站的可发现性 / Improve site discoverability
 * - 优化站内导航展示 / Optimize site navigation presentation
 */
export function SiteNavigationElement(): ReactNode {
  const navigation = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: '@calculatorhub导航',
    description: '网站主要导航菜单',
    hasPart: [
      {
        '@type': 'WebPage',
        name: '首页',
        description: '@calculatorhub首页',
        url: 'https://www.calculatorhub.tools',
      },
      {
        '@type': 'WebPage',
        name: '体脂率计算器',
        description: '计算和分析您的体脂率',
        url: 'https://www.calculatorhub.tools/calculators/body-fat',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(navigation, null, 2),
      }}
    />
  )
} 