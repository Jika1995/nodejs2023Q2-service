import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  // id: string; // uuid v4
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsOptional()
  @IsUUID('4')
  artistId: string | null; // refers to Artist
}
