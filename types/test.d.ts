import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveTextContent(text: string): R
      toHaveClass(className: string | RegExp): R
      toBeVisible(): R
      toHaveLength(length: number): R
    }
  }
} 