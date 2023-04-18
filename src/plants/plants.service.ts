import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { PlantsModel } from './plants.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreatePlantDto, PlantType } from './dto/create-plant.dto';

@Injectable()
export class PlantsService {
  constructor(
    @InjectModel(PlantsModel)
    private readonly plantsModel: ModelType<PlantsModel>,
  ) {}

  async create(createPlantDto: CreatePlantDto) {
    if (!PlantType[createPlantDto.type]) {
      throw new HttpException(
        { message: 'Указан неверный тип' },
        HttpStatus.CONFLICT,
      );
    }

    const newPlant = new this.plantsModel(createPlantDto);
    return newPlant.save();
  }

  async findAll(type: string, name: string) {
    if (!PlantType[type]) {
      throw new HttpException(
        { message: 'Указан неверный тип' },
        HttpStatus.NOT_FOUND,
      );
    }

    if (name) {
      const regex = new RegExp(name, 'ig');
      return this.plantsModel.find({ type: type, name: regex }).exec();
    }

    return this.plantsModel.find({ type: type }).exec();
  }

  async findOne(id: string, type: string) {
    if (!PlantType[type]) {
      throw new HttpException(
        { message: 'Указан неверный тип' },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.plantsModel.findById(id);
  }
}
