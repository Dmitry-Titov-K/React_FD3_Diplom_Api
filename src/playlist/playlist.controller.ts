import { ObjectId } from 'mongoose';
import { CreatePlaylistDto } from './dto/create-playlist';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

@Controller('/playlist')
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}
  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  addPlaylist(@UploadedFile() picture, @Body() dto: CreatePlaylistDto) {
    return this.playlistService.create(dto, picture);
  }
  @Get()
  getAll() {
    return this.playlistService.getAll();
  }
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.playlistService.delete(id);
  }
  @Get(':id')
  getById(@Param('id') id: ObjectId) {
    return this.playlistService.getById(id);
  }
  @Put()
  addTrack(@Query('id') id: ObjectId, @Query('trackId') trackId: ObjectId) {
    return this.playlistService.addTracks(trackId, id);
  }
}
