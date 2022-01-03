import { orderApi } from "../apis/ordenes";
import { Gmail } from "../services/gmail";
import Config from "../config/index";
class Orders {
  async getOrders(req, res) {
    const user = req.user;
    if (user) {
      const order = await orderApi.getOrder(user[0]._id, null);
      if (order) {
        return res.json({
          order: order,
        });
      } else {
        return res.status(400).json({
          order: "error",
        });
      }
    } else {
      res.status(400).json({
        msg: "El usuario no esta logeado",
      });
    }
  }

  async getOrdersById(req, res) {
    const { id } = req.params;
    const order = await orderApi.getOrderById(id);
    console.log(order);
    if (order) {
      return res.json({
        orderById: order,
      });
    } else {
      return res.status(400).json({
        orderById: "error",
      });
    }
  }
  async submit(req, res) {
    const { id } = req.params;
    const user = req.user;
    const order = await orderApi.getOrderById(id);
    if (!order || order[0].estado != "Generado") {
      return res.status(400).json({
        msg: "La orden no existe o no esta en estado 'Generado'",
      });
    } else {
      let data = {
        estado: "Completado",
      };
      await orderApi.updateOrder(order[0]._id, data);
      const orderUpdate2 = await orderApi.getOrderById(id);

      let content = "La orden fue completada";
      const gmailService = new Gmail("gmail");
      gmailService.sendEmail(
        Config.GMAIL_EMAIL,
        `Orden del usuario: ${user[0].username}`,
        content
      );
      return res.json({
        submit: orderUpdate2,
      });
    }
  }
}

export const ordersController = new Orders();
