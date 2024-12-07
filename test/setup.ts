/// <reference types="jest" />
import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

// 设置全局变量
if (typeof global.TextEncoder === 'undefined') {
  (global as any).TextEncoder = TextEncoder
}
if (typeof global.TextDecoder === 'undefined') {
  (global as any).TextDecoder = TextDecoder
}

// 模拟 window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// 模拟 IntersectionObserver
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
})
window.IntersectionObserver = mockIntersectionObserver as any

// 模拟 ResizeObserver
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
})) as any

// 清理所有模拟
afterEach(() => {
  jest.clearAllMocks()
}) 