import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class Character {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'integer' })
  orderInCredit!: number;
}