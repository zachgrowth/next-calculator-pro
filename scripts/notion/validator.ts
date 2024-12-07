import {
  TextContent,
  NotionBlock,
  PageMetadata,
  CodeContent,
  EquationContent,
  ImageContent,
  TableContent,
  QuoteContent,
  CalculatorContent
} from '@/types/calculators/content';
import { NotionSyncError, NotionSyncErrorCode } from './errors';
import { SyncLogger } from './logger';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export class ContentValidator {
  private logger: SyncLogger;

  constructor() {
    this.logger = SyncLogger.getInstance();
  }

  private validateMetadata(metadata: PageMetadata): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    if (!metadata.title) {
      result.errors.push('标题不能为空');
      result.isValid = false;
    }

    if (!metadata.calculatorId) {
      result.errors.push('计算器ID不能为空');
      result.isValid = false;
    }

    if (!metadata.description) {
      result.warnings.push('建议添加描述信息');
    }

    if (!metadata.status) {
      result.warnings.push('建议设置状态');
    }

    if (!metadata.languages || metadata.languages.length === 0) {
      result.warnings.push('建议设置语言');
    }

    return result;
  }

  private validateBlockContent(block: NotionBlock): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    if (!block.type) {
      result.errors.push('块类型不能为空');
      result.isValid = false;
      return result;
    }

    if (!block.content) {
      result.errors.push(`${block.type} 块的内容不能为空`);
      result.isValid = false;
      return result;
    }

    // 根据块类型进行特定验证
    switch (block.type) {
      case 'heading_1':
      case 'heading_2':
      case 'heading_3':
      case 'paragraph':
      case 'bulleted_list_item':
      case 'numbered_list_item':
        if (!Array.isArray(block.content)) {
          result.errors.push(`${block.type} 块的内容必须是文本数组`);
          result.isValid = false;
        }
        break;

      case 'image':
        const imageContent = block.content as ImageContent;
        if (!imageContent.url) {
          result.errors.push('图片块必须包含 URL');
          result.isValid = false;
        }
        break;

      case 'code':
        const codeContent = block.content as CodeContent;
        if (!codeContent.code) {
          result.errors.push('代码块必须包含代码内容');
          result.isValid = false;
        }
        break;

      case 'equation':
        const equationContent = block.content as EquationContent;
        if (!equationContent.expression) {
          result.errors.push('公式块必须包含表达式');
          result.isValid = false;
        }
        break;

      case 'table':
        const tableContent = block.content as TableContent;
        if (!tableContent.rows || !Array.isArray(tableContent.rows)) {
          result.errors.push('表格块必须包含行数据');
          result.isValid = false;
        }
        break;

      case 'quote':
        const quoteContent = block.content as QuoteContent;
        if (!quoteContent.content || !Array.isArray(quoteContent.content)) {
          result.errors.push('引用块必须包含有效的富文本内容');
          result.isValid = false;
        }
        break;

      default:
        result.warnings.push(`未知的块类型: ${block.type}`);
    }

    return result;
  }

  public validate(content: CalculatorContent): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    // 验证元数据
    const metadataResult = this.validateMetadata(content.metadata);
    if (!metadataResult.isValid) {
      result.isValid = false;
      result.errors.push(...metadataResult.errors);
    }
    result.warnings.push(...metadataResult.warnings);

    // 验证内容块
    if (!content.blocks || !Array.isArray(content.blocks)) {
      result.errors.push('内容块必须是数组');
      result.isValid = false;
      return result;
    }

    content.blocks.forEach((block, index) => {
      const blockResult = this.validateBlockContent(block);
      if (!blockResult.isValid) {
        result.isValid = false;
        result.errors.push(`块 ${index + 1}: ${blockResult.errors.join(', ')}`);
      }
      result.warnings.push(...blockResult.warnings.map(w => `块 ${index + 1}: ${w}`));
    });

    // 记录验证结果
    this.logger.debug('内容验证结果:', {
      isValid: result.isValid,
      errors: result.errors,
      warnings: result.warnings
    });

    return result;
  }
} 