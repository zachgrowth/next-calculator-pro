/**
 * Notion Content Converter
 * 用于将 Notion 页面内容转换为应用程序可用的格式
 */

import { Client } from '@notionhq/client';
import { NotionBlock, PageMetadata, CalculatorContent, TextContent } from '@/types/calculators/content';
import { NotionSyncError, NotionSyncErrorCode } from './errors';
import { SyncLogger } from './logger';
import { 
  GetPageResponse, 
  PageObjectResponse, 
  PartialUserObjectResponse,
  UserObjectResponse,
  RichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints';

export class NotionContentConverter {
  private logger: SyncLogger;

  constructor(private notion: Client) {
    this.logger = SyncLogger.getInstance();
  }

  private convertUserToNotionUser(user: UserObjectResponse | null): any {
    if (!user) return null;
    return {
      id: user.id,
      name: user.name || '',
      type: user.type || 'person',
      avatarUrl: user.avatar_url || null
    };
  }

  private async getPageMetadata(pageId: string): Promise<PageMetadata> {
    try {
      const page = await this.notion.pages.retrieve({ 
        page_id: pageId 
      }) as PageObjectResponse;

      const properties = page.properties;

      // 记录页面的元数据信息
      this.logger.info('页面元数据:', {
        id: page.id,
        created_time: page.created_time,
        last_edited_time: page.last_edited_time,
        created_by: page.created_by,
        last_edited_by: page.last_edited_by,
        archived: page.archived,
        url: page.url
      });

      // 记录属性信息
      Object.entries(properties).forEach(([key, value]) => {
        this.logger.info(`页面属性 [${key}]:`, {
          type: value.type,
          value: this.extractPropertyValue(value),
          raw: value
        });
      });

      return {
        title: this.extractPropertyValue(properties.Title)?.[0]?.plain_text || '',
        calculatorId: this.extractPropertyValue(properties.CalculatorID)?.[0]?.plain_text || '',
        description: this.extractPropertyValue(properties.Description)?.[0]?.plain_text || '',
        status: this.extractPropertyValue(properties.Status)?.name?.toLowerCase() || 'draft',
        languages: this.extractPropertyValue(properties.Language)?.map((item: any) => item.name) || [],
        lastUpdated: page.last_edited_time || '',
        notionId: this.extractPropertyValue(properties.ID) || { prefix: null, number: 0 },
        createDate: page.created_time || '',
        lastEditTime: page.last_edited_time || '',
        author: this.convertUserToNotionUser(page.created_by as UserObjectResponse),
        lastEditor: this.convertUserToNotionUser(page.last_edited_by as UserObjectResponse),
        url: page.url || ''
      };
    } catch (error) {
      throw new NotionSyncError(
        NotionSyncErrorCode.API_REQUEST_FAILED,
        `获取页面元数据失败: ${error}`,
        error
      );
    }
  }

  private extractPropertyValue(property: any): any {
    if (!property) return null;

    switch (property.type) {
      case 'title':
      case 'rich_text':
        return property[property.type];
      case 'select':
        return property.select;
      case 'multi_select':
        return property.multi_select;
      case 'people':
        return property.people;
      case 'unique_id':
        return property.unique_id;
      case 'created_time':
        return property.created_time;
      case 'last_edited_time':
        return property.last_edited_time;
      default:
        return null;
    }
  }

  private async getBlockChildren(blockId: string): Promise<NotionBlock[]> {
    try {
      const blocks: NotionBlock[] = [];
      let cursor: string | undefined;

      do {
        const response = await this.notion.blocks.children.list({
          block_id: blockId,
          start_cursor: cursor,
        });

        for (const block of response.results as any[]) {
          const convertedBlock = await this.convertBlock(block);
          if (convertedBlock) {
            blocks.push(convertedBlock);
          }
        }

        cursor = response.next_cursor || undefined;
      } while (cursor);

      return blocks;
    } catch (error) {
      throw new NotionSyncError(
        NotionSyncErrorCode.API_REQUEST_FAILED,
        `获取块内容失败: ${error}`,
        error
      );
    }
  }

  private convertRichText(richText: RichTextItemResponse): TextContent {
    return {
      text: richText.plain_text,
      annotations: {
        bold: richText.annotations.bold,
        italic: richText.annotations.italic,
        strikethrough: richText.annotations.strikethrough,
        underline: richText.annotations.underline,
        code: richText.annotations.code,
        color: richText.annotations.color === 'default' ? undefined : richText.annotations.color
      },
      href: richText.href || undefined
    };
  }

  private async convertBlock(block: any): Promise<NotionBlock | null> {
    try {
      const baseBlock: NotionBlock = {
        type: block.type,
        content: await this.convertBlockContent(block),
      };

      if (block.has_children) {
        baseBlock.children = await this.getBlockChildren(block.id);
      }

      return baseBlock;
    } catch (error) {
      this.logger.error(`转换块失败:`, error);
      return null;
    }
  }

  private async convertBlockContent(block: any): Promise<any> {
    const type = block.type
    const content = block[type]

    if (!content) {
      throw new Error(`块 ${block.id} 没有内容`)
    }

    switch (type) {
      case 'paragraph':
      case 'heading_1':
      case 'heading_2':
      case 'heading_3':
      case 'bulleted_list_item':
      case 'numbered_list_item':
        return content.rich_text.map((item: RichTextItemResponse) => this.convertRichText(item))

      case 'image':
        return {
          type: 'image',
          url: content.type === 'external' ? content.external.url : content.file.url,
          caption: content.caption?.map((item: RichTextItemResponse) => this.convertRichText(item))
        }

      case 'code':
        return {
          type: 'code',
          code: content.rich_text.map((item: RichTextItemResponse) => item.plain_text).join(''),
          language: content.language,
          caption: content.caption?.map((item: RichTextItemResponse) => this.convertRichText(item))
        }

      case 'equation':
        return {
          type: 'equation',
          expression: content.expression,
          caption: content.caption?.map((item: RichTextItemResponse) => this.convertRichText(item))
        }

      case 'table':
        return {
          type: 'table',
          rows: await this.convertTableRows(block.id),
          hasColumnHeader: content.has_column_header,
          hasRowHeader: content.has_row_header
        }

      case 'quote':
        return {
          type: 'quote',
          content: content.rich_text.map((item: RichTextItemResponse) => this.convertRichText(item)),
          caption: content.caption?.map((item: RichTextItemResponse) => this.convertRichText(item))
        }

      case 'divider':
        return null

      case 'table_row':
        // 表格行在 convertTableRows 中处理，这里忽略
        return null

      default:
        this.logger.warn(`未处理的块类型: ${type}`)
        return null
    }
  }

  private async convertTableRows(tableId: string): Promise<TextContent[][][]> {
    const rows: TextContent[][][] = [];
    let cursor: string | undefined;

    do {
      const response = await this.notion.blocks.children.list({
        block_id: tableId,
        start_cursor: cursor,
      });

      for (const row of response.results as any[]) {
        if (row.type === 'table_row') {
          const cells = row.table_row.cells.map((cell: RichTextItemResponse[]) => 
            cell.map(item => this.convertRichText(item))
          );
          rows.push(cells);
        }
      }

      cursor = response.next_cursor || undefined;
    } while (cursor);

    return rows;
  }

  public async convertPage(pageId: string): Promise<CalculatorContent> {
    try {
      const metadata = await this.getPageMetadata(pageId);
      const blocks = await this.getBlockChildren(pageId);

      return {
        metadata,
        blocks,
        toc: [] // 目录会在后续处理中生成
      };
    } catch (error) {
      throw new NotionSyncError(
        NotionSyncErrorCode.API_REQUEST_FAILED,
        `转换页面失败: ${error}`,
        error
      );
    }
  }
} 