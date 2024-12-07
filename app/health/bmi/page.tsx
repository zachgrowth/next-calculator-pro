import { Metadata } from 'next'
import { generateMetadata, generateStructuredData } from '@/utils/seo'
import { BMICalculatorServer } from '@/components/calculators/bmi/BMICalculatorServer'
import { ImageGallery } from '@/components/calculators/bmi/ImageGallery'
import Description from '@/components/calculators/bmi/Description'
import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'
import { ContentArea } from '@/components/calculators/content/ContentArea'
import { CalculatorContent } from '@/types/calculators/content'
import contentData from '@/content/bmi-calculator.json'
import { BreadcrumbJsonLd, SiteNavigationElement } from '@/components/shared/JsonLd/JsonLd'
import { pageSEOConfigs } from '@/configs/seo.config'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import PageHeader from '@/components/shared/PageHeader'


// 类型断言
const content = contentData as CalculatorContent

// 生成页面元数据
export const metadata = generateMetadata(pageSEOConfigs['/health/bmi'])

export default function Page() {
  // 获取页面配置和结构化数据
  const pageConfig = pageSEOConfigs['/health/bmi']
  const structuredData = generateStructuredData(pageSEOConfigs['/health/bmi'])
  const breadcrumbData = pageConfig?.breadcrumb || []

  return (
    <div className="min-h-screen flex flex-col" itemScope itemType="https://schema.org/WebPage">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* 面包屑导航 */}
        <Breadcrumb items={breadcrumbData} className="mb-4" />

        {/* 页面标题和描述 */}
        <PageHeader 
          metadata={content.metadata}
          defaultTitle="BMI 计算器"
        />

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr,2fr] gap-6 lg:gap-12">
          <div className="order-2 lg:order-1">
            <article itemScope itemType="https://schema.org/SoftwareApplication">
              <meta itemProp="applicationCategory" content="HealthApplication" />
              <meta itemProp="operatingSystem" content="All" />
              <BMICalculatorServer />
            </article>
          </div>
          <div className="order-1 lg:order-2">
            <aside>
              <Description />
            </aside>
          </div>
        </div>

        
        <ContentArea content={content} />
      </main>
      <Footer />

      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <BreadcrumbJsonLd items={breadcrumbData} />
      <SiteNavigationElement />
    </div>
  )
} 