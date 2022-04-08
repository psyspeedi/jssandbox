// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APP_PORT);

  try {
    await mongoose.connect(
      `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
      {
        dbName: `${process.env.MONGO_DB_NAME}`,
        user: `${process.env.MONGO_USERNAME}`,
        pass: `${process.env.MONGO_PASSWORD}`,
      },
    );

    console.log(
      '*************************DB CONNECTION SUCCESS*************************\n\n\n',
    );
  } catch (error) {
    console.log(
      '*************************DB CONNECTION ERROR*************************\n\n\n',
      error,
    );
  }
}
bootstrap();
