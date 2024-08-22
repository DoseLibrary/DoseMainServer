import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./Movie";
import { Show } from "./Show";

export enum LibraryType {
  MOVIE = 'MOVIE',
  SHOW = 'SHOW',
};

@Entity()
export class Library {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column({ type: 'text' })
  name!: string;

  @Column({enum: LibraryType, type: 'text'})
  type!: LibraryType;

  @Column({ type: 'text' })
  path!: string;

  @OneToMany(() => Movie, movie => movie.library)
  movies!: Movie[];

  @OneToMany(() => Show, show => show.library)
  shows!: Show[];
}
