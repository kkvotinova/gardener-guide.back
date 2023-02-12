import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { CreatePlantDto, PlantType } from './dto/create-plant.dto';
import { Plant } from './schemas/plant.schema';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Post()
  create(@Body() createPlantDto: CreatePlantDto): Promise<Plant> {
    return this.plantsService.create(createPlantDto);
  }

  @Get(':type')
  findAll(@Param('type') type: PlantType): Promise<Plant[]> {
    return this.plantsService.findAll(type);
  }

  @Get(':type/:id')
  findOne(
    @Param('id') id: string,
    @Param('type') type: PlantType,
  ): Promise<Plant> {
    return this.plantsService.findOne(id, type);
  }
}
