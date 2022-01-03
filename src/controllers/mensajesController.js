import { mensajesApi } from "../apis/mensajes";
import { logger } from "../utils/logs";
class Mensajes {
  async getMensajes(req, res) {
    return res.render("main");
  }

  async addMensaje(req, res) {
    try {
      const data = {
        userId: req.userId,
        usuario: req.usuario,
        mensajeUser: req.mensajeUser,
        mensajeBot: req.mensajeBot,
      };

      const BearerToken = data.usuario;

      const mensaje = await mensajesApi.addMensajes(data);
      return mensaje;
    } catch (err) {
      logger.warn(err.message);
    }
  }
}

export const MensajesController = new Mensajes();
