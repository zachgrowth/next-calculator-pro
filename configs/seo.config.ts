import { SEOConfig, PageSEO } from '@/types/seo'

/**
 * SEO 基础配置
 */
export const seoConfig: SEOConfig = {
  default: {
    title: 'Calculator Hub - Free Online Calculators',
    description: 'Free online calculators for various calculations. Easy to use and accurate results.',
    keywords: ['calculator', 'online calculator', 'free calculator', 'math calculator'],
    author: 'Calculator Hub',
    canonical: process.env.SITE_URL ?? 'https://www.calculatorhub.com',
    alternates: {
      canonical: process.env.SITE_URL ?? 'https://www.calculatorhub.com',
      languages: {
        'en-US': process.env.SITE_URL ?? 'https://www.calculatorhub.com',
        'zh-CN': `${process.env.SITE_URL ?? 'https://www.calculatorhub.com'}/zh`,
      },
    },
    metadataBase: new URL(process.env.SITE_URL ?? 'https://www.calculatorhub.com'),
  },
  siteVerification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    bing: process.env.BING_SITE_VERIFICATION,
    baidu: process.env.BAIDU_SITE_VERIFICATION,
    yandex: process.env.YANDEX_SITE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': 160,
      'max-video-preview': -1,
      noimageindex: false,
    },
  },
  analytics: {
    googleAnalytics: {
      id: process.env.GA_TRACKING_ID,
      gtag: true,
    },
    baiduAnalytics: {
      id: process.env.BAIDU_ANALYTICS_ID,
    },
  },
  advertising: {
    googleAdsense: {
      id: process.env.ADSENSE_ID,
      autoAds: true,
    },
  },
  structuredData: {
    organization: {
      '@type': 'Organization',
      name: process.env.SITE_NAME ?? '在线计算器',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.SITE_URL ?? 'https://www.calculatorhub.com'}/logo.png`,
        width: '180',
        height: '60',
      },
      url: process.env.SITE_URL ?? 'https://www.calculatorhub.com',
      sameAs: [
        process.env.TWITTER_URL,
        process.env.FACEBOOK_URL,
      ].filter(Boolean),
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: process.env.SUPPORT_EMAIL ?? 'support@calculatorhub.com',
      },
    },
    website: {
      '@type': 'WebSite',
      name: process.env.SITE_NAME ?? '在线计算器',
      url: process.env.SITE_URL ?? 'https://www.calculatorhub.com',
      description: process.env.DEFAULT_DESCRIPTION ?? '免费在线计算工具集合',
      inLanguage: 'zh-CN',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${process.env.SITE_URL ?? 'https://www.calculatorhub.com'}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  },
  social: {
    openGraph: {
      type: 'website',
      locale: 'zh_CN',
      alternateLocale: ['en_US'],
      title: process.env.SITE_NAME ?? '在线计算器',
      description: process.env.DEFAULT_DESCRIPTION ?? '免费在线计算工具集合',
      siteName: process.env.SITE_NAME ?? '在线计算器',
      images: [
        {
          url: process.env.DEFAULT_OG_IMAGE ?? '/og-image.png',
          width: 1200,
          height: 630,
          alt: process.env.SITE_NAME ?? '在线计算器',
        },
      ],
    },
    twitter: {
      handle: process.env.TWITTER_HANDLE,
      site: process.env.TWITTER_SITE,
      cardType: 'summary_large_image',
      title: process.env.SITE_NAME ?? '在线计算器',
      description: process.env.DEFAULT_DESCRIPTION ?? '免费在线计算工具集合',
      images: [process.env.DEFAULT_TWITTER_IMAGE ?? '/twitter-image.png'],
    },
  }
}

/**
 * 页面 SEO 配置
 */
export const pageSEOConfigs: Record<string, PageSEO> = {
  '/calculators/body-fat': {
    title: '体脂率计算器',
    description: '在线体脂率计算器，使用美国海军体脂计算公式，准确计算体脂率。支持多种测量方法，提供健康建议。',
    keywords: ['体脂率计算器', '体脂计算', '体脂率', '体脂率测量'],
    breadcrumb: [
      { name: '首页', item: process.env.SITE_URL ?? 'https://www.calculatorhub.com' },
      { name: '计算器', item: `${process.env.SITE_URL ?? 'https://www.calculatorhub.com'}/calculators` },
      { name: '体脂率计算器', item: `${process.env.SITE_URL ?? 'https://www.calculatorhub.com'}/calculators/body-fat` }
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: '体脂率计算器',
      description: '使用美国海军体脂计算公式，准确计算体脂率。',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CNY',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: process.env.SITE_NAME ?? '在线计算器',
          url: process.env.SITE_URL ?? 'https://www.calculatorhub.com'
        }
      },
      featureList: [
        '支持男性和女性体脂率计算',
        '使用美国海军体脂计算公式',
        '提供详细的健康建议',
        '完全免费使用',
        '多种计算方法可选',
        '即时计算结果',
        '健康范围参考',
        '个性化建议'
      ],
      screenshot: [
        {
          '@type': 'ImageObject',
          url: `${process.env.SITE_URL ?? 'https://www.calculatorhub.com'}/screenshots/body-fat-calculator.png`,
          caption: '体脂率计算器界面'
        }
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '1250',
        bestRating: '5',
        worstRating: '1'
      },
      review: {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '4.8',
          bestRating: '5',
          worstRating: '1'
        },
        author: {
          '@type': 'Organization',
          name: process.env.SITE_NAME ?? '在线计算器'
        },
        reviewBody: '专业的体脂率计算工具，提供准确的计算结果和实用的健康建议。'
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${process.env.SITE_URL ?? 'https://www.calculatorhub.com'}/calculators/body-fat`
      }
    }
  },
  '/health/bmi': {
    title: 'BMI计算器',
    description: '免费在线BMI计算器，快速计算身体质量指数，评估身体健康状况。提供BMI分级标准和健康建议。',
    keywords: ['BMI计算器', 'BMI', '身体质量指数', '健康评估'],
    breadcrumb: [
      { name: '首页', item: process.env.SITE_URL ?? 'https://www.calculatorhub.com' },
      { name: '健康工具', item: `${process.env.SITE_URL ?? 'https://www.calculatorhub.com'}/health` },
      { name: 'BMI计算器', item: `${process.env.SITE_URL ?? 'https://www.calculatorhub.com'}/health/bmi` }
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'BMI计算器',
      description: '免费在线BMI计算器，快速计算身体质量指数。',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CNY',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: process.env.SITE_NAME ?? '在线计算器',
          url: process.env.SITE_URL ?? 'https://www.calculatorhub.com'
        }
      },
      featureList: [
        'BMI快速计算',
        'BMI分级标准参考',
        '健康建议',
        '完全免费使用',
        '即时计算结果',
        '体重标准范围',
        '个性化建议'
      ],
      screenshot: [
        {
          '@type': 'ImageObject',
          url: `${process.env.SITE_URL ?? 'https://www.calculatorhub.com'}/screenshots/bmi-calculator.png`,
          caption: 'BMI计算器界面'
        }
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '2150',
        bestRating: '5',
        worstRating: '1'
      },
      review: {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '4.9',
          bestRating: '5',
          worstRating: '1'
        },
        author: {
          '@type': 'Organization',
          name: process.env.SITE_NAME ?? '在线计算器'
        },
        reviewBody: '简单易用的BMI计算工具，提供准确的计算结果和专业的健康建议。'
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${process.env.SITE_URL ?? 'https://www.calculatorhub.com'}/health/bmi`
      }
    }
  }
} 