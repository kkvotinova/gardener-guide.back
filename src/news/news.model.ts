import { prop } from '@typegoose/typegoose/lib/prop';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { NewsFullInfoModel } from 'src/news/news.full-info.model';
import { NewsCommentModel } from 'src/news/news.comment.model';

export interface NewsModel extends Base {}

export class NewsModel extends TimeStamps {
  @prop({ required: true })
  title: string;

  @prop({ required: true })
  preview: string;

  @prop({ required: true })
  author: string;

  @prop({ required: true })
  fullInfo: NewsFullInfoModel[];

  @prop()
  comments?: NewsCommentModel[];
}
