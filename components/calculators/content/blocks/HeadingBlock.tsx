import { NotionBlock, TextContent } from '@/types/calculators/content'
import { slugify } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Props {
  block: NotionBlock
}

export function HeadingBlock({ block }: Props) {
  const content = Array.isArray(block.content) ? block.content : []
  const text = content.map(item => item.text).join('')
  
  const id = slugify(text)
  
  const Tag = block.type === 'heading_1' 
    ? 'h1' 
    : block.type === 'heading_2' 
    ? 'h2' 
    : 'h3'

  return (
    <Tag id={id} className="scroll-mt-20">
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
    </Tag>
  )
} 