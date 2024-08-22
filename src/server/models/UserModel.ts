import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ContentServer } from "./ContentServerModel";

export @Entity() class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  username!: string;

  @Column({ type: 'text' })
  password!: string;

  @Column({ type: 'text' })
  salt!: string;

  @ManyToMany(() => ContentServer, contentServer => contentServer.users, {
    eager: true,
    onDelete: 'CASCADE'
  })
  @JoinTable({
    name: 'user_content_server'
  })
  contentServers!: ContentServer[];

}
