import React from 'react'
import { Card } from '@/components/ui/card'
import { demoData } from '@/configs/body-fat-demo.config'
import { StaticResult } from './components/static-result'
import { DemoButton } from './components/demo-button'

export function DemoCalculator() {
  // 使用 BMI 方法的演示数据
  const data = demoData.bmi

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* 基本信息 */}
        <div>
          <h3 className="text-lg font-medium mb-4">基本信息</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">性别</p>
              <p className="font-medium">{data.gender === 'male' ? '男性' : '女性'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">年龄</p>
              <p className="font-medium">{data.age} 岁</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">身高</p>
              <p className="font-medium">{data.height} cm</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">体重</p>
              <p className="font-medium">{data.weight} kg</p>
            </div>
          </div>
        </div>

        {/* 计算结果 */}
        <StaticResult result={data.result} />

        {/* 说明文字和按钮 */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            这是一个演示示例，展示了使用 BMI 估算法计算体脂率的结果。
            您可以点击下方按钮使用完整的计算器，选择更多测量方法。
          </p>
          <DemoButton />
        </div>
      </div>
    </Card>
  )
} 