import { mensajesApi } from "../apis/mensajes";
import { logger } from "../utils/logs";


class Mensajes {
 

  async getMensajes(req, res) {
    const user = req.session
     console.log(`MENSAJE CONTROLLER USER ${req.session}`)
    const mensajes = await mensajesApi.getMensajes(req.user);
    return res.render('main');
    // if (mensajes) {
    //   return res.render('main',mensajes);
    // } else {
    //   return res.status(400).json({
    //     mensaje: "error",
    //   });
    // }
  }

  async addMensaje(req,res){
    try{
       console.log(`MENSAJE CONTROLLER: ${req.user}`)
      const data ={
        userId: req.userId,
        usuario: req.usuario,
        mensajeUser: req.mensajeUser,
        mensajeBot: req.mensajeBot
      }
      // console.log(`DATA CONTROLLER: ${data.mensaje}`)

      const mensaje = await mensajesApi.addMensajes(data)
      return mensaje
    }catch(err){
      logger.warn(err.message)
    }
  }
 
  
}

export const MensajesController = new Mensajes();
