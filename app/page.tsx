import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRightIcon, CalculatorIcon, HeartIcon, BrainIcon, BeakerIcon } from 'lucide-react'

interface Calculator {
  title: string
  description: string
  href: string
  icon: JSX.Element
  bgColor: string
  color: string
}

const calculators: Calculator[] = [
  {
    title: '体脂计算器',
    description: '精确计算体脂率，了解身体成分',
    href: '/calculators/body-fat',
    icon: <HeartIcon className="w-6 h-6" />,
    color: 'text-rose-500',
    bgColor: 'bg-rose-50',
  },
  {
    title: 'BMI计算器',
    description: '评估身体质量指数，监控健康状态',
    href: '/calculators/bmi',
    icon: <CalculatorIcon className="w-6 h-6" />,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    title: '卡路里计算器',
    description: '计算每日所需热量，科学饮食计划',
    href: '/calculators/calorie',
    icon: <BrainIcon className="w-6 h-6" />,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
]

export const metadata: Metadata = {
  title: '健康计算器 - 您的健康管理助手',
  description: '提供体脂率、BMI、卡路里等多种健康计算工具，帮助您更好地了解和管理身体健康。'
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <nav className="flex items-center space-x-6 text-sm font-medium" data-testid="main-nav" aria-label="主导航">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">首页</Link>
            <Link href="/calculators/bmi" className="transition-colors hover:text-foreground/80 text-foreground/60">BMI计算器</Link>
            <Link href="/calculators/body-fat" className="transition-colors hover:text-foreground/80 text-foreground/60">体脂计算器</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <section className="py-16 md:py-24" data-testid="hero-section" aria-label="hero">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl font-bold text-primary sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 animate-gradient">
              专业的健康计算工具
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              帮助您更好地了解和管理身体健康，提供精确的数据分析和专业的健康建议
            </p>
          </div>
        </section>

        <section className="py-16" data-testid="features-section" aria-label="特性介绍">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
            <div className="p-6 rounded-lg bg-background border border-border"
                 data-testid="feature-card-precise"
                 aria-label="精确计算特性">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
                <CalculatorIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">精确计算</h3>
              <p className="text-sm text-muted-foreground">采用专业算法，确保计算结果的准确性</p>
            </div>

            <div className="p-6 rounded-lg bg-background border border-border"
                 data-testid="feature-card-advice"
                 aria-label="健康建议特性">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
                <HeartIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">健康建议</h3>
              <p className="text-sm text-muted-foreground">根据计算结果提供个性化的健康建议</p>
            </div>

            <div className="p-6 rounded-lg bg-background border border-border"
                 data-testid="feature-card-science"
                 aria-label="科学依据特性">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
                <BeakerIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">科学依据</h3>
              <p className="text-sm text-muted-foreground">基于科学研究和专业标准</p>
            </div>
          </div>
        </section>

        <section className="py-16" data-testid="calculators-section" aria-label="calculators">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">选择计算工具</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {calculators.map((calculator) => (
                <Link
                  key={calculator.href}
                  href={calculator.href}
                  className="group relative p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02]"
                  data-testid={`calculator-card-${calculator.title}`}
                  aria-label={`${calculator.title}卡片`}
                >
                  <div className={`w-12 h-12 rounded-full ${calculator.bgColor} ${calculator.color} flex items-center justify-center mb-4`}>
                    {calculator.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {calculator.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{calculator.description}</p>
                  <div className="flex items-center text-sm text-primary">
                    <span>开始使用</span>
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted mt-auto" role="contentinfo" data-testid="main-footer">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">关于我们</h2>
              <p className="text-sm text-muted-foreground">
                我们致力于提供最专业的健康计算工具，帮助您更好地了解和管理身体健康。
              </p>
            </div>

            <nav className="space-y-4" aria-label="快速链接">
              <h2 className="text-lg font-semibold">快速链接</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/calculators/body-fat" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    体脂计算器
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/bmi" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    BMI计算器
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/calorie" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    卡路里计算器
                  </Link>
                </li>
              </ul>
            </nav>

            <nav className="space-y-4" aria-label="帮助支持">
              <h2 className="text-lg font-semibold">帮助支持</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    常见问题
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    隐私政策
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    使用条款
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">联系我们</h2>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">
                  <a href="mailto:contact@example.com" className="hover:text-primary transition-colors">
                    contact@example.com
                  </a>
                </li>
                <li className="text-sm text-muted-foreground">
                  <a href="tel:+8612345678900" className="hover:text-primary transition-colors">
                    +86 123 4567 8900
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 