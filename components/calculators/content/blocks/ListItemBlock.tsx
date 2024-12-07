import { NotionBlock, TextContent } from '@/types/calculators/content'
import { cn } from '@/lib/utils'

interface Props {
  block: NotionBlock
}

export function ListItemBlock({ block }: Props) {
  const content = Array.isArray(block.content) ? block.content : []
  const Tag = block.type === 'bulleted_list_item' ? 'ul' : 'ol'

  return (
    <Tag>
      <li>
        {content.map((item, index) => (
          <span
            key={index}
            className={cn(
              item.annotations?.bold && 'font-bold',
              item.annotations?.italic && 'italic',
              item.annotations?.underline && 'underline',
              item.annotations?.strikethrough && 'line-through',
              item.annotations?.code && 'font-mono bg-muted px-1.5 py-0.5 rounded-sm'
            )}
          >
            {item.text}
          </span>
        ))}
      </li>
    </Tag>
  )
} 