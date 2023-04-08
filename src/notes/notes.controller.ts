import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-notes';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import User from 'src/users/user.decorator';
import { UsersModel } from 'src/users/users.model';
import { UpdateNoteDto } from './dto/update-notes';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@User() user: UsersModel, @Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(user, createNoteDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@User() user: UsersModel, @Query('title') title: string) {
    return this.notesService.findAll(user, title);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.notesService.delete(id);
  }
}
