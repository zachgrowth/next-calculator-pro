import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import Home from '../page'

describe('Home Page', () => {
  beforeEach(() => {
    render(<Home />)
  })

  describe('Hero Section', () => {
    it('renders main heading correctly', () => {
      const heroSection = screen.getByTestId('hero-section')
      const mainHeading = within(heroSection).getByRole('heading', { 
        name: /专业的健康计算工具/i,
        level: 1 
      })
      expect(mainHeading).toBeInTheDocument()
    })
  })

  describe('Features Section', () => {
    it('renders feature sections correctly', () => {
      const featuresSection = screen.getByTestId('features-section')
      expect(featuresSection).toBeInTheDocument()
      expect(featuresSection).toHaveAttribute('aria-label', '特性介绍')
      
      const features = [
        { title: '精确计算', testId: 'feature-card-precise' },
        { title: '健康建议', testId: 'feature-card-advice' },
        { title: '科学依据', testId: 'feature-card-science' }
      ]

      features.forEach(({ title, testId }) => {
        const featureCard = screen.getByTestId(testId)
        expect(featureCard).toBeInTheDocument()
        expect(featureCard).toHaveAttribute('aria-label', `${title}特性`)
        
        const heading = within(featureCard).getByRole('heading', { 
          name: title,
          level: 3 
        })
        expect(heading).toBeInTheDocument()
      })
    })
  })

  describe('Calculators Section', () => {
    it('renders calculator sections correctly', () => {
      const calculatorsSection = screen.getByTestId('calculators-section')
      expect(calculatorsSection).toBeInTheDocument()
      expect(calculatorsSection).toHaveAttribute('aria-label', 'calculators')
      
      const sectionHeading = within(calculatorsSection).getByRole('heading', {
        name: /选择计算工具/i,
        level: 2
      })
      expect(sectionHeading).toBeInTheDocument()

      const calculators = [
        { title: '体脂计算器', testId: 'calculator-card-体脂计算器' },
        { title: 'BMI计算器', testId: 'calculator-card-BMI计算器' },
        { title: '卡路里计算器', testId: 'calculator-card-卡路里计算器' }
      ]

      calculators.forEach(({ title, testId }) => {
        const calculatorCard = screen.getByTestId(testId)
        expect(calculatorCard).toBeInTheDocument()
        expect(calculatorCard).toHaveAttribute('aria-label', `${title}卡片`)
        
        const heading = within(calculatorCard).getByRole('heading', {
          name: title,
          level: 3
        })
        expect(heading).toBeInTheDocument()
      })
    })
  })

  describe('Navigation', () => {
    it('has correct navigation links', () => {
      const mainNav = screen.getByTestId('main-nav')
      expect(mainNav).toBeInTheDocument()
      expect(mainNav).toHaveAttribute('aria-label', '主导航')

      const headerLinks = [
        { text: '首页', href: '/' },
        { text: 'BMI计算器', href: '/health/bmi' },
        { text: '体脂计算器', href: '/calculators/body-fat' }
      ]
      
      headerLinks.forEach(({ text, href }) => {
        const link = within(mainNav).getByRole('link', { name: text })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', href)
      })
    })
  })

  describe('Footer', () => {
    it('has correct footer navigation', () => {
      const footer = screen.getByTestId('main-footer')
      expect(footer).toBeInTheDocument()

      const quickLinksNav = within(footer).getByRole('navigation', { name: /快速链接/i })
      expect(quickLinksNav).toBeInTheDocument()

      const helpNav = within(footer).getByRole('navigation', { name: /帮助支持/i })
      expect(helpNav).toBeInTheDocument()
    })

    it('has correct footer links', () => {
      const footer = screen.getByTestId('main-footer')
      const quickLinksNav = within(footer).getByRole('navigation', { name: /快速链接/i })
      const quickLinks = [
        { text: '体脂计算器', href: '/calculators/body-fat' },
        { text: 'BMI计算器', href: '/calculators/bmi' },
        { text: '卡路里计算器', href: '/calculators/calorie' }
      ]
      
      quickLinks.forEach(({ text, href }) => {
        const link = within(quickLinksNav).getByRole('link', { name: text })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', href)
      })

      const helpNav = within(footer).getByRole('navigation', { name: /帮助支持/i })
      const helpLinks = [
        { text: '常见问题', href: '/faq' },
        { text: '隐私政策', href: '/privacy' },
        { text: '使用条款', href: '/terms' }
      ]
      
      helpLinks.forEach(({ text, href }) => {
        const link = within(helpNav).getByRole('link', { name: text })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', href)
      })
    })
  })

  describe('Accessibility', () => {
    it('has correct accessibility attributes', () => {
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()

      const mainNav = screen.getByTestId('main-nav')
      expect(mainNav).toBeInTheDocument()
      expect(mainNav).toHaveAttribute('aria-label', '主导航')

      const footer = screen.getByTestId('main-footer')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveAttribute('role', 'contentinfo')

      const quickLinksNav = within(footer).getByRole('navigation', { name: /快速链接/i })
      expect(quickLinksNav).toBeInTheDocument()

      const helpNav = within(footer).getByRole('navigation', { name: /帮助支持/i })
      expect(helpNav).toBeInTheDocument()
    })
  })
}) 