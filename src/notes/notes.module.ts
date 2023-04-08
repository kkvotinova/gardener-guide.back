import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { NotesModel } from './notes.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: NotesModel, schemaOptions: { collection: 'notes' } },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
