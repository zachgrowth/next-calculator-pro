import { Client } from '@notionhq/client'
import { NotionContentConverter } from './content-converter'
import { NotionContentProcessor } from './content-processor'
import { ContentValidator } from './content-validator'
import { SyncLogger } from './logger'
import { NotionSyncError, NotionSyncErrorCode } from './errors'
import { syncConfig } from './config'
import { CalculatorContent } from '@/types/calculators/content'

export class NotionSync {
  private notion: Client
  private converter: NotionContentConverter
  private validator: ContentValidator
  private processor: NotionContentProcessor
  private logger: SyncLogger

  constructor() {
    this.notion = new Client({ auth: process.env.NOTION_TOKEN || '' })
    this.converter = new NotionContentConverter(this.notion)
    this.validator = new ContentValidator()
    this.processor = new NotionContentProcessor()
    this.logger = SyncLogger.getInstance()
  }

  private async syncContent(pageId: string): Promise<void> {
    try {
      // 1. 获取页面内容
      const content = await this.converter.convertPage(pageId)
      
      // 2. 验证内容
      const validationResult = this.validator.validate(content)
      if (!validationResult.isValid) {
        throw new NotionSyncError(
          NotionSyncErrorCode.CONTENT_VALIDATION_FAILED,
          `页面 ${pageId} 内容验证失败: ${validationResult.errors.join(', ')}`
        )
      }

      // 3. 处理内容
      await this.processor.process(content)
    } catch (error) {
      throw new NotionSyncError(
        NotionSyncErrorCode.UNKNOWN_ERROR,
        `页面 ${pageId} 同步时发生错误: ${error}`,
        error
      )
    }
  }

  public async sync(): Promise<void> {
    try {
      this.logger.info('[开始] 同步 Notion 内容')

      // 1. 获取数据库结构
      const database = await this.notion.databases.retrieve({
        database_id: syncConfig.databaseId
      })

      this.logger.info('数据库属性结构:', {
        properties: database.properties,
        object: database.object,
        id: database.id
      })

      // 2. 查询已发布的页面
      const response = await this.notion.databases.query({
        database_id: syncConfig.databaseId,
        filter: {
          property: 'Status',
          select: {
            equals: 'Published'
          }
        }
      })

      // 3. 同步每个页面
      let successCount = 0
      let failureCount = 0

      for (const page of response.results) {
        try {
          await this.syncContent(page.id)
          successCount++
        } catch (error) {
          failureCount++
          this.logger.error(`页面 ${page.id} 同步时发生错误:`, error)
        }
      }

      this.logger.info('同步完成统计:', {
        '总页面数': response.results.length,
        '成功数': successCount,
        '失败数': failureCount
      })

      this.logger.info('[完成] 同步 Notion 内容')
    } catch (error) {
      this.logger.error('[UNKNOWN_ERROR] 未知错误:', error)
      throw new NotionSyncError(
        NotionSyncErrorCode.UNKNOWN_ERROR,
        `未知错误: ${error}`,
        error
      )
    }
  }
} 