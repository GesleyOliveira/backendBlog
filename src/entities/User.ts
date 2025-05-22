import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Article } from './Article';

@Entity('users')
export class User {
  @OneToMany(() => Article, (article) => article.author)
  articles!: Article[];
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true }) 
  surname?: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  avatar?: string;
}

