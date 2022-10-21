/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "@bible/app/app.module";

import * as dotenvConf from "dotenv";
dotenvConf.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT;
  await app.listen(port);
  Logger.log(`🚀 Bible serivce is running on: http://localhost:${port}`);
}

bootstrap();
