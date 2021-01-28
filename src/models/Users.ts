import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export default class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  admin: boolean;
}
