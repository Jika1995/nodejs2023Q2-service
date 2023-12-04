import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track, Artist, Album])],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
