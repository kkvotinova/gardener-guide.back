import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NewsAddCommentDto } from 'src/news/dto/add-news-comment';
import { CreateNewsDto } from 'src/news/dto/create-news';
import { NewsService } from 'src/news/news.service';
import User from 'src/users/user.decorator';
import { UsersModel } from 'src/users/users.model';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@User() user: UsersModel, @Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(user, createNewsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Get()
  findAll(@Query('title') title: string, @Query('limit') limit: number) {
    return this.newsService.findAll(title, limit);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  addComment(
    @Param('id') id: string,
    @User() user: UsersModel,
    @Body() newsAddCommentDto: NewsAddCommentDto,
  ) {
    return this.newsService.addComment(id, user, newsAddCommentDto);
  }
}
