import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UsersModel } from './users.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersModel) private readonly usersModel: ModelType<UsersModel>,
  ) {}

  async create(dto: CreateUserDto) {
    const newUser = new this.usersModel(dto);
    return newUser.save();
  }

  async findAll() {
    const users = await this.usersModel.find().exec();
    return users;
  }

  async getProfile(user: UsersModel) {
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersModel.findOne({ email });
    return user;
  }
}
