export class SyncLogger {
  private static instance: SyncLogger;
  private debugMode: boolean;
  private debugLevel: string;

  private constructor() {
    this.debugMode = process.env.DEBUG_MODE === 'true';
    this.debugLevel = process.env.DEBUG_LEVEL || 'info';
  }

  public static getInstance(): SyncLogger {
    if (!SyncLogger.instance) {
      SyncLogger.instance = new SyncLogger();
    }
    return SyncLogger.instance;
  }

  public debug(message: string, ...args: any[]): void {
    if (this.debugMode && this.debugLevel === 'trace') {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  public info(message: string, ...args: any[]): void {
    if (this.debugMode) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  public warn(message: string, ...args: any[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  }

  public error(message: string, ...args: any[]): void {
    console.error(`[ERROR] ${message}`, ...args);
  }

  startTask(taskName: string): void {
    console.log(`\n[开始] ${taskName}`);
  }

  completeTask(taskName: string): void {
    console.log(`[完成] ${taskName}\n`);
  }

  failTask(taskName: string, error: any): void {
    console.error(`[失败] ${taskName}`);
    if (error) {
      console.error(error);
    }
  }
} 