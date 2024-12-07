'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { calculateBodyFat } from '@/utils/bodyFatCalculator'

const formSchema = z.object({
  gender: z.enum(['male', 'female']),
  age: z.string()
    .min(1, '年龄不能为空')
    .refine(val => {
      const num = parseFloat(val)
      return !isNaN(num) && num >= 0 && num <= 120
    }, '年龄必须在 0-120 岁之间'),
  weight: z.string()
    .min(1, '体重不能为空')
    .refine(val => {
      const num = parseFloat(val)
      return !isNaN(num) && num >= 20 && num <= 300
    }, '体重必须在 20-300 kg 之间'),
  height: z.string()
    .min(1, '身高不能为空')
    .refine(val => {
      const num = parseFloat(val)
      return !isNaN(num) && num >= 50 && num <= 250
    }, '身高必须在 50-250 cm 之间'),
})

type FormValues = z.infer<typeof formSchema>

const BodyFatCalculator: React.FC = () => {
  const [result, setResult] = React.useState<ReturnType<typeof calculateBodyFat> | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: 'male',
      age: '',
      weight: '',
      height: '',
    },
  })

  const onSubmit = (values: FormValues) => {
    const result = calculateBodyFat({
      gender: values.gender,
      age: parseFloat(values.age),
      weight: parseFloat(values.weight),
      height: parseFloat(values.height),
    })
    setResult(result)
  }

  return (
    <Card className="p-6">
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          aria-label="体脂率计算器表单"
        >
          <div>
            <h1 className="text-lg font-semibold">体脂率计算器</h1>
            <p className="text-sm text-muted-foreground">
              通过BMI法计算体脂率，提供健康范围参考
            </p>
          </div>

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>性别</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4"
                    aria-label="性别选择"
                  >
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative">
                          <RadioGroupItem
                            value="male"
                            id="gender-male"
                            className="sr-only"
                          />
                          <label
                            htmlFor="gender-male"
                            className={`block text-center p-2 rounded-md cursor-pointer ${
                              field.value === 'male'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-background border'
                            }`}
                          >
                            男性
                          </label>
                        </div>
                      </FormControl>
                    </FormItem>
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative">
                          <RadioGroupItem
                            value="female"
                            id="gender-female"
                            className="sr-only"
                          />
                          <label
                            htmlFor="gender-female"
                            className={`block text-center p-2 rounded-md cursor-pointer ${
                              field.value === 'female'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-background border'
                            }`}
                          >
                            女性
                          </label>
                        </div>
                      </FormControl>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>体重 (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="decimal"
                      placeholder="请输入体重"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>身高 (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="decimal"
                      placeholder="请输入身高"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>年龄</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="decimal"
                      placeholder="请输入年龄"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid}
          >
            计算
          </Button>

          {result && (
            <section 
              aria-label="计算结果"
              className="space-y-4"
            >
              <div>
                <div>
                  <div className="text-sm text-muted-foreground">体脂率</div>
                  <h2 className="text-2xl font-bold">
                    {result.bodyFatPercentage}%
                  </h2>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">健康范围</div>
                <div>
                  {result.healthyRange.min}% - {result.healthyRange.max}%
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">体型分类</div>
                <div>{result.classification}</div>
              </div>
            </section>
          )}
        </form>
      </Form>
    </Card>
  )
}

export default BodyFatCalculator 