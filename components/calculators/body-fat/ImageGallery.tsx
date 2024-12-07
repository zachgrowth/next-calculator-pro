'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'

interface ReferenceImage {
  id: string
  title: string
  description: string
  imageUrl: string
}

const referenceImages: ReferenceImage[] = [
  {
    id: '1',
    title: '男性体脂率参考图',
    description: '不同体脂率下的男性体型对比，从5%到30%+的体脂率变化。',
    imageUrl: '/images/body-fat/male-reference.jpg'
  },
  {
    id: '2',
    title: '女性体脂率参考图',
    description: '不同体脂率下的女性体型对比，从15%到40%+的体脂率变化。',
    imageUrl: '/images/body-fat/female-reference.jpg'
  },
  {
    id: '3',
    title: '腰围测量位置',
    description: '正确的腰围测量位置应在肚脐水平处，保持呼吸自然。',
    imageUrl: '/images/body-fat/waist-measurement.jpg'
  },
  {
    id: '4',
    title: '颈围测量位置',
    description: '颈围测量位置在喉结下方，保持头部自然直立。',
    imageUrl: '/images/body-fat/neck-measurement.jpg'
  },
  {
    id: '5',
    title: '臀围测量位置',
    description: '臀围测量位置在臀部最宽处，通常在髋骨下方。',
    imageUrl: '/images/body-fat/hip-measurement.jpg'
  },
  {
    id: '6',
    title: '测量注意事项',
    description: '测量时保持站姿自然，皮尺水平，不要太紧或太松。',
    imageUrl: '/images/body-fat/measurement-tips.jpg'
  }
]

export function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<ReferenceImage | null>(null)

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">体脂率测量参考图</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {referenceImages.map((image) => (
          <Card 
            key={image.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative aspect-video">
              <Image
                src={image.imageUrl}
                alt={image.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{image.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {image.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-white p-4 rounded-lg max-w-3xl w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-video mb-4">
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
            <h3 className="text-xl font-bold">{selectedImage.title}</h3>
            <p className="text-muted-foreground">{selectedImage.description}</p>
          </div>
        </div>
      )}
    </div>
  )
} 