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
    MongooseModule.forRoot(
      process.env.MONGODB_URI ||
        'mongodb+srv://application:dtyX6jzytQMbDmo2@cluster0.cri5u.mongodb.net/fd3diplom?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
