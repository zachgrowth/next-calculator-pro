import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import RootLayout from '@/app/layout'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Root Layout Integration', () => {
  beforeEach(() => {
    render(
      <RootLayout>
        <main data-testid="test-content">Test Content</main>
      </RootLayout>
    )
  })

  describe('Navigation Integration', () => {
    it('renders navigation in correct position', () => {
      const header = screen.getByRole('banner')
      const nav = within(header).getByTestId('main-nav')
      expect(nav).toBeInTheDocument()
      expect(nav).toHaveAttribute('aria-label', '主导航')
    })

    it('navigation is accessible and functional', () => {
      const nav = screen.getByTestId('main-nav')
      const links = within(nav).getAllByRole('link')
      expect(links.length).toBeGreaterThan(0)
      
      links.forEach(link => {
        expect(link).toHaveAttribute('href')
        expect(link).toHaveClass('transition-colors')
      })
    })
  })

  describe('Footer Integration', () => {
    it('renders footer in correct position', () => {
      const footer = screen.getByTestId('main-footer')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveAttribute('role', 'contentinfo')
    })

    it('footer navigation sections are properly structured', () => {
      const quickLinksNav = screen.getByTestId('quick-links-nav')
      const helpNav = screen.getByTestId('help-nav')

      expect(quickLinksNav).toBeInTheDocument()
      expect(helpNav).toBeInTheDocument()

      // 验证导航区域的结构
      const sections = [
        { nav: quickLinksNav, title: '快速链接' },
        { nav: helpNav, title: '帮助支持' }
      ]

      sections.forEach(({ nav, title }) => {
        expect(nav).toHaveAttribute('aria-label', title)
        
        const heading = within(nav).getByRole('heading', { name: title })
        expect(heading).toBeInTheDocument()
        
        const list = within(nav).getByRole('list')
        expect(list).toBeInTheDocument()
        
        const links = within(list).getAllByRole('link')
        expect(links.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Layout Structure', () => {
    it('renders all major sections in correct order', () => {
      const header = screen.getByRole('banner')
      const main = screen.getByTestId('test-content')
      const footer = screen.getByTestId('main-footer')

      expect(header).toBeInTheDocument()
      expect(main).toBeInTheDocument()
      expect(footer).toBeInTheDocument()

      // 验证DOM顺序
      expect(header.compareDocumentPosition(main)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
      expect(main.compareDocumentPosition(footer)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    })

    it('has correct accessibility landmarks', () => {
      const landmarks = {
        banner: screen.getByRole('banner'),
        navigation: screen.getByTestId('main-nav'),
        main: screen.getByTestId('test-content'),
        contentinfo: screen.getByTestId('main-footer')
      }

      Object.values(landmarks).forEach(landmark => {
        expect(landmark).toBeInTheDocument()
      })
    })
  })
}) 