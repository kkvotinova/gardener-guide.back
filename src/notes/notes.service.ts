import { Injectable, NotFoundException } from '@nestjs/common';
import { NotesModel } from './notes.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateNoteDto } from './dto/create-notes';
import { UsersModel } from 'src/users/users.model';
import { UpdateNoteDto } from './dto/update-notes';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NotesModel) private readonly notesModel: ModelType<NotesModel>,
  ) {}

  async create(user: UsersModel, dto: CreateNoteDto) {
    const body = { ...dto, userId: user._id };
    const newNote = new this.notesModel(body);
    return newNote.save();
  }

  async update(id: string, dto: UpdateNoteDto) {
    const result = this.notesModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (result) {
      return result;
    } else {
      throw new NotFoundException('Заметка не найдена');
    }
  }

  async findAll(user: UsersModel, title: string) {
    if (title) {
      const regex = new RegExp(title, 'ig');
      return this.notesModel.find({ userId: user._id, title: regex }).exec();
    }

    const notes = await this.notesModel.find({ userId: user._id }).exec();
    return notes;
  }

  async delete(id: string) {
    const result = await this.notesModel.findByIdAndDelete(id);
    if (result) {
      return { message: 'ok' };
    } else {
      throw new NotFoundException('Заметка не найдена');
    }
  }
}
