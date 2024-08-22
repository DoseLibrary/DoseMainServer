import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export @Entity() class ContentServer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  url!: string;
}
