import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UsersModel } from './users.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserGardenDto } from './dto/update-user-garden.dto';
import { PlantsService } from 'src/plants/plants.service';
import { DeleteUserGardenDto } from './dto/delete-user-garden.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersModel) private readonly usersModel: ModelType<UsersModel>,
    private readonly plantsService: PlantsService,
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
    const result = await this.usersModel.findById(user._id);
    return {
      _id: result._id,
      email: result.email,
      username: result.username,
      garden: result.garden,
    };
  }

  async getUserByEmail(email: string) {
    const user = await this.usersModel.findOne({ email });
    return user;
  }

  async getUserByNickname(username: string) {
    const user = await this.usersModel.findOne({ username });
    return user;
  }

  async updateUserGarden(user: UsersModel, dto: UpdateUserGardenDto) {
    const newPlant = await this.plantsService.findOne(
      dto.plantId,
      dto.plantType,
    );

    const userInfo = await this.getProfile(user);

    const newGarden = !userInfo.garden.length
      ? new Array(16).fill({ plant: null })
      : userInfo.garden;

    const newValue = newGarden.map((item, index) => {
      if (index !== dto.plantIndex) return item;
      return { plant: newPlant };
    });

    const filter = { _id: user._id };
    const update = { $set: { garden: newValue } };
    const options = { new: true };

    const updatedDocument = await this.usersModel.findOneAndUpdate(
      filter,
      update,
      options,
    );

    return updatedDocument;
  }

  async deleteUserGarden(user: UsersModel, dto: DeleteUserGardenDto) {
    const userInfo = await this.getProfile(user);

    const newValue = userInfo.garden.map((item, index) => {
      if (index !== dto.plantIndex) return item;
      return { plant: null };
    });

    const filter = { _id: user._id };
    const update = { $set: { garden: newValue } };
    const options = { new: true };

    const updatedDocument = await this.usersModel.findOneAndUpdate(
      filter,
      update,
      options,
    );

    return updatedDocument;
  }
}
