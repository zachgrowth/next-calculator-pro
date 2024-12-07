// 此文件由 content-processor.ts 自动生成
// 最后更新时间: 12/6/2024, 5:29:30 AM

export type BlockType = 'heading_2' | 'paragraph' | 'heading_3' | 'equation' | 'bulleted_list_item' | 'table' | 'table_row';

export interface Block {
  id: string;
  type: BlockType;
  content: any;
  children?: Block[];
}

export interface Content {
  blocks: Block[];
  metadata: Record<string, any>;
  toc?: TocItem[];
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
  children?: TocItem[];
}