import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8888;

async function start() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: 'GET,POST,PUT,DELETE,OPTIONS,PATCH',
    allowedHeaders: ['Content-Type', 'x-access-token'],
  });

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
start();
