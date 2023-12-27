import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID('4')
  artistId: string | null; // refers to Artist

  @IsOptional()
  @IsUUID('4')
  albumId: string | null; // refers to Album

  @IsNumber()
  @Min(1)
  duration: number; // integer number
}
