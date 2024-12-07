// Notion 内容块类型
export type NotionBlockType = 
  | 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'code'
  | 'equation'
  | 'image'
  | 'table'
  | 'table_row'
  | 'quote'
  | 'divider';

// 目录项
export interface TocItem {
  text: string;
  level: 1 | 2 | 3;
  id: string;
  children?: TocItem[];
}

// Notion 用户
export interface NotionUser {
  id: string;
  name: string;
  type: string;
  avatarUrl?: string | null;
}

// Notion 唯一ID
export interface NotionUniqueId {
  prefix: string | null;
  number: number;
}

// 页面元数据
export interface PageMetadata {
  title: string;
  description: string;
  calculatorId: string;
  status: 'published' | 'draft';
  languages: string[];
  lastUpdated: string;
  notionId: NotionUniqueId;
  createDate: string;
  lastEditTime: string;
  author: NotionUser | null;
  lastEditor: NotionUser | null;
  url: string;
}



// 文本内容
export interface TextContent {
  text: string;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
    color?: string;
  };
  href?: string;
}

// 图片内容
export interface ImageContent {
  type: 'image';
  url: string;
  caption?: TextContent[];
}

// 代码内容
export interface CodeContent {
  type: 'code';
  code: string;
  language: string;
  caption?: TextContent[];
}

// 公式内容
export interface EquationContent {
  type: 'equation';
  expression: string;
  caption?: TextContent[];
}

// 表格内容
export interface TableContent {
  type: 'table';
  rows: TextContent[][][];
  hasColumnHeader: boolean;
  hasRowHeader: boolean;
}

// 引用内容
export interface QuoteContent {
  type: 'quote';
  content: TextContent[];
  caption?: TextContent[];
}

// 表格行内容
export interface TableRowContent {
  type: 'table_row';
  cells: TextContent[][];
}

// 块内容类型
export type BlockContent =
  | TextContent[]
  | ImageContent
  | CodeContent
  | EquationContent
  | TableContent
  | QuoteContent
  | TableRowContent;

// 基础块接口
export interface NotionBlock {
  type: NotionBlockType;
  content: BlockContent;
  children?: NotionBlock[];
}

// 计算器内容接口
export interface CalculatorContent {
  metadata: PageMetadata;
  blocks: NotionBlock[];
  toc: TocItem[];
}

// 特定块类型
export interface HeadingBlock extends NotionBlock {
  type: 'heading_1' | 'heading_2' | 'heading_3';
  content: TextContent[];
}

export interface ParagraphBlock extends NotionBlock {
  type: 'paragraph';
  content: TextContent[];
}

export interface ListItemBlock extends NotionBlock {
  type: 'bulleted_list_item' | 'numbered_list_item';
  content: TextContent[];
}

export interface ImageBlock extends NotionBlock {
  type: 'image';
  content: ImageContent;
}

export interface CodeBlock extends NotionBlock {
  type: 'code';
  content: CodeContent;
}

export interface EquationBlock extends NotionBlock {
  type: 'equation';
  content: EquationContent;
}

export interface TableBlock extends NotionBlock {
  type: 'table';
  content: TableContent;
}

export interface QuoteBlock extends NotionBlock {
  type: 'quote';
  content: QuoteContent;
}

export interface DividerBlock extends NotionBlock {
  type: 'divider';
  content: never;
}

// 表格行块
export interface TableRowBlock extends NotionBlock {
  type: 'table_row';
  content: TableRowContent;
} 