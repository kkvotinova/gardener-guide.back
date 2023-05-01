import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypegooseModule } from 'nestjs-typegoose/dist/typegoose.module';
import { NewsModel } from 'src/news/news.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: NewsModel, schemaOptions: { collection: 'news' } },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
