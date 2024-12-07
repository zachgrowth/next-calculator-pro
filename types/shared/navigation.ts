export interface BreadcrumbItem {
    name: string    // 导航项名称
    item: string    // 导航项链接
    current?: boolean // 是否是当前页面
  }
  
  export interface NavigationConfig {
    breadcrumb: BreadcrumbItem[]
    title: string
    description?: string
  }