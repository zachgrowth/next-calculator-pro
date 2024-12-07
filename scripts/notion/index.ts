import { NotionSync } from './sync-notion'

async function main() {
  const sync = new NotionSync()
  await sync.sync()
}

main().catch(error => {
  console.error('同步失败:', error)
  process.exit(1)
}) 