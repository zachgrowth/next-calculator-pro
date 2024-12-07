import {
  NotionBlockType,
  NotionBlock,
  TocItem,
  PageMetadata,
  CalculatorContent,
  TextContent,
  BlockContent
} from '@/types/calculators/content';

export interface ProcessedContent extends CalculatorContent {
  // 继承自 CalculatorContent，无需额外字段
}

export type {
  NotionBlockType,
  NotionBlock,
  TocItem,
  PageMetadata,
  TextContent,
  BlockContent
}; 