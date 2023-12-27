import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamModule } from './iam/iam.module';
import { ConfigModule } from '@nestjs/config';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { FavoritesModule } from './favorites/favorites.module';
import { LoggingMiddleware } from './common/middleware/logging.middleware';
import { LoggingModule } from './common/middleware/logging.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESQL_HOST || 'localhost',
      port: parseInt(process.env.POSTGRESQL_PORT) || 5432,
      username: process.env.POSTGRESQL_USERNAME || 'postgres',
      password: process.env.POSTGRESQL_PASSWORD || 'postgres',
      database: process.env.POSTGRESQL_DB || 'postgres',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    IamModule,
    TrackModule,
    AlbumModule,
    ArtistModule,
    FavoritesModule,
    LoggingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
