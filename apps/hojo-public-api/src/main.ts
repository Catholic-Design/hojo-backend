/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "@pub/app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 8000;
  await app.listen(port);
  Logger.log(`🚀 Public api is running on: http://localhost:${port}`);
}

bootstrap();
