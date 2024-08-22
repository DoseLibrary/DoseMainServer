import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Season } from "./Season";
import { Image } from "./Image";

@Entity()
export class SeasonMetadata {
 @PrimaryColumn({ type: 'integer' })
 showId!: number;

 @PrimaryColumn({ type: 'integer' })
 seasonNumber!: number;

 @Column({ type: 'text' })
 title!: string;

 @Column({ type: 'date' })
 airDate!: Date;

 @Column({ type: 'text' })
 overview!: string;

 @JoinColumn()
 @OneToOne(() => Season, season => season.metadata, { onDelete: 'CASCADE' })
 season!: Season;

 @ManyToMany(() => Image, image => image.seasonMetadata, {
   cascade: true,
   onDelete: 'CASCADE',
   eager: true,
 })
 @JoinTable({ name: 'season_metadata_image' })
 images!: Image[];
}