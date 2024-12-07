import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { LoadingSkeleton } from '@/components/calculators/bmi/components/loading-skeleton'

const BMICalculator = dynamic(
  () => import('./BMICalculator').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <LoadingSkeleton />
  }
)

export function BMICalculatorServer() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <BMICalculator />
    </Suspense>
  )
} 