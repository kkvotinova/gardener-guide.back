import { prop } from '@typegoose/typegoose/lib/prop';

export class NewsCommentModel {
  @prop({ required: true })
  username: string;

  @prop({ required: true })
  description: string;

  @prop({ required: true })
  createdAt: Date;
}
