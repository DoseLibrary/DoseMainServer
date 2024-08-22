import "reflect-metadata";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Library } from "./Library";
import { MovieMetadata } from "./MovieMetadata";
import { User } from "./User";
import { UserOngoingMovie } from "./UserOngoingMovie";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP'})
  addedDate!: Date;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  path!: string;

  @Column({ nullable: true, type: 'integer' })
  duration!: number;

  @Column({ nullable: true, type: 'text' })
  trailerPath!: string;

  @OneToOne(() => MovieMetadata, metadata => metadata.movie, { cascade: true, onDelete: 'CASCADE', eager: true })
  metadata?: MovieMetadata;

  @ManyToOne(() => Library, library => library.movies)
  library!: Library;

  @OneToMany(() => UserOngoingMovie, ongoingMovie => ongoingMovie.movie)
  usersWatching!: UserOngoingMovie[];

  @ManyToMany(() => User, user => user.watchlistMovies, { onDelete: 'CASCADE', eager: true })
  usersWatchlist!: User[];

  @ManyToMany(() => User, user => user.watchedMovies, { onDelete: 'CASCADE', eager: true })
  usersWatched!: User[];
}