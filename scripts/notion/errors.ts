import { SyncLogger } from './logger';

/**
 * Notion同步系统错误类型
 */
export enum NotionSyncErrorCode {
  API_UNAUTHORIZED = 'API_UNAUTHORIZED',
  API_RATE_LIMIT = 'API_RATE_LIMIT',
  API_DATABASE_NOT_FOUND = 'API_DATABASE_NOT_FOUND',
  API_REQUEST_FAILED = 'API_REQUEST_FAILED',
  CONTENT_VALIDATION_FAILED = 'CONTENT_VALIDATION_FAILED',
  CONTENT_PROCESSING_FAILED = 'CONTENT_PROCESSING_FAILED',
  CONTENT_INVALID = 'CONTENT_INVALID',
  FILE_PERMISSION_ERROR = 'FILE_PERMISSION_ERROR',
  FILE_READ_ERROR = 'FILE_READ_ERROR',
  FILE_WRITE_ERROR = 'FILE_WRITE_ERROR',
  FILE_OPERATION_FAILED = 'FILE_OPERATION_FAILED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

/**
 * Notion同步系统自定义错误类
 */
export class NotionSyncError extends Error {
  constructor(
    public code: NotionSyncErrorCode,
    message: string,
    public context?: any
  ) {
    super(message);
    this.name = 'NotionSyncError';
  }
}

/**
 * 错误处理工具类
 */
export class ErrorHandler {
  private static logger: SyncLogger = SyncLogger.getInstance();

  /**
   * 处理 Notion API 错误
   */
  static handleNotionApiError(error: any): NotionSyncError {
    if (error.code === 'unauthorized') {
      return new NotionSyncError(
        NotionSyncErrorCode.API_UNAUTHORIZED,
        'Notion API 认证失败，请检查 token 是否正确',
        error
      );
    }

    if (error.code === 'rate_limited') {
      return new NotionSyncError(
        NotionSyncErrorCode.API_RATE_LIMIT,
        'Notion API 请求频率超限，请稍后重试',
        error
      );
    }

    if (error.code === 'object_not_found') {
      return new NotionSyncError(
        NotionSyncErrorCode.API_DATABASE_NOT_FOUND,
        '找不到指定的数据库或页面',
        error
      );
    }

    return new NotionSyncError(
      NotionSyncErrorCode.API_REQUEST_FAILED,
      `Notion API 请求失败: ${error.message}`,
      error
    );
  }

  /**
   * 处理文件系统错误
   */
  static handleFileSystemError(error: any): NotionSyncError {
    if (error.code === 'EACCES') {
      return new NotionSyncError(
        NotionSyncErrorCode.FILE_PERMISSION_ERROR,
        '文件访问权限不足',
        error
      );
    }

    if (error.code === 'ENOENT') {
      return new NotionSyncError(
        NotionSyncErrorCode.FILE_READ_ERROR,
        '文件或目录不存在',
        error
      );
    }

    return new NotionSyncError(
      NotionSyncErrorCode.FILE_WRITE_ERROR,
      `文件操作失败: ${error.message}`,
      error
    );
  }

  /**
   * 统一错误处理方法
   */
  static handle(error: any): void {
    let syncError: NotionSyncError;

    if (error instanceof NotionSyncError) {
      syncError = error;
    } else if (error.code && error.status) {
      // Notion API 错误
      syncError = this.handleNotionApiError(error);
    } else if (error.code && (error.code.startsWith('E'))) {
      // 文件系统错误
      syncError = this.handleFileSystemError(error);
    } else {
      // 未知错误
      syncError = new NotionSyncError(
        NotionSyncErrorCode.UNKNOWN_ERROR,
        `未知错误: ${error.message || error}`,
        error
      );
    }

    // 记录错误
    this.logger.error(`[${syncError.code}] ${syncError.message}`, {
      context: syncError.context,
      stack: syncError.stack
    });
  }
} 