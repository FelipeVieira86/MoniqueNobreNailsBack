import { IProcedureView } from './procedures';

export interface IClientView {
  id: number
  name: string
  birthdate: string
  email: string
  phone: string
  procedures: IProcedureView[]
}

export interface ICreateClientData {
  name: string
  birthdate: string
  email: string
  phone: string
}
