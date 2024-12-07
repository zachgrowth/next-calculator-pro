import React from 'react'
import { Card } from '@/components/ui/card'

interface StaticResultProps {
  result: {
    bodyFatPercentage: number
    healthyRange: {
      min: number
      max: number
    }
    classification: string
    healthRisks: string[]
    idealWeight: {
      min: number
      max: number
    }
    bodyType: string
  }
}

export function StaticResult({ result }: StaticResultProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold mb-2">计算结果</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-3xl font-bold text-primary">
              {result.bodyFatPercentage.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-500">体脂率</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-secondary">
              {result.classification}
            </p>
            <p className="text-sm text-gray-500">体型分类</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">健康范围</h4>
        <p className="text-gray-600">
          {result.healthyRange.min}% - {result.healthyRange.max}%
        </p>
      </div>

      <div>
        <h4 className="font-medium mb-2">理想体重范围</h4>
        <p className="text-gray-600">
          {result.idealWeight.min.toFixed(1)}kg - {result.idealWeight.max.toFixed(1)}kg
        </p>
      </div>

      {result.healthRisks.length > 0 && (
        <div>
          <h4 className="font-medium mb-2 text-yellow-600">健康提示</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {result.healthRisks.map((risk, index) => (
              <li key={index}>{risk}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
} 