import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BodyFatCalculator from '@/components/calculators/body-fat/BodyFatCalculator'

describe('Body Fat Calculator Integration', () => {
  it('should calculate body fat percentage correctly', async () => {
    const user = userEvent.setup()
    render(<BodyFatCalculator />)
    
    // 填写表单
    await user.type(screen.getByRole('spinbutton', { name: /体重/i }), '70')
    await user.type(screen.getByRole('spinbutton', { name: /身高/i }), '175')
    await user.type(screen.getByRole('spinbutton', { name: /年龄/i }), '30')
    
    // 提交表单
    await user.click(screen.getByRole('button', { name: /计算/i }))
    
    // 验证结果显示
    const resultSection = await screen.findByRole('region', { name: /计算结果/i })
    expect(resultSection).toBeInTheDocument()
    
    // 验证结果值
    const bodyFatValue = screen.getByRole('heading', { level: 2 })
    expect(bodyFatValue.textContent).toMatch(/\d+(\.\d+)?%/)
  })

  it('should show validation errors for invalid inputs', async () => {
    const user = userEvent.setup()
    render(<BodyFatCalculator />)
    
    // 输入无效数据
    await user.type(screen.getByRole('spinbutton', { name: /体重/i }), '10')
    await user.type(screen.getByRole('spinbutton', { name: /身高/i }), '30')
    await user.type(screen.getByRole('spinbutton', { name: /年龄/i }), '150')
    
    // 验证错误信息
    const errors = screen.getAllByRole('alert')
    expect(errors).toHaveLength(3)
    expect(errors[0]).toHaveTextContent('体重必须在 20-300 kg 之间')
    expect(errors[1]).toHaveTextContent('身高必须在 50-250 cm 之间')
    expect(errors[2]).toHaveTextContent('年龄必须在 0-120 岁之间')
    
    // 验证提交按钮被禁用
    const submitButton = screen.getByRole('button', { name: /计算/i })
    expect(submitButton).toBeDisabled()
  })

  it('should handle gender selection correctly', async () => {
    const user = userEvent.setup()
    render(<BodyFatCalculator />)
    
    // 获取性别选择按钮
    const maleRadio = screen.getByRole('radio', { name: /男性/i })
    const femaleRadio = screen.getByRole('radio', { name: /女性/i })
    
    // 验证默认选择
    expect(maleRadio).toBeChecked()
    expect(femaleRadio).not.toBeChecked()
    
    // 切换选择
    await user.click(femaleRadio)
    expect(femaleRadio).toBeChecked()
    expect(maleRadio).not.toBeChecked()
  })

  it('should handle form submission correctly', async () => {
    const user = userEvent.setup()
    render(<BodyFatCalculator />)
    
    // 获取表单
    const form = screen.getByRole('form', { name: /体脂率计算器表单/i })
    expect(form).toBeInTheDocument()
    
    // 填写表单
    await user.type(screen.getByRole('spinbutton', { name: /体重/i }), '70')
    await user.type(screen.getByRole('spinbutton', { name: /身高/i }), '175')
    await user.type(screen.getByRole('spinbutton', { name: /年龄/i }), '30')
    
    // 提交表单
    await user.click(screen.getByRole('button', { name: /计算/i }))
    
    // 验证结果显示
    const resultSection = await screen.findByRole('region', { name: /计算结果/i })
    expect(resultSection).toBeInTheDocument()
    
    // 验证结果内容
    const bodyFatValue = screen.getByRole('heading', { level: 2 })
    expect(bodyFatValue.textContent).toMatch(/\d+(\.\d+)?%/)
  })
}) 