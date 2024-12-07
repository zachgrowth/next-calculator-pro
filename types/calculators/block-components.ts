import type {
  NotionBlock,
  HeadingBlock,
  ParagraphBlock,
  ListItemBlock,
  ImageBlock,
  CodeBlock,
  EquationBlock,
  TableBlock,
  QuoteBlock,
  TableRowBlock,
  NotionBlockType
} from './content'

export interface BlockComponentProps<T extends NotionBlock = NotionBlock> {
  block: T
  blockId?: string
}

export interface HeadingBlockProps extends BlockComponentProps<HeadingBlock> {}
export interface ParagraphBlockProps extends BlockComponentProps<ParagraphBlock> {}
export interface ListItemBlockProps extends BlockComponentProps<ListItemBlock> {}
export interface ImageBlockProps extends BlockComponentProps<ImageBlock> {}
export interface CodeBlockProps extends BlockComponentProps<CodeBlock> {}
export interface EquationBlockProps extends BlockComponentProps<EquationBlock> {}
export interface TableBlockProps extends BlockComponentProps<TableBlock> {}
export interface QuoteBlockProps extends BlockComponentProps<QuoteBlock> {}
export interface TableRowBlockProps extends BlockComponentProps<TableRowBlock> {}

// 类型守卫工具函数
export const blockTypeGuards = {
  isHeading: (block: NotionBlock): block is HeadingBlock => {
    return ['heading_1', 'heading_2', 'heading_3'].includes(block.type)
  },
  isParagraph: (block: NotionBlock): block is ParagraphBlock => {
    return block.type === 'paragraph'
  },
  isListItem: (block: NotionBlock): block is ListItemBlock => {
    return ['bulleted_list_item', 'numbered_list_item'].includes(block.type)
  },
  isTable: (block: NotionBlock): block is TableBlock => {
    return block.type === 'table'
  },
  isTableRow: (block: NotionBlock): block is TableRowBlock => {
    return block.type === 'table_row'
  },
  isQuote: (block: NotionBlock): block is QuoteBlock => {
    return block.type === 'quote'
  },
  isImage: (block: NotionBlock): block is ImageBlock => {
    return block.type === 'image'
  },
  isEquation: (block: NotionBlock): block is EquationBlock => {
    return block.type === 'equation'
  }
} 