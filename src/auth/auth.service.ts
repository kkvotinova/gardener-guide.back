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
import { AuthLoginDto } from './auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: AuthLoginDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async register(userDto: CreateUserDto) {
    const candidateWithEmail = await this.usersService.getUserByEmail(
      userDto.email,
    );

    if (candidateWithEmail) {
      throw new BadRequestException(
        'Пользователь с такой почтой уже существует',
      );
    }

    const candidateWithNickname = await this.usersService.getUserByNickname(
      userDto.username,
    );

    if (candidateWithNickname) {
      throw new BadRequestException(
        'Пользователь с таким именем уже существует',
      );
    }

    const salt = await genSalt(10);
    const hashPassword = await hash(userDto.password, salt);

    const user = await this.usersService.create({
      email: userDto.email,
      username: userDto.username,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: UsersModel) {
    const payload = {
      _id: user._id,
      email: user.email,
      username: user.username,
    };

    return {
      token: this.jwtService.sign(payload, {
        expiresIn: '24h',
      }),
    };
  }

  private async validateUser(userDto: AuthLoginDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);

    if (!user)
      throw new UnauthorizedException('Пользователь с такой почтой не найден');

    const isValidPassword = await compare(userDto.password, user.password);
    if (!isValidPassword) throw new UnauthorizedException('Неверный пароль');

    return user;
  }
}
