import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    TrackModule,
    MongooseModule.forRoot('mongodb://localhost:27017/music_app'),
  ],
})
export class AppModule {}
