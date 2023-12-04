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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ActiveUser } from 'src/iam/decorators/active.user.decorator';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
// import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';
// import { Auth } from 'src/iam/authentication/decorators/auth.decorator';

// @Auth(AuthType.None)
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(
    @ActiveUser() user: ActiveUserData,
    @Body() createTrackDto: CreateTrackDto,
  ) {
    console.log(createTrackDto instanceof CreateTrackDto);
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll(@ActiveUser() user: ActiveUserData) {
    console.log(user);
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(
    @ActiveUser() user: ActiveUserData,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.trackService.findOne(id);
  }

  @Patch(':id')
  update(
    @ActiveUser() user: ActiveUserData,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  remove(
    @ActiveUser() user: ActiveUserData,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.trackService.remove(id);
  }
}
