import { FileService } from './../file/file.service';
import { PlaylistService } from './playlist.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlaylistController } from './playlist.controller';
import { Playlist, PlaylistSchema } from './schemas/playlist.schema';
import { Track, TrackSchema } from 'src/track/schemas/track.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Playlist.name, schema: PlaylistSchema },
      { name: Track.name, schema: TrackSchema },
    ]),
  ],

  controllers: [PlaylistController],
  providers: [PlaylistService, FileService],
})
export class PlaylistModule {}
