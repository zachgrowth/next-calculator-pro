'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <nav className="flex items-center space-x-6 text-sm font-medium" aria-label="主导航">
          <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
            首页
          </Link>
          <Link href="/health/bmi" className="transition-colors hover:text-foreground/80 text-foreground/60">
            BMI计算器
          </Link>
          <Link href="/calculators/body-fat" className="transition-colors hover:text-foreground/80 text-foreground/60">
            体脂计算器
          </Link>
        </nav>
      </div>
    </header>
  )
} 

// 面包屑导航项类型
export interface BreadcrumbItem {
  name: string    // 导航项名称
  item: string    // 导航项链接
}