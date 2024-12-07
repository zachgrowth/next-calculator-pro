import { Card } from '@/components/ui/card'

export default function Description() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">什么是 BMI？</h2>
          <p className="mt-2 text-muted-foreground">
            身体质量指数（Body Mass Index，简称BMI）是目前国际上常用的衡量人体胖瘦程度以及是否健康的一个标准。
          </p>
        </div>

        <div>
          <h3 className="font-medium">计算方法</h3>
          <p className="mt-1 text-muted-foreground">
            BMI = 体重(kg) ÷ 身高²(m²)
          </p>
        </div>

        <div>
          <h3 className="font-medium">使用说明</h3>
          <ul className="mt-1 space-y-1 text-muted-foreground list-disc list-inside">
            <li>输入您的身高（厘米）和体重（公斤）</li>
            <li>系统会自动计算您的 BMI 值</li>
            <li>根据计算结果判断您的体重状况</li>
            <li>获取相应的健康建议</li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium">注意事项</h3>
          <ul className="mt-1 space-y-1 text-muted-foreground list-disc list-inside">
            <li>BMI 不适用于运动员、孕妇和儿童</li>
            <li>肌肉发达者的 BMI 可能偏高</li>
            <li>老年人的标准略有不同</li>
            <li>仅作参考，不能替代医生诊断</li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium">健康建议</h3>
          <ul className="mt-1 space-y-1 text-muted-foreground list-disc list-inside">
            <li>保持均衡饮食，注意营养搭配</li>
            <li>规律运动，每周至少150分钟</li>
            <li>保持良好的作息习惯</li>
            <li>定期体检，关注身体变化</li>
          </ul>
        </div>
      </div>
    </Card>
  )
} 