import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Library } from "./Library";
import { ShowMetadata } from "./ShowMetadata";
import { Season } from "./Season";

@Entity()
export class Show {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP'})
  addedDate!: Date;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  path!: string;

  @ManyToOne(() => Library, library => library.shows)
  library!: Library;

  @OneToOne(() => ShowMetadata, metadata => metadata.show, { cascade: true, onDelete: 'CASCADE', eager: true })
  metadata?: ShowMetadata;

  @OneToMany(() => Season, season => season.show, { cascade: true, onDelete: 'CASCADE', eager: true })
  seasons!: Season[];
}