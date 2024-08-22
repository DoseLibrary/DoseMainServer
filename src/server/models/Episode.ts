import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Season } from "./Season";
import { EpisodeMetadata } from "./EpisodeMetadata";
import { User } from "./User";
import { UserOngoingEpisode } from "./UserOngoingEpisode";

@Entity()
export class Episode {
  @PrimaryColumn({ type: 'integer' })
  showId!: number;

  @PrimaryColumn({ type: 'integer' })
  seasonNumber!: number;

  @PrimaryColumn({ type: 'integer' })
  episodeNumber!: number;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP'})
  addedDate!: Date;

  @Column({ type: 'text' })
  path!: string;

  @Column({ nullable: true, type: 'integer'})
  duration?: number;

  // Have to specify the referenceColumnName otherwise it will be incorect, "seasonShowId" instead of "showId
  @ManyToOne(() => Season, season => season.episodes, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'showId',
    referencedColumnName: 'showId',
  })
  @JoinColumn({
    name: 'seasonNumber',
    referencedColumnName: 'seasonNumber',
  })
  season!: Season;

  @OneToOne(() => EpisodeMetadata, metadata => metadata.episode, { cascade: true, onDelete: 'CASCADE', eager: true })
  metadata?: EpisodeMetadata;

  @OneToMany(() => UserOngoingEpisode, ongoingEpisode => ongoingEpisode.episode, { onDelete: 'CASCADE' })
  usersWatching!: UserOngoingEpisode[];
}