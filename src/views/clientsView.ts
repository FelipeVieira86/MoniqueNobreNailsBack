import Clients from '../models/Clients';
import ProceduresView from './proceduresView';
import { IClientView } from '../types';

export default {

  render(client: Clients): IClientView {
    return {
      id: client.id,
      name: client.name,
      birthdate: client.birthdate,
      email: client.email,
      phone: client.phone,
      procedures: ProceduresView.renderMany(client.procedures),
    };
  },

  renderMany(clients: Clients[]): IClientView[] {
    return clients.map((client) => this.render(client));
  },

};
