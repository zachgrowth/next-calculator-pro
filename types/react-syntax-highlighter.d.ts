declare module 'react-syntax-highlighter' {
  import { FC, CSSProperties } from 'react'

  interface SyntaxHighlighterProps {
    language?: string
    style?: any
    customStyle?: CSSProperties
    codeTagProps?: HTMLElement
    useInlineStyles?: boolean
    showLineNumbers?: boolean
    startingLineNumber?: number
    lineNumberStyle?: CSSProperties
    wrapLines?: boolean
    lineProps?: any
    children: string
  }

  export const Prism: FC<SyntaxHighlighterProps>
  export const Light: FC<SyntaxHighlighterProps>
}

declare module 'react-syntax-highlighter/dist/cjs/styles/prism' {
  const styles: {
    oneDark: any
    oneLight: any
    solarizedlight: any
    tomorrow: any
    [key: string]: any
  }
  export const oneDark: any
  export const oneLight: any
  export const solarizedlight: any
  export const tomorrow: any
} 