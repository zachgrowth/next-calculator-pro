import path from 'path'
import dotenv from 'dotenv'
import { SyncLogger } from './logger'

// 加载环境变量
const envPath = path.resolve(process.cwd(), '.env.local')
const result = dotenv.config({ path: envPath })

const logger = SyncLogger.getInstance()
logger.info('环境变量文件路径:', envPath)
logger.info('dotenv 加载结果:', result)

// 验证必要的环境变量
if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
  throw new Error('缺少必要的环境变量: NOTION_TOKEN 或 NOTION_DATABASE_ID')
}

// 同步配置
export const syncConfig = {
  databaseId: process.env.NOTION_DATABASE_ID,
  paths: {
    content: path.join(process.cwd(), 'content'),
    types: path.join(process.cwd(), 'types/generated')
  }
}

// 记录配置信息（隐藏敏感信息）
logger.info('环境变量值:', {
  NOTION_TOKEN: '已设置',
  NOTION_DATABASE_ID: '已设置',
  'process.env.NOTION_DATABASE_ID': process.env.NOTION_DATABASE_ID,
  'syncConfig.databaseId': syncConfig.databaseId,
  DEBUG_MODE: process.env.DEBUG_MODE,
  DEBUG_LEVEL: process.env.DEBUG_LEVEL
}) 