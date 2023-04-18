import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { CreatePlantDto, PlantType } from './dto/create-plant.dto';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Post()
  create(@Body() createPlantDto: CreatePlantDto) {
    return this.plantsService.create(createPlantDto);
  }

  @Get(':type')
  findAll(@Param('type') type: PlantType, @Query('name') name: string) {
    return this.plantsService.findAll(type, name);
  }

  @Get(':type/:id')
  findOne(@Param('id') id: string, @Param('type') type: PlantType) {
    return this.plantsService.findOne(id, type);
  }
}
