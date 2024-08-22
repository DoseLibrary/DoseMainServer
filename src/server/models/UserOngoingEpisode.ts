import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserOngoing } from "./UserOngoing";
import { User } from "./User";
import { Episode } from "./Episode";

@Entity()
export class UserOngoingEpisode extends UserOngoing {
  @PrimaryColumn({ type: 'integer' })
  showId!: number;

  @PrimaryColumn({ type: 'integer' })
  seasonNumber!: number;

  @PrimaryColumn({ type: 'integer' })
  episodeNumber!: number;

  @ManyToOne(() => User, user => user.ongoingEpisodes, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Episode, episode => episode.usersWatching, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({
    name: 'showId',
    referencedColumnName: 'showId',
  })
  @JoinColumn({
    name: 'seasonNumber',
    referencedColumnName: 'seasonNumber',
  })
  @JoinColumn({
    name: 'episodeNumber',
    referencedColumnName: 'episodeNumber',
  })
  episode!: Episode;
}