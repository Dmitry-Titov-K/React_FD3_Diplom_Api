import { FileService, FileType } from './../file/file.service';
import { CreatePlaylistDto } from './dto/create-playlist';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      if (picture) {
        const picturePath = this.fileService.createFile(
          FileType.IMAGE,
          picture,
        );
      }
      const picturePath = '';
      if (!dto) {
        throw new HttpException(
          'create playlist dto requered!',
          HttpStatus.BAD_REQUEST,
        );
      }
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
    const playlists = await this.PlaylistkModel.find();
    const totlaPlaylists = await this.PlaylistkModel.find().countDocuments();
    return { playlists, totlaPlaylists };
  }
  async getUserPlaylists(userId: string): Promise<any> {
    const playlist = await this.PlaylistkModel.find({ owner: userId });
    return playlist;
  }
  async delete(id: ObjectId): Promise<Playlist> {
    const playlist = await this.PlaylistkModel.findByIdAndDelete(id);
    return playlist;
  }
  async getById(id: ObjectId): Promise<Playlist> {
    const playlist = await this.PlaylistkModel.findById(id).populate('tracks');
    console.log(playlist);
    if (!playlist)
      throw new HttpException('Playlist not defined', HttpStatus.NOT_FOUND);
    return playlist;
  }
  async addTracks(trackId: ObjectId, playlistId: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(trackId).populate('comments');

    if (!track)
      throw new HttpException('Track dont find', HttpStatus.NOT_FOUND);
    const dublicateTrack = await this.PlaylistkModel.find({ _id: playlistId });
    console.log(dublicateTrack);
    const playlist = await this.PlaylistkModel.findById(playlistId);

    playlist.tracks.push(track);
    playlist.save();

    return track;
  }
  async deleteTrack(trackId: ObjectId, playlistId: ObjectId): Promise<any> {
    const playlist = await this.PlaylistkModel.findByIdAndUpdate(
      { _id: playlistId },
      { $pull: { tracks: { $in: trackId } } },
    );
    playlist.save();
    console.log(playlist);
    return trackId;
  }
}
