import { FileService, FileType } from './../file/file.service';
import { CreatePlaylistDto } from './dto/create-playlist';

import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Playlist, PlaylistDocument } from './schemas/playlist.schema';
import { Track, TrackDocument } from 'src/track/schemas/track.schema';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private PlaylistkModel: Model<PlaylistDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    private fileService: FileService,
  ) {}
  async create(dto: CreatePlaylistDto, picture): Promise<Playlist> {
    try {
      const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
      const playlist = await this.PlaylistkModel.create({
        ...dto,
        listens: 0,
        picture: picturePath,
      });
      return playlist;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async getAll(): Promise<any> {
    const playlists = await this.PlaylistkModel.find().populate('tracks');
    const totlaPlaylists = await this.PlaylistkModel.find().countDocuments();
    return { playlists, totlaPlaylists };
  }
  async delete(id: ObjectId): Promise<Playlist> {
    const playlist = await this.PlaylistkModel.findByIdAndDelete(id);
    return playlist;
  }
  async getById(id: ObjectId): Promise<Playlist> {
    const playlist = await this.PlaylistkModel.findById(id).populate('tracks');
    return playlist;
  }
  async addTracks(trackId: ObjectId, playlistId: ObjectId): Promise<Playlist> {
    console.log(trackId);
    const track = await this.trackModel.findById(trackId).populate('comments');
    const tracks = await this.trackModel.find();
    console.log('Track:', track);

    if (!track)
      throw new HttpException('Track dont find', HttpStatus.NOT_FOUND);

    const playlist = await this.PlaylistkModel.findById(playlistId);
    console.log(playlist);
    playlist.tracks.push(track);
    playlist.save();
    return playlist;
  }
}