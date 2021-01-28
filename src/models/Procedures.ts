import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import Client from './Clients';

@Entity('procedures')
export default class Procedures {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  day: string;

  @Column()
  type: string;

  @Column()
  value: string;

  @Column()
  method: string;

  @ManyToOne(() => Client, (client) => client.procedures)
  @JoinColumn({ name: 'client_id' })
  client: Client;
}
