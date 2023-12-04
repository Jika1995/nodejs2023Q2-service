import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    // const album = await this.albumRepository.findOne({
    //   where: {
    //     id: createTrackDto.albumId,
    //   },
    // });
    // if (!album) {
    //   throw new NotFoundException('There is no album with this id');
    // }

    // const artist = await this.artistRepository.findOne({
    //   where: {
    //     id: album.artistId,
    //   },
    // });
    // if (artist.id !== createTrackDto.artistId) {
    //   throw new NotAcceptableException(
    //     'The album does not match with his artist',
    //   );
    // }
    console.log(createTrackDto.artistId);

    await this.checkArtistAndAlbum(
      createTrackDto.artistId,
      createTrackDto.albumId,
    );

    const track = this.trackRepository.create(createTrackDto);
    return await this.trackRepository.save(track);
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    // throw 'A random error'; //Internal 500
    const track = await this.trackRepository.findOne({ where: { id: id } });
    if (!track) {
      // eslint-disable-next-line prettier/prettier
      throw new NotFoundException(`Track ${ id } not found`);
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    // const album = await this.albumRepository.findOne({
    //   where: {
    //     id: updateTrackDto.albumId,
    //   },
    // });
    // if (!album) {
    //   throw new NotFoundException('There is no album with this id');
    // }

    // const artist = await this.artistRepository.findOne({
    //   where: {
    //     id: album.artistId,
    //   },
    // });
    // if (artist.id !== updateTrackDto.artistId) {
    //   throw new NotAcceptableException(
    //     'The album does not match with his artist',
    //   );
    // }

    await this.checkArtistAndAlbum(
      updateTrackDto.artistId,
      updateTrackDto.albumId,
    );

    const track = await this.trackRepository.preload({
      id: id,
      ...updateTrackDto,
    });

    if (!track) {
      // eslint-disable-next-line prettier/prettier
      throw new NotFoundException(`Track ${ id } not found`);
    }
    return this.trackRepository.save(track);
  }

  async remove(id: string) {
    const track = await this.findOne(id);
    if (!track) {
      // eslint-disable-next-line prettier/prettier
      throw new NotFoundException(`Track ${ id } not found`);
    }
    return this.trackRepository.remove(track);
  }

  async checkArtistAndAlbum(artistId: string | null, albumId: string | null) {
    let album = null;
    if (albumId) {
      album = await this.albumRepository.findOne({
        where: {
          id: albumId,
        },
      });
      if (!album) {
        throw new NotFoundException('There is no album with this id');
      }
    }

    if (artistId) {
      const artist = await this.artistRepository.findOne({
        where: {
          id: artistId,
        },
      });
      if (artist.id !== album.artistId) {
        throw new NotAcceptableException(
          'The album does not match with his artist',
        );
      }
    }
  }
}
