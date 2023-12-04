import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoritesRepository: Repository<Favorite>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async addArtist(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id: id } });

    if (!artist) {
      throw new NotFoundException('Artist with given id does not exist');
    }

    const favorites = await this.getAllFavorites();

    favorites.artists.push(artist);

    await this.favoritesRepository.save(favorites);
  }

  async removeArtist(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id: id } });

    if (!artist) {
      throw new NotFoundException('Artist with given id does not exist');
    }

    const favorites = await this.getAllFavorites();

    const artistIndex = favorites.artists.findIndex(
      (item) => item.id === artist.id,
    );

    favorites.artists.splice(artistIndex, 1);

    await this.favoritesRepository.save(favorites);
  }

  async addAlbum(id: string) {
    const album = await this.albumRepository.findOne({ where: { id: id } });

    if (!album) {
      throw new NotFoundException('Album with given id does not exist');
    }

    const favorites = await this.getAllFavorites();

    favorites.albums.push(album);

    await this.favoritesRepository.save(favorites);
  }

  async removeAlbum(id: string) {
    const album = await this.albumRepository.findOne({ where: { id: id } });

    if (!album) {
      throw new NotFoundException('Album with given id does not exist');
    }

    const favorites = await this.getAllFavorites();

    const albumIndex = favorites.albums.findIndex(
      (item) => item.id === album.id,
    );

    favorites.albums.splice(albumIndex, 1);

    await this.favoritesRepository.save(favorites);
  }

  async addTrack(id: string) {
    const track = await this.trackRepository.findOne({ where: { id: id } });

    if (!track) {
      throw new NotFoundException('Track with given id does not exist');
    }

    const favorites = await this.getAllFavorites();

    favorites.tracks.push(track);

    await this.favoritesRepository.save(favorites);
  }

  async removeTrack(id: string) {
    const track = await this.trackRepository.findOne({ where: { id: id } });

    if (!track) {
      throw new NotFoundException('Track with given id does not exist');
    }

    const favorites = await this.getAllFavorites();

    const trackIndex = favorites.tracks.findIndex(
      (item) => item.id === track.id,
    );

    favorites.tracks.splice(trackIndex, 1);

    await this.favoritesRepository.save(favorites);
  }

  async getAllFavorites() {
    let myFavorites = await this.favoritesRepository.findOne({
      where: {},
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    if (!myFavorites) {
      myFavorites = {
        artists: [],
        albums: [],
        tracks: [],
      } as Favorite;
    }

    return myFavorites;
  }
}
