import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import Navigation from '@/components/shared/Navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Navigation Component', () => {
  beforeEach(() => {
    render(<Navigation />)
  })

  it('renders navigation with correct aria-label', () => {
    const nav = screen.getByTestId('main-nav')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute('aria-label', '主导航')
  })

  it('contains all required navigation links', () => {
    const nav = screen.getByTestId('main-nav')
    const links = [
      { text: '首页', href: '/' },
      { text: 'BMI计算器', href: '/health/bmi' },
      { text: '体脂计算器', href: '/calculators/body-fat' }
    ]

    links.forEach(({ text, href }) => {
      const link = within(nav).getByRole('link', { name: text })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', href)
    })
  })

  it('has correct accessibility structure', () => {
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    
    const nav = screen.getByTestId('main-nav')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute('aria-label', '主导航')
  })
}) 