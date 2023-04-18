import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersModel } from './users.model';
import { AuthModule } from 'src/auth/auth.module';
import { PlantsModule } from 'src/plants/plants.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => PlantsModule),
    TypegooseModule.forFeature([
      { typegooseClass: UsersModel, schemaOptions: { collection: 'users' } },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
