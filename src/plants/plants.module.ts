import { Module, forwardRef } from '@nestjs/common';
import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { PlantsModel } from './plants.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypegooseModule.forFeature([
      { typegooseClass: PlantsModel, schemaOptions: { collection: 'plants' } },
    ]),
  ],
  controllers: [PlantsController],
  providers: [PlantsService],
  exports: [PlantsService],
})
export class PlantsModule {}
