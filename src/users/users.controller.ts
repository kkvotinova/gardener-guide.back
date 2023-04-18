import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import User from './user.decorator';
import { UsersModel } from './users.model';
import { UsersService } from './users.service';
import { UpdateUserGardenDto } from './dto/update-user-garden.dto';
import { DeleteUserGardenDto } from './dto/delete-user-garden.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getProfile(@User() user: UsersModel) {
    return this.userService.getProfile(user);
  }

  @Patch('/garden')
  @UseGuards(JwtAuthGuard)
  updateUserGarden(
    @User() user: UsersModel,
    @Body() updateUserGardenDto: UpdateUserGardenDto,
  ) {
    return this.userService.updateUserGarden(user, updateUserGardenDto);
  }

  @Patch('/garden/delete')
  @UseGuards(JwtAuthGuard)
  deleteUserGarden(
    @User() user: UsersModel,
    @Body() deleteUserGardenDto: DeleteUserGardenDto,
  ) {
    return this.userService.deleteUserGarden(user, deleteUserGardenDto);
  }
}
