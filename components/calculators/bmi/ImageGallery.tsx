import Image from 'next/image'
import { Card } from '@/components/ui/card'

export function ImageGallery() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">BMI 参考图表</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <div className="aspect-video relative">
            <Image
              src="/images/bmi/bmi-chart.png"
              alt="BMI 分布图表"
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground text-center">
            BMI 分布图表
          </p>
        </Card>
        <Card className="p-4">
          <div className="aspect-video relative">
            <Image
              src="/images/bmi/bmi-categories.png"
              alt="BMI 分类标准"
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground text-center">
            BMI 分类标准
          </p>
        </Card>
      </div>
    </div>
  )
} 