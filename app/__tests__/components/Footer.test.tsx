import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import Footer from '@/components/shared/Footer'

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />)
  })

  it('renders footer with correct role', () => {
    const footer = screen.getByTestId('main-footer')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveAttribute('role', 'contentinfo')
  })

  it('renders quick links navigation correctly', () => {
    const quickLinksNav = screen.getByTestId('quick-links-nav')
    expect(quickLinksNav).toBeInTheDocument()
    expect(quickLinksNav).toHaveAttribute('aria-label', '快速链接')

    const links = [
      { text: '体脂计算器', href: '/calculators/body-fat' },
      { text: 'BMI计算器', href: '/calculators/bmi' },
      { text: '卡路里计算器', href: '/calculators/calorie' }
    ]

    const list = within(quickLinksNav).getByRole('list')
    expect(list).toBeInTheDocument()

    links.forEach(({ text, href }) => {
      const link = within(list).getByRole('link', { name: text })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', href)
    })
  })

  it('renders help support navigation correctly', () => {
    const helpNav = screen.getByTestId('help-nav')
    expect(helpNav).toBeInTheDocument()
    expect(helpNav).toHaveAttribute('aria-label', '帮助支持')

    const links = [
      { text: '常见��题', href: '/faq' },
      { text: '隐私政策', href: '/privacy' },
      { text: '使用条款', href: '/terms' }
    ]

    const list = within(helpNav).getByRole('list')
    expect(list).toBeInTheDocument()

    links.forEach(({ text, href }) => {
      const link = within(list).getByRole('link', { name: text })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', href)
    })
  })

  it('renders contact information correctly', () => {
    const footer = screen.getByTestId('main-footer')
    const contacts = [
      { text: 'contact@example.com', href: 'mailto:contact@example.com' },
      { text: '+86 123 4567 8900', href: 'tel:+8612345678900' }
    ]

    contacts.forEach(({ text, href }) => {
      const link = within(footer).getByRole('link', { name: text })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', href)
    })
  })

  it('renders all section headings', () => {
    const footer = screen.getByTestId('main-footer')
    const headings = ['关于我们', '快速链接', '帮助支持', '联系我们']
    
    headings.forEach(heading => {
      const element = within(footer).getByRole('heading', { name: heading })
      expect(element).toBeInTheDocument()
    })
  })
}) 