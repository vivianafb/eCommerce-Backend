import {MensajeFactoryDAO} from '../models/mensajes/mensajes.factory'
import { TipoPersistencia } from "../models/mensajes/mensajes.factory";
const tipo = TipoPersistencia.MongoAtlas;

class mensajesAPI {
  mensaje;

  constructor() {
    this.mensaje = MensajeFactoryDAO.get(tipo);
  }

  async getMensajes(userId) {
    if (userId) {
      return this.mensaje.get(userId);
    } else {
      return this.mensaje.get();
    }
  }

  async addMensajes(data) {
    const newMensaje = await this.mensaje.add(data);
    return newMensaje;
    }
}
export const mensajesApi = new mensajesAPI();
