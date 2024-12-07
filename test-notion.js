const { Client } = require("@notionhq/client")
const { config } = require("dotenv")
const { join } = require('path')

// 加载环境变量
const envPath = join(process.cwd(), '.env.local')
config({ path: envPath })

const NOTION_TOKEN = process.env.NOTION_TOKEN
const DATABASE_ID = process.env.NOTION_DATABASE_ID

if (!NOTION_TOKEN || !DATABASE_ID) {
  throw new Error('请在 .env.local 文件中设置 NOTION_TOKEN 和 NOTION_DATABASE_ID')
}

// 初始化 Notion 客户端
const notion = new Client({
  auth: NOTION_TOKEN,
  notionVersion: '2022-06-28'
})

async function testNotionConnection() {
  try {
    // 1. 测试数据库访问
    console.log('测试数据库访问...')
    const database = await notion.databases.retrieve({
      database_id: DATABASE_ID
    })
    console.log('数据库信息:', JSON.stringify(database, null, 2))

    // 2. 获取数据库内容
    console.log('\n获取数据库内容...')
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      page_size: 1
    })
    console.log('查询结果:', JSON.stringify(response, null, 2))

    // 3. 如果有页面，获取页面内容
    if (response.results.length > 0) {
      const pageId = response.results[0].id
      console.log('\n获取页面内容...')
      const blocks = await notion.blocks.children.list({
        block_id: pageId
      })
      console.log('页面内容:', JSON.stringify(blocks, null, 2))
    }

  } catch (error) {
    console.error('测试失败:', error)
    if (error.code === 'unauthorized') {
      console.error('API Token 无效或权限不足')
    } else if (error.code === 'object_not_found') {
      console.error('找不到指定的数据库，请检查数据库 ID')
    }
  }
}

// 运行测试
console.log('开始测试 Notion API...')
console.log('使用的 Token:', NOTION_TOKEN)
console.log('使用的数据库 ID:', DATABASE_ID)
testNotionConnection() 