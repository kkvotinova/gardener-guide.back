import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './config/mongo.config';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { PlantsModule } from './plants/plants.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    PlantsModule,
    AuthModule,
    UsersModule,
    NotesModule,
    NewsModule,
  ],
})
export class AppModule {}
