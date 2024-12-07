import { CalculatorContent, NotionBlock } from '@/types/calculators/content'
import { SyncLogger } from './logger'

interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export class ContentValidator {
  private logger: SyncLogger

  constructor() {
    this.logger = SyncLogger.getInstance()
  }

  public validate(content: CalculatorContent): ValidationResult {
    const errors: string[] = []

    // 验证元数据
    this.validateMetadata(content, errors)

    // 验证内容块
    this.validateBlocks(content.blocks, errors)

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  private validateMetadata(content: CalculatorContent, errors: string[]): void {
    const { metadata } = content

    // 必填字段验证
    if (!metadata.title) {
      errors.push('标题不能为空')
    }

    if (!metadata.calculatorId) {
      errors.push('计算器ID不能为空')
    }

    if (!metadata.description) {
      errors.push('描述不能为空')
    }

    // 状态验证
    if (!['published', 'draft'].includes(metadata.status)) {
      errors.push('无效的状态值')
    }

    // 语言验证
    if (!Array.isArray(metadata.languages) || metadata.languages.length === 0) {
      errors.push('至少需要一种语言')
    }

    // ID验证
    if (!metadata.notionId || typeof metadata.notionId.number !== 'number') {
      errors.push('无效的Notion ID')
    }

    // 日期验证
    if (!metadata.createDate || !this.isValidDate(metadata.createDate)) {
      errors.push('无效的创建日期')
    }

    if (!metadata.lastEditTime || !this.isValidDate(metadata.lastEditTime)) {
      errors.push('无效的最后编辑时间')
    }

    // 作者验证
    if (metadata.author && !this.isValidUser(metadata.author)) {
      errors.push('无效的作者信息')
    }

    if (metadata.lastEditor && !this.isValidUser(metadata.lastEditor)) {
      errors.push('无效的编辑者信息')
    }
  }

  private validateBlocks(blocks: NotionBlock[], errors: string[]): void {
    if (!Array.isArray(blocks) || blocks.length === 0) {
      errors.push('内容块不能为空')
      return
    }

    blocks.forEach((block, index) => {
      if (!block.type) {
        errors.push(`第 ${index + 1} 个块缺少类型`)
        return
      }

      if (!block.content && block.type !== 'divider') {
        errors.push(`第 ${index + 1} 个块缺少内容`)
        return
      }

      // 验证特定类型的块
      switch (block.type) {
        case 'table':
          this.validateTableBlock(block, index, errors)
          break
        case 'image':
          this.validateImageBlock(block, index, errors)
          break
        case 'code':
          this.validateCodeBlock(block, index, errors)
          break
      }
    })
  }

  private validateTableBlock(block: NotionBlock, index: number, errors: string[]): void {
    const content = block.content as any
    if (!content.rows || !Array.isArray(content.rows)) {
      errors.push(`第 ${index + 1} 个表格块缺少有效的行数据`)
      return
    }

    // 验证每一行的单元格数量是否一致
    const firstRowLength = content.rows[0]?.length
    content.rows.forEach((row: any[], rowIndex: number) => {
      if (!Array.isArray(row)) {
        errors.push(`第 ${index + 1} 个表格块的第 ${rowIndex + 1} 行不是有效的数组`)
        return
      }

      if (row.length !== firstRowLength) {
        errors.push(`第 ${index + 1} 个表格块的第 ${rowIndex + 1} 行单元格数量不一致`)
      }
    })
  }

  private validateImageBlock(block: NotionBlock, index: number, errors: string[]): void {
    const content = block.content as any
    if (!content.url) {
      errors.push(`第 ${index + 1} 个图片块缺少URL`)
    }
  }

  private validateCodeBlock(block: NotionBlock, index: number, errors: string[]): void {
    const content = block.content as any
    if (!content.code) {
      errors.push(`第 ${index + 1} 个代码块缺少代码内容`)
    }
    if (!content.language) {
      errors.push(`第 ${index + 1} 个代码块缺少语言标识`)
    }
  }

  private isValidDate(date: string): boolean {
    const timestamp = Date.parse(date)
    return !isNaN(timestamp)
  }

  private isValidUser(user: any): boolean {
    return (
      user &&
      typeof user.id === 'string' &&
      typeof user.name === 'string' &&
      typeof user.type === 'string'
    )
  }
} 