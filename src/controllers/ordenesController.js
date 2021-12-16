import { orderApi } from "../apis/ordenes";
import { Gmail } from '../services/gmail';
import { logger } from '../utils/logs';
import Config from '../config/index';
class Orders
{

    async getOrders(req,res){
        const user = req.user;
        const order = await orderApi.getOrder(user[0]._id,null);
        if(order){
            return res.json({
                order:order
            }); 
        }else{
            return res.status(400).json({
                order:'error'
            }); 
        }     
    }

    async getOrdersById(req,res){
        const {id} = req.params;
        const order = await orderApi.getOrder(null,id);
        if(order){
            return res.json({
                orderById:order
            }); 
        }else{
            return res.status(400).json({
                orderById:'error'
            }); 
        }     
    }
    async submit(req, res){
        const {id}= req.params
        const user = req.user;
        const userId = user[0]._id;
        const order = await orderApi.getOrder(null,id);
        if(!order || order.estado != "Generado"){
            return res.status(400).json({
                msg:"La orden no existe o no esta en estado 'Generado'"
            })
            
        } else{
            const OrderId = order._id;
            let estado = {estado:"Completado"}
            const orderUpdate = await orderApi.updateState(OrderId,estado);
            const orderUpdate2 = await orderApi.getOrder(null,id);

            let content = 'La orden fue completada';
            const gmailService = new Gmail('gmail');
            gmailService.sendEmail(Config.GMAIL_EMAIL, 
              `Orden del usuario: ${user[0].username}`,
            content);
            return res.json({
                submit:orderUpdate2
            }); 
        }
    }
}

export const ordersController = new Orders();