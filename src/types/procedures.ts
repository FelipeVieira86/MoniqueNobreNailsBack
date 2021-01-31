import { Clients } from '../models';

export interface IProcedureView {
  id: number
  day: string
  type: string
  value: string
  method: string
}

export interface ICreateProcedureData {
  day: string
  type: string
  value: string
  method: string
  client: Clients
}
