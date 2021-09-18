import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileService } from 'src/file/file.service';
import { Album, AlbumSchema } from './schemas/album.schema';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { Playlist, PlaylistSchema } from './schemas/playlist.schema';
import { Track, TrackSchema } from './schemas/track.schema';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    MongooseModule.forFeature([{ name: Playlist.name, schema: PlaylistSchema }])
  ],
  controllers: [TrackController],
  providers: [TrackService, FileService],
})
export class TrackModule {}
