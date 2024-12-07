import './globals.css'
import { Metadata } from 'next'
import { seoConfig } from '@/configs/seo.config'

export const metadata: Metadata = {
  title: {
    default: seoConfig.default.title,
    template: `%s${seoConfig.default.titleSuffix ?? ' | Calculator Hub'}`,
  },
  description: seoConfig.default.description,
  keywords: seoConfig.default.keywords,
  authors: [{ name: seoConfig.default.author }],
  metadataBase: seoConfig.default.metadataBase,
  alternates: seoConfig.default.alternates,
  openGraph: seoConfig.social.openGraph,
  twitter: seoConfig.social.twitter,
  robots: seoConfig.robots,
  verification: seoConfig.siteVerification,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  )
} 