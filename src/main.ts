import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * TODO: Allow only speific ports
   */
  app.enableCors()
  await app.listen(8000);
}
bootstrap();
