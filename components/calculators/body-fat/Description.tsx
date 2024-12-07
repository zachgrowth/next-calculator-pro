import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { demoData } from '@/configs/body-fat-demo.config'
import { StaticResult } from './components/static-result'
import { DemoButton } from './components/demo-button'

export default function Description() {
  const data = demoData.bmi

  return (
    <div className="space-y-6">
      {/* 演示数据卡片 */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">示例数据</h3>
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

          <StaticResult result={data.result} />

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              这是一个演示示例，展示了使用 BMI 估算法计算体脂率的结果。
              您可以点击下方按钮使用完整的计算器，选择更多测量方法。
            </p>
            <DemoButton />
          </div>
        </div>
      </Card>

      {/* 使用说明卡片 */}
      <Card>
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
          <CardDescription>
            了解如何准确测量和解读结果
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>如何准确测量？</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-4 space-y-2">
                  <li>使用软尺在早晨空腹时测量</li>
                  <li>保持自然站姿，不要收腹或鼓肚</li>
                  <li>测量时保持软尺水平</li>
                  <li>每个部位测量2-3次取平均值</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>体脂率标准是什么？</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p className="font-medium">男性标准：</p>
                  <ul className="list-disc pl-4">
                    <li>必需脂肪：2-5%</li>
                    <li>运动员：6-13%</li>
                    <li>健康：14-17%</li>
                    <li>可接受：18-25%</li>
                    <li>肥胖：25%以上</li>
                  </ul>
                  
                  <p className="font-medium mt-4">女性标准：</p>
                  <ul className="list-disc pl-4">
                    <li>必需脂肪：10-13%</li>
                    <li>运动员：14-20%</li>
                    <li>健康：21-24%</li>
                    <li>可接受：25-31%</li>
                    <li>肥胖：32%以上</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>如何降低体脂率？</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-4 space-y-2">
                  <li>合理控制热量摄入</li>
                  <li>增加有氧运动频率</li>
                  <li>进行力量训练增加肌肉量</li>
                  <li>保持充足睡眠</li>
                  <li>避免压力过大</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
} 