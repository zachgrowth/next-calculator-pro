import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-muted mt-auto" role="contentinfo" data-testid="main-footer">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-lg font-semibold">关于我们</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              我们致力于提供专业、准确的健康计算工具，帮助用户更好地了解和管理自己的健康状况。
            </p>
          </div>

          <div>
            <nav aria-label="快速链接" className="space-y-4" data-testid="quick-links-nav">
              <h2 className="text-lg font-semibold">快速链接</h2>
              <ul className="space-y-2" role="list">
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
          </div>

          <div>
            <nav aria-label="帮助支持" className="space-y-4" data-testid="help-nav">
              <h2 className="text-lg font-semibold">帮助支持</h2>
              <ul className="space-y-2" role="list">
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
          </div>

          <div>
            <h2 className="text-lg font-semibold">联系我们</h2>
            <ul className="mt-4 space-y-2" role="list">
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
  )
} 