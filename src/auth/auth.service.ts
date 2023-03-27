import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersModel } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async register(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new BadRequestException(
        'Пользователь с такой почтой уже существует',
      );
    }

    const salt = await genSalt(10);
    const hashPassword = await hash(userDto.password, salt);

    const user = await this.usersService.create({
      email: userDto.email,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: UsersModel) {
    const payload = {
      _id: user._id,
      email: user.email,
    };

    return {
      token: this.jwtService.sign(payload, {
        expiresIn: '1h',
      }),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);

    if (!user)
      throw new UnauthorizedException('Пользователь с такой почтой не найден');

    const isValidPassword = await compare(userDto.password, user.password);
    if (!isValidPassword) throw new UnauthorizedException('Неверный пароль');

    return user;
  }
}
