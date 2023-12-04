import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Artist, { onDelete: 'SET NULL' })
  @JoinTable()
  artists: Artist[]; // favorite artists ids

  @ManyToMany(() => Album, { onDelete: 'SET NULL' })
  @JoinTable()
  albums: Album[]; // favorite albums ids

  @ManyToMany(() => Track, { onDelete: 'SET NULL' })
  @JoinTable()
  tracks: Track[]; // favorite tracks ids
}
