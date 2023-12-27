import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = this.artistRepository.create(createArtistDto);
    return await this.artistRepository.save(artist);
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    // throw 'A random error'; //Internal 500
    const artist = await this.artistRepository.findOne({ where: { id: id } });
    if (!artist) {
      // eslint-disable-next-line prettier/prettier
      throw new NotFoundException(`Artist ${ id } not found`);
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.preload({
      id: id,
      ...updateArtistDto,
    });

    if (!artist) {
      // eslint-disable-next-line prettier/prettier
      throw new NotFoundException(`Artist ${ id } not found`);
    }

    return this.artistRepository.save(artist);
  }

  async remove(id: string) {
    const artist = await this.findOne(id);
    return this.artistRepository.remove(artist);
  }
}
