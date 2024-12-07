import React from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '../../../ui/skeleton'

export function LoadingSkeleton() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-2/3 mt-2" />
        </div>

        <div className="space-y-4">
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <div className="flex space-x-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>

          <Skeleton className="h-10 w-full" />
        </div>

        <div>
          <Skeleton className="h-5 w-32 mb-2" />
          <div className="space-y-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
} 