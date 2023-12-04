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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(
    @ActiveUser() user: ActiveUserData,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll(@ActiveUser() user: ActiveUserData) {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(
    @ActiveUser() user: ActiveUserData,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.albumService.findOne(id);
  }

  @Patch(':id')
  update(
    @ActiveUser() user: ActiveUserData,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  remove(
    @ActiveUser() user: ActiveUserData,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.albumService.remove(id);
  }
}
