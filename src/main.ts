import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8888;

async function start() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
start();
