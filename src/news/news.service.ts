import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { NewsAddCommentDto } from 'src/news/dto/add-news-comment';
import { CreateNewsDto } from 'src/news/dto/create-news';
import { NewsModel } from 'src/news/news.model';
import { UsersModel } from 'src/users/users.model';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(NewsModel) private readonly newsModel: ModelType<NewsModel>,
  ) {}

  async create(user: UsersModel, dto: CreateNewsDto) {
    const body = { ...dto, author: user.username };
    const newNote = new this.newsModel(body);
    return await newNote.save();
  }

  async findOne(id: string) {
    const result = await this.newsModel.findById(id);
    if (result) {
      return result;
    } else {
      throw new NotFoundException('Новость не найдена');
    }
  }

  async findAll(title?: string, limit?: number) {
    if (title) {
      const regex = new RegExp(title, 'ig');
      return await this.newsModel
        .find({ title: regex })
        .sort({ _id: -1 })
        .exec();
    }

    if (limit) {
      return await this.newsModel.find().sort({ _id: -1 }).limit(limit).exec();
    }

    const notes = await this.newsModel.find().sort({ _id: -1 }).exec();
    return notes;
  }

  async addComment(
    id: string,
    user: UsersModel,
    newsAddCommentDto: NewsAddCommentDto,
  ) {
    const news = await this.findOne(id);

    if (!news) {
      throw new NotFoundException('Новость не найдена');
    }

    const newComment = {
      createdAt: new Date(),
      username: user.username,
      description: newsAddCommentDto.description,
    };

    news.comments.unshift(newComment);

    return await news.save();
  }
}
