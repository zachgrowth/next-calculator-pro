const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: [
    '<rootDir>/**/__tests__/integration/**/*.{js,jsx,ts,tsx}',
  ],
  // 集成测试特定配置
  testTimeout: 10000, // 增加超时时间
  maxConcurrency: 1,  // 串行执行测试
}

module.exports = createJestConfig(customJestConfig) 