export function BodyFatCalculatorSkeleton() {
  // 这里定义初始值
  const initialData = {
    gender: 'male',
    age: '25',
    weight: '70',
    height: '175',
    method: 'bmi',
    result: {
      bodyFatPercentage: 15,
      healthyRange: { min: 8, max: 20 },
      classification: '健康',
      healthRisks: [],
      idealWeight: { min: 60, max: 75 },
      bodyType: '健康'
    }
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">体脂率计算器</h2>
          <p className="text-sm text-muted-foreground">
            通过多种方法计算体脂率，包括BMI法、皮褶测量法、腰围法和生物电阻抗法
          </p>
        </div>

        {/* 测量方法选择 */}
        <div>
          <h3 className="font-medium mb-2">测量方法</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="p-2 border rounded text-center">BMI法</div>
            <div className="p-2 border rounded text-center">皮褶测量法</div>
            <div className="p-2 border rounded text-center">腰围法</div>
            <div className="p-2 border rounded text-center">生物电阻抗法</div>
          </div>
        </div>

        {/* 基本输入 */}
        <div>
          <h3 className="font-medium mb-2">基本信息</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">性别</label>
              <div className="mt-1 flex gap-2">
                <div className="flex-1 p-2 border rounded text-center">男性</div>
                <div className="flex-1 p-2 border rounded text-center">女性</div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">年龄</label>
              <div className="mt-1 p-2 border rounded">
                {initialData.age} 岁 (范围：0-120)
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">体重</label>
              <div className="mt-1 p-2 border rounded">
                {initialData.weight} kg (范围：20-300)
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">身高</label>
              <div className="mt-1 p-2 border rounded">
                {initialData.height} cm (范围：50-250)
              </div>
            </div>
          </div>
        </div>

        {/* 计算结果 */}
        <div>
          <h3 className="font-medium mb-2">计算结果</h3>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">体脂率</div>
              <div className="text-2xl font-bold">{initialData.result.bodyFatPercentage}%</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">健康范围</div>
              <div>{initialData.result.healthyRange.min}% - {initialData.result.healthyRange.max}%</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">体型分类</div>
              <div>{initialData.result.classification}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">理想体重范围</div>
              <div>{initialData.result.idealWeight.min.toFixed(1)} - {initialData.result.idealWeight.max.toFixed(1)} kg</div>
            </div>
          </div>
        </div>

        {/* 健康建议 */}
        <div>
          <h3 className="font-medium mb-2">健康建议</h3>
          <div className="space-y-2">
            <p className="text-sm">
              体脂率是衡量身体成分的重要指标。对于男性，健康的体脂率范围通常在8-20%之间；
              对于女性，健康范围在15-25%之间。
            </p>
            <p className="text-sm">
              要改善体脂率，建议：
            </p>
            <ul className="text-sm list-disc list-inside">
              <li>保持均衡饮食，控制热量摄入</li>
              <li>进行规律运动，包括有氧运动和力量训练</li>
              <li>保持充足睡眠和适度压力管理</li>
              <li>定期监测身体成分变化</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 