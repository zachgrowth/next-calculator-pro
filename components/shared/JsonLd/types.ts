// JsonLd 组件类型定义
// JsonLd component type definitions

// 面包屑项类型定义
// Breadcrumb item type definition
export interface BreadcrumbItem {
  name: string  // 导航项名称 / Navigation item name
  item: string  // 导航项链接 / Navigation item URL
}

// 面包屑组件属性类型定义
// Breadcrumb component props type definition
export interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[]  // 导航项列表 / List of navigation items
}

// 结构化数据基础类型
// Structured data base type
export interface StructuredData {
  '@context': 'https://schema.org'
  '@type': string
}

// 面包屑列表项类型
// Breadcrumb list item type
export interface BreadcrumbListItem extends StructuredData {
  '@type': 'ListItem'
  position: number
  name: string
  item: string
}

// 面包屑列表类型
// Breadcrumb list type
export interface BreadcrumbList extends StructuredData {
  '@type': 'BreadcrumbList'
  itemListElement: BreadcrumbListItem[]
}

// 导航项类型
// Navigation item type
export interface NavigationItem extends StructuredData {
  '@type': 'WebPage'
  name: string
  description: string
  url: string
}

// 站点导航类型
// Site navigation type
export interface SiteNavigation extends StructuredData {
  '@type': 'SiteNavigationElement'
  name: string
  description: string
  hasPart: NavigationItem[]
} 