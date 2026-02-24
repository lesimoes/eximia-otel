import { trace } from '@opentelemetry/api';
import { ConsoleLogger } from '@nestjs/common';

function getTraceId(): string {
  const span = trace.getActiveSpan();
  return span?.spanContext().traceId ?? '';
}

export class TraceLogger extends ConsoleLogger {
  formatLine(level: string, message: string, context?: string): string {
    const traceId = getTraceId();
    const ctx = context ?? this.context ?? '';
    const tracePart = traceId ? ` [trace_id=${traceId}]` : '';
    return `${level.toUpperCase()}${tracePart} ${ctx} - ${message}`;
  }

  log(message: string, context?: string): void {
    process.stdout.write(this.formatLine('info', message, context) + '\n');
  }

  error(message: string, stack?: string, context?: string): void {
    process.stdout.write(this.formatLine('error', message, context) + '\n');
    if (stack) process.stdout.write(stack + '\n');
  }

  warn(message: string, context?: string): void {
    process.stdout.write(this.formatLine('warn', message, context) + '\n');
  }

  debug(message: string, context?: string): void {
    process.stdout.write(this.formatLine('debug', message, context) + '\n');
  }

  verbose(message: string, context?: string): void {
    process.stdout.write(this.formatLine('verbose', message, context) + '\n');
  }
}
