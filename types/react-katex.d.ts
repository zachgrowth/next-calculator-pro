declare module 'react-katex' {
  import { FC } from 'react'

  interface KaTeXProps {
    math: string
    block?: boolean
    errorColor?: string
    renderError?: (error: Error | TypeError) => React.ReactNode
    settings?: {
      strict?: boolean | string
      [key: string]: any
    }
  }

  export const InlineMath: FC<KaTeXProps>
  export const BlockMath: FC<KaTeXProps>
} 