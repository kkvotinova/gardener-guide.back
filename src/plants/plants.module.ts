import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Plant, PlantSchema } from './schemas/plant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Plant.name,
        schema: PlantSchema,
      },
    ]),
  ],
  controllers: [PlantsController],
  providers: [PlantsService],
})
export class PlantsModule {}
