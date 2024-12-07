"use client"

import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'
import { ContentArea } from '@/components/calculators/content/ContentArea'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { CalculatorContent } from '@/types/calculators/content'
import { BreadcrumbJsonLd, SiteNavigationElement } from '@/components/shared/JsonLd/JsonLd'
import PageHeader from '@/components/shared/PageHeader'
import { BodyFatCalculatorServer } from '@/components/calculators/body-fat/BodyFatCalculatorServer'
import Description from '@/components/calculators/body-fat/Description'

interface ClientPageProps {
  content: CalculatorContent;
  structuredData: any;
  breadcrumbData: any[];
}

export function ClientPage({ 
  content,
  structuredData, 
  breadcrumbData 
}: ClientPageProps) {
  return (
    <div className="min-h-screen flex flex-col" itemScope itemType="https://schema.org/WebPage">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* 面包屑导航 */}
        <Breadcrumb items={breadcrumbData} className="mb-4" />

        {/* 页面标题和描述 */}
        <PageHeader 
          metadata={content.metadata}
          defaultTitle="体脂计算器"
        />

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr,2fr] gap-6 lg:gap-12">
          <div className="order-2 lg:order-1">
            <article itemScope itemType="https://schema.org/SoftwareApplication">
              <meta itemProp="applicationCategory" content="HealthApplication" />
              <meta itemProp="operatingSystem" content="All" />
              <BodyFatCalculatorServer />
            </article>
          </div>
          <div className="order-1 lg:order-2">
            <aside>
              <Description />
            </aside>
          </div>
        </div>

        {/* 内容区域 */}
        <ContentArea content={content} />
      </main>
      <Footer />

      {/* 结化数据 */}
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