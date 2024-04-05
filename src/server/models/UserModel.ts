import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export @Entity() class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  username!: string;

  @Column({ type: 'text' })
  password!: string;

  @Column({ type: 'text' })
  salt!: string;
}
