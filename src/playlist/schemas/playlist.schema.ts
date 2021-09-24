import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { Track } from 'src/track/schemas/track.schema';

export type PlaylistDocument = Playlist & mongoose.Document;

@Schema()
export class Playlist {
  @Prop()
  name: string;

  @Prop()
  owner: string;

  @Prop()
  listens: number;

  @Prop()
  picture?: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
  tracks: Track[];
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
