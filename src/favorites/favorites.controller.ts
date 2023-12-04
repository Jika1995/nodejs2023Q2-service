import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ActiveUser } from 'src/iam/decorators/active.user.decorator';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { FavoritesService } from './favorites.service';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll(@ActiveUser() user: ActiveUserData) {
    return this.favoritesService.getAllFavorites();
  }

  @Post('artist/:id')
  @ApiCreatedResponse({ description: 'Artist added to your favorites list' })
  addArtist(
    @ActiveUser() user: ActiveUserData,
    @Param('id', ParseUUIDPipe) artistId: string,
  ) {
    return this.favoritesService.addArtist(artistId);
  }

  @Delete('artist/:id')
  @ApiNoContentResponse({
    description: 'Artist removed from your favorites list',
  })
  removeArtist(
    @ActiveUser() user: ActiveUserData,
    @Param('id', ParseUUIDPipe) artistId: string,
  ) {
    return this.favoritesService.removeArtist(artistId);
  }

  @Post('album/:id')
  @ApiCreatedResponse({ description: 'Album added to your favorites list' })
  addAlbum(
    @ActiveUser() user: ActiveUserData,
    @Param('id', ParseUUIDPipe) albumId: string,
  ) {
    return this.favoritesService.addAlbum(albumId);
  }

  @Delete('album/:id')
  @ApiNoContentResponse({
    description: 'Album removed from your favorites list',
  })
  removeAlbum(
    @ActiveUser() user: ActiveUserData,
    @Param('id', ParseUUIDPipe) albumId: string,
  ) {
    return this.favoritesService.removeAlbum(albumId);
  }

  @Post('track/:id')
  @ApiCreatedResponse({ description: 'Track added to your favorites list' })
  addTrack(
    @ActiveUser() user: ActiveUserData,
    @Param('id', ParseUUIDPipe) trackId: string,
  ) {
    return this.favoritesService.addTrack(trackId);
  }

  @Delete('track/:id')
  @ApiNoContentResponse({
    description: 'Track removed from your favorites list',
  })
  removeTrack(
    @ActiveUser() user: ActiveUserData,
    @Param('id', ParseUUIDPipe) trackId: string,
  ) {
    return this.favoritesService.removeTrack(trackId);
  }
}
