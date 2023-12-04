import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ActiveUser } from 'src/iam/decorators/active.user.decorator';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(
    @ActiveUser() user: ActiveUserData,
    @Body() createArtistDto: CreateArtistDto,
  ) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll(@ActiveUser() user: ActiveUserData) {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(
    @ActiveUser() user: ActiveUserData,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.artistService.findOne(id);
  }

  @Patch(':id')
  update(
    @ActiveUser() user: ActiveUserData,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  remove(
    @ActiveUser() user: ActiveUserData,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.artistService.remove(id);
  }
}
