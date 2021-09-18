import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

export type TrackDocument = Playlist & mongoose.Document;

@Schema()
export class Playlist {
  @Prop()
  name: string;

  @Prop()
  artist: string;

  @Prop()
  text: string;

  @Prop()
  listens: number;

  @Prop()
  picture: string;

  @Prop()
  audio: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }] })
  playlists: Playlist;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
