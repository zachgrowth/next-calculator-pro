'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { BodyFatResult } from '@/types/calculators/body-fat'

interface ResultDisplayProps {
  result: BodyFatResult
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const {
    bodyFatPercentage,
    healthyRange,
    classification,
    healthRisks,
    idealWeight,
  } = result

  // 计算进度条的值和颜色
  const progressValue = Math.min(100, (bodyFatPercentage / 60) * 100)
  const getProgressColor = () => {
    switch (classification) {
      case '必需脂肪':
        return 'bg-yellow-500'
      case '运动员':
        return 'bg-green-500'
      case '健康':
        return 'bg-green-400'
      case '可接受':
        return 'bg-yellow-400'
      case '肥胖':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">计算结果</h3>
        <div className="flex items-center justify-between">
          <span>体脂率</span>
          <span className="text-xl font-bold">{bodyFatPercentage.toFixed(1)}%</span>
        </div>
        <Progress 
          value={progressValue} 
          className={cn("h-2", getProgressColor())} 
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>分类</span>
          <span className="font-medium">{classification}</span>
        </div>
        <div className="flex justify-between">
          <span>健康范围</span>
          <span className="font-medium">{healthyRange.min}% - {healthyRange.max}%</span>
        </div>
        <div className="flex justify-between">
          <span>理想体重范围</span>
          <span className="font-medium">
            {idealWeight.min.toFixed(1)} - {idealWeight.max.toFixed(1)} kg
          </span>
        </div>
      </div>

      {healthRisks.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">健康建议</h4>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {healthRisks.map((risk, index) => (
              <li key={index}>{risk}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  )
} 