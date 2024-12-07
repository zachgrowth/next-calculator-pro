import type { BreadcrumbItem } from '@/types/shared/navigation'

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={className}>
      <ol className="flex space-x-2 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={item.item} className="flex items-center">
            <a 
              href={item.item} 
              className="hover:text-primary transition-colors"
              {...(index === items.length - 1 ? { 'aria-current': 'page' } : {})}
            >
              {item.name}
            </a>
            {index < items.length - 1 && (
              <span className="mx-2" aria-hidden="true">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
} 