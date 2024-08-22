import { Column, PrimaryColumn } from "typeorm";

export abstract class UserOngoing {
  @PrimaryColumn({ type: 'integer' })
  userId!: number;

  @Column({ type: 'integer' })
  time!: number;

  @Column({ type: 'date' })
  lastWatched!: Date;
}
