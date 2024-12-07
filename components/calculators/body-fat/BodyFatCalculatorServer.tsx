import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { LoadingSkeleton } from './components/loading-skeleton'

const BodyFatCalculator = dynamic(
  () => import('./BodyFatCalculator').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <LoadingSkeleton />
  }
)

export function BodyFatCalculatorServer() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <BodyFatCalculator />
    </Suspense>
  )
} 