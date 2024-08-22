import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Image } from "./Image";
import { Episode } from "./Episode";

@Entity()
export class EpisodeMetadata {
  @PrimaryColumn({ type: 'integer' })
  showId!: number;

  @PrimaryColumn({ type: 'integer' })
  seasonNumber!: number;

  @PrimaryColumn({ type: 'integer' })
  episodeNumber!: number;

  @JoinColumn()
  @OneToOne(() => Episode, episode => episode.metadata, { onDelete: 'CASCADE' })
  episode!: Episode;

  @Column({ type: 'date' })
  airDate!: Date;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'text' })
  overview!: string;

  @Column({ type: 'integer' })
  voteAverage!: number;

  @ManyToMany(() => Image, image => image.episodeMetadata, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable({ name: 'episode_metadata_image' })
  images!: Image[];
}