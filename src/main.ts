import './instrumentation';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TraceLogger } from './trace.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(new TraceLogger('Bootstrap'));
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
