import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn,
} from 'typeorm';
import Procedure from './Procedures';

@Entity('clients')
export default class Clients {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  birthdate: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToMany(() => Procedure, (procedure) => procedure.client, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'client_id' })
  procedures: Procedure[];
}
