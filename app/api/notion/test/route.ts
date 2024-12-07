import { Client } from '@notionhq/client'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const NOTION_TOKEN = process.env.NOTION_TOKEN
    const DATABASE_ID = process.env.NOTION_DATABASE_ID

    if (!NOTION_TOKEN || !DATABASE_ID) {
      return NextResponse.json({ error: '环境变量缺失' }, { status: 500 })
    }

    const notion = new Client({
      auth: NOTION_TOKEN,
      notionVersion: '2022-06-28'
    })

    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      page_size: 1
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error('API 错误:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
} 