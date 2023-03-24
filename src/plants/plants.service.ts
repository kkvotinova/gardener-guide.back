import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlantDto, PlantType } from './dto/create-plant.dto';
import { Plant, PlantDocument } from './schemas/plant.schema';

@Injectable()
export class PlantsService {
  constructor(
    @InjectModel(Plant.name) private plantModel: Model<PlantDocument>,
  ) {}

  async create(createPlantDto: CreatePlantDto): Promise<Plant> {
    if (!PlantType[createPlantDto.type]) {
      throw new HttpException(
        { message: 'Указан неверный тип' },
        HttpStatus.CONFLICT,
      );
    }

    const newPlant = new this.plantModel(createPlantDto);
    return newPlant.save();
  }

  async findAll(type: string, name: string): Promise<Plant[]> {
    if (!PlantType[type]) {
      throw new HttpException(
        { message: 'Указан неверный тип' },
        HttpStatus.NOT_FOUND,
      );
    }

    if (name) {
      const regex = new RegExp(name, 'ig');
      return this.plantModel.find({ type: type, name: regex }).exec();
    }

    return this.plantModel.find({ type: type }).exec();
  }

  async findOne(id: string, type: string): Promise<Plant> {
    if (!PlantType[type]) {
      throw new HttpException(
        { message: 'Указан неверный тип' },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.plantModel.findById(id);
  }
}
