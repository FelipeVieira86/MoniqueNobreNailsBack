import Procedures from '../models/Procedures';

export interface IProcedureView {
  id: number
  day: string
  type: string
  value: string
  method: string
}

export default {

  render(procedure: Procedures): IProcedureView {
    return {
      id: procedure.id,
      day: procedure.day,
      type: procedure.type,
      value: procedure.value,
      method: procedure.method,
    };
  },

  renderMany(procedures: Procedures[]): IProcedureView[] {
    return procedures.map((procedure) => this.render(procedure));
  },

};
