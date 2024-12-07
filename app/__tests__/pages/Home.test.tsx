import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import Home from '@/app/page'

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

    it('renders feature sections correctly', () => {
      const featuresSection = screen.getByTestId('features-section')
      const features = [
        '精确计算',
        '健康建议',
        '科学依据'
      ]

      features.forEach(feature => {
        const featureHeading = within(featuresSection).getByRole('heading', { 
          name: new RegExp(`^${feature}$`, 'i'),
          level: 3
        })
        expect(featureHeading).toBeInTheDocument()
      })
    })
  })

  describe('Calculator Section', () => {
    it('renders calculator section heading', () => {
      const calculatorsSection = screen.getByTestId('calculators-section')
      const sectionHeading = within(calculatorsSection).getByRole('heading', {
        name: /选择计算工具/i,
        level: 2
      })
      expect(sectionHeading).toBeInTheDocument()
    })

    it('renders all calculator cards', () => {
      const calculatorsSection = screen.getByTestId('calculators-section')
      const calculators = [
        {
          title: '体脂计算器',
          href: '/calculators/body-fat'
        },
        {
          title: 'BMI计算器',
          href: '/calculators/bmi'
        },
        {
          title: '卡路里计算器',
          href: '/calculators/calorie'
        }
      ]

      calculators.forEach(calculator => {
        const card = screen.getByTestId(`calculator-card-${calculator.title}`)
        expect(card).toBeInTheDocument()
        expect(card).toHaveAttribute('href', calculator.href)

        const heading = within(card).getByRole('heading', { 
          name: calculator.title,
          level: 3
        })
        expect(heading).toBeInTheDocument()
      })
    })
  })

  describe('Page Structure', () => {
    it('has correct main content area', () => {
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
    })

    it('has correct section structure', () => {
      const sections = [
        { id: 'hero-section', label: 'hero' },
        { id: 'features-section', label: 'features' },
        { id: 'calculators-section', label: 'calculators' }
      ]

      sections.forEach(section => {
        const element = screen.getByTestId(section.id)
        expect(element).toBeInTheDocument()
        expect(element).toHaveAttribute('aria-label', section.label)
      })
    })
  })
}) 