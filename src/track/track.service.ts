import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';

import { CreateComment } from './dto/add-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Track, TrackDocument } from './schemas/track.schema';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
    if (!track)
      throw new HttpException('заполните поля трека', HttpStatus.BAD_REQUEST);

    return track;
  }
  async getAll(count: number = 10, offset: number = 0): Promise<any> {
    const tracks = await this.trackModel
      .find()
      .sort({'listens':-1})
      .skip(Number(offset))
      .limit(Number(count));
    const total = await this.trackModel.find().countDocuments();

    return { tracks, total };
  }
  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');
    return track;
  }
  async getComments(id: ObjectId): Promise<any> {
    const track = await this.trackModel.findById(id).populate('comments');
    return track.comments;
  }
  async delete(id: ObjectId): Promise<any> {
    try {
      const track = await this.trackModel.findByIdAndDelete(id);
      const total = await this.trackModel.find().countDocuments();
      return { track: track._id, total };
    } catch (err) {
      console.log(err);
    }
  }
  async addComment(dto: CreateComment): Promise<Comment> {
    console.log(dto.trackId);
    const track = await this.trackModel.findById(dto.trackId);
    console.log(track);
    const comment = await this.commentModel.create({ ...dto });

    track.comments.push(comment._id);
    await track.save();
    return comment;
  }
  async deleteComment(id: ObjectId): Promise<Comment> {
    const comment = await this.commentModel.findByIdAndDelete(id);
    return comment;
  }
  async listen(id: ObjectId): Promise<void> {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
  }
  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return tracks;
  }
}
