import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/artist/entities/artist.entity';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    // const artist = this.artistService.findOne(createAlbumDto.artistId);
    // if (!artist) {
    //   throw new NotFoundException(`There is no artist with this id`);
    // }
    if (createAlbumDto.artistId) {
      await this.checkIfArtistExists(createAlbumDto.artistId);
    }

    const album = this.albumRepository.create(createAlbumDto);
    return await this.albumRepository.save(album);
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne({ where: { id: id } });
    if (!album) {
      throw new NotFoundException(`Album with this id not found`);
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    // const artist = this.artistService.findOne(updateAlbumDto.artistId);
    // if (!artist) {
    //   throw new NotFoundException(`There is no artist with this id`);
    // }
    if (updateAlbumDto.artistId) {
      await this.checkIfArtistExists(updateAlbumDto.artistId);
    }

    const album = await this.albumRepository.preload({
      id: id,
      ...updateAlbumDto,
    });

    if (!album) {
      throw new NotFoundException(`Album with this id not found`);
    }

    return this.albumRepository.save(album);
  }

  async remove(id: string) {
    const album = await this.findOne(id);
    return this.albumRepository.remove(album);
  }

  async checkIfArtistExists(artistId: string | null) {
    const artist = await this.artistRepository.findOne({
      where: {
        id: artistId,
      },
    });
    if (!artist) {
      throw new NotFoundException(`There is no artist with this id`);
    }
  }
}
