import { PageMetadata } from '@/types/calculators/content'

interface PageHeaderProps {
  metadata?: PageMetadata
  defaultTitle: string
  className?: string
}

export default function PageHeader({ metadata, defaultTitle, className = '' }: PageHeaderProps) {
  return (
    <header className={`mb-8 ${className}`}>
      <h1 
        className="text-4xl font-bold text-primary"
        itemProp="headline"
      >
        {metadata?.title || defaultTitle}
      </h1>
      {metadata?.description && (
        <p 
          className="mt-2 text-lg text-muted-foreground"
          itemProp="description"
        >
          {metadata.description}
        </p>
      )}
    </header>
  )
} 