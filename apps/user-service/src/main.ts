/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "@user/app/app.module";

import * as dotenvConf from "dotenv";
dotenvConf.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
