import { orderApi } from "../apis/ordenes";
class Orders
{

    async getOrders(req,res){
        const user = req.user;
        const order = await orderApi.getOrder(user[0]._id);
        if(order){
            return res.json({
                order:order
            }); 
        }else{
            return res.status(400).json({
                order:order
            }); 
        }     
    }

    async getOrderById(){}

    async submit(){}
}

export const ordersController = new Orders();