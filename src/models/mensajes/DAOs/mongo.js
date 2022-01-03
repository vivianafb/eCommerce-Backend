import mongoose from 'mongoose';
import Config from '../../../config/index'
import { logger } from '../../../utils/logs';

const messageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  usuario: {type: String, required: true },
  mensajeUser: [{type:String,required:true}],
  mensajeBot: [{type:String,required:true}],
});

export class MensajeAtlasDAO{
    srv;
    mensaje;
 
    constructor(local) {
     if (local)
       this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
     else
       this.srv = Config.MONGO_ATLAS_URL;
     mongoose.connect(this.srv);
     this.mensaje = mongoose.model('mensajes', messageSchema);
   }

   async get(id){
    try{
        const result = await this.mensaje.findOne({id});
        // console.log(`MONGO MSG ${result}`)
        if (result) return result;
       }catch(err){
        logger.warn('id not found');
       }
   }

   async add(data){
    const newMensaje = new this.mensaje(data);
     await newMensaje.save();
    return newMensaje;
   }
}