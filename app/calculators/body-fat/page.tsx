import { generateMetadata as genMetadata, generateStructuredData } from '../../../utils/seo'
import { CalculatorContent } from '../../../types/calculators/content'
import contentData from '../../../content/body-fat.json'
import { pageSEOConfigs } from '../../../configs/seo.config'
import { ClientPage } from './client-page'
import { Metadata } from 'next'

// 类型断言
const content = contentData as CalculatorContent

// 生成页面元数据
export async function generateMetadata(): Promise<Metadata> {
  return genMetadata(pageSEOConfigs['/calculators/body-fat'])
}

// 服务器组件
export default function Page() {
  const pageConfig = pageSEOConfigs['/calculators/body-fat']
  const structuredData = generateStructuredData(pageConfig)
  const breadcrumbData = pageConfig?.breadcrumb || []

  return (
    <ClientPage 
      content={content}
      structuredData={structuredData}
      breadcrumbData={breadcrumbData}
    />
  )
} 