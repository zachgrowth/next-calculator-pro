import React from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface GenderSelectorProps {
  gender: string
  onGenderChange: (gender: string) => void
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({
  gender,
  onGenderChange,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="gender-group">性别</Label>
      <div id="gender-group" className="flex gap-4" role="group" aria-label="性别选择">
        <Button
          type="button"
          variant={gender === 'male' ? 'default' : 'outline'}
          onClick={() => onGenderChange('male')}
          className="flex-1"
          aria-label="男性"
          aria-pressed={gender === 'male'}
        >
          男性
        </Button>
        <Button
          type="button"
          variant={gender === 'female' ? 'default' : 'outline'}
          onClick={() => onGenderChange('female')}
          className="flex-1"
          aria-label="女性"
          aria-pressed={gender === 'female'}
        >
          女性
        </Button>
      </div>
    </div>
  )
} 