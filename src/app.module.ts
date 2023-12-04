import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
// import { ArtistModule } from './artist/artist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AlbumModule } from './album/album.module';
// import { FavoritesModule } from './favorites/favorites.module';
import { IamModule } from './iam/iam.module';
import { ConfigModule } from '@nestjs/config';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { FavoritesModule } from './favorites/favorites.module';
import dataSource from 'ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TypeOrmModule.forRoot(dataSource),
    IamModule,
    TrackModule,
    AlbumModule,
    ArtistModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
