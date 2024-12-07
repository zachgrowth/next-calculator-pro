import { test, expect, type Page } from '@playwright/test'

test.describe('Home Page', () => {
  let page: Page

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage
    await page.goto('/')
  })

  test('should navigate to calculators', async () => {
    // 验证页面标题
    await expect(page).toHaveTitle(/健康计算器/)
    
    // 验证主标题
    const heading = page.getByRole('heading', { name: '专业的健康计算工具' })
    await expect(heading).toBeVisible()
    
    // 测试导航到体脂计算器
    const bfLink = page.getByRole('link', { name: '体脂计算器' })
    await bfLink.click()
    await expect(page).toHaveURL(/.*body-fat/)
    
    // 返回首页
    await page.goto('/')
    
    // 测试导航到BMI计算器
    const bmiLink = page.getByRole('link', { name: 'BMI计算器' })
    await bmiLink.click()
    await expect(page).toHaveURL(/.*bmi/)
    
    // 返回首页
    await page.goto('/')
    
    // 测试导航到卡路里计算器
    const calorieLink = page.getByRole('link', { name: '卡路里计算器' })
    await calorieLink.click()
    await expect(page).toHaveURL(/.*calorie/)
  })

  test('should have responsive design', async () => {
    // 桌面视图测试
    await page.setViewportSize({ width: 1280, height: 800 })
    const desktopGrid = page.locator('.grid')
    await expect(desktopGrid).toHaveClass(/md:grid-cols-3/)
    
    // 平板视图测试
    await page.setViewportSize({ width: 768, height: 1024 })
    const tabletGrid = page.locator('.grid')
    await expect(tabletGrid).toHaveClass(/sm:grid-cols-2/)
    
    // 移动端视图测试
    await page.setViewportSize({ width: 375, height: 667 })
    const mobileGrid = page.locator('.grid')
    await expect(mobileGrid).not.toHaveClass(/md:grid-cols-3/)
  })

  test('should have working animations', async () => {
    // 测试卡片悬停效果
    const card = page.locator('.group').first()
    await card.hover()
    await expect(card).toHaveClass(/hover:scale-\[1\.02\]/)
    
    // 测试渐变动画
    const title = page.locator('.animate-gradient')
    await expect(title).toBeVisible()
    await expect(title).toHaveCSS('animation', /gradient/)
  })
}) 