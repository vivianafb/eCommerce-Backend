import Config from "../config/index";
import { carritoAPI } from "../apis/carrito";
import { productsAPI } from "../apis/productos";
import { orderApi } from "../apis/ordenes";
import { Gmail } from "../services/gmail";
import { logger } from "../utils/logs";

class Carrito {
  async getCartByUser(req, res) {
    try {
      const user = req.user;
      const cart = await carritoAPI.getCarrito(user[0]._id);
      return res.json(cart);
    } catch (err) {
      res.status(400).json({
        msg: "No se pudo obtener el carrito",
      });
    }
  }

  async addProduct(req, res) {
    try {
      const user = req.user;
      if (!user) {
        return res.status(400).json({ msg: "El usuaro no esta logeado" });
      } else {
        const cart = await carritoAPI.getCarrito(user[0]._id);
        const { productId, productAmount } = req.body;

        if (!productId || !productAmount)
          return res.status(400).json({ msg: "Parametros del body invalidos" });

        const product = await productsAPI.getProducts(productId);

        if (!product.length)
          return res.status(400).json({
            msg: `Producto no encontrado, id: ${productId} no existe`,
          });

        if (parseInt(productAmount) < 0)
          return res
            .status(400)
            .json({ msg: "Cantidad de productos invalida" });

        if (parseInt(productAmount) > product[0].stock)
          return res.status(400).json({
            msg: `La cantidad de producto supera el stock, el stock actual es: ${product[0].stock}`,
          });

        if (product[0].stock === 0)
          return res.status(400).json({
            msg: `No queda stock, el stock actual es: ${product[0].stock}`,
          });

        const updatedCart = await carritoAPI.addProduct(
          cart._id,
          productId,
          parseInt(productAmount)
        );
        let totalstock = product[0].stock - productAmount;
        // console.log(cart._id)
        let stock = product[0].stock;
        await productsAPI.updateProduct(productId, {
          stock: totalstock,
        });
        res.json({ msg: "Producto agregado con exito", cart: updatedCart });
      }
    } catch (err) {
      res.status(403).json({
        msg: err.message,
      });
    }
  }

  async deleteProduct(req, res) {
    const user = req.user;
    const { productId } = req.params;
    const cart = await carritoAPI.getCarrito(user[0]._id);

    const product = await productsAPI.getProducts(productId);
    const exist = await carritoAPI.checkProduct(cart._id,productId)
    if(exist === false) return res.status(400).json({ msg: "Product is not in the cart" });

    if (!product.length)
      return res.status(400).json({ msg: "Product not found" });


    const proAmount = cart.productos[0].amount;

    const updatedCart = await carritoAPI.deleteProudct(
      cart._id,
      productId,
      parseInt(proAmount)
    );
    let totalstock = product[0].stock + proAmount;
    await productsAPI.updateProduct(productId, {
      stock: totalstock,
    });
    res.json({ msg: "Product deleted", cart: updatedCart });
  }

  async comprarProduct(req, res) {
    try {
      const user = req.user;
      const userId = user[0]._id;
      if (!user) {
        return res.status(400).json({ msg: "El usuaro no esta logeado" });
      } else {
        const cart = await carritoAPI.getCarrito(userId);

        const productosCarrito = cart.productos;
        if (!productosCarrito.length)
          return res.status(400).json({ msg: "El carrito esta vacio" });

        // const GenerateOrder = await orderApi.getOrder(userId);

        let content = "";
        let total = 0;
        let items = [];
        let productPrice = [];
        let productName = [];
        for (let i = 0; i < productosCarrito.length; i++) {
          const productId = cart.productos[i]._id;
          const productAmount = cart.productos[i].amount;
          let dato = await productsAPI.getProducts(productId);

          for (let i = 0; i < dato.length; i++) {
            productName = dato[i].nombre;
            productPrice = dato[i].precio;
            total += dato[i].precio * productAmount;
          }
          content += `<p>${dato}</p>`;
          items.push({ productName, productAmount, productPrice });
        }

        const gmailService = new Gmail("gmail");
        gmailService.sendEmail(
          Config.GMAIL_EMAIL,
          `Nuevo pedido del usuario: ${user[0].username}, email: ${user[0].email}`,
          content
        );
        const orden = await orderApi.getOrder(userId);
        let numOrder = orden.length + 1;
        let data = req.body;
        const GenerateOrder = await orderApi.createOrder(
          userId,
          items,
          total,
          numOrder,
          data
        );

        await carritoAPI.deleteAll(cart._id);
        res.json({
          msg: "Orden creada con exito",
          data: GenerateOrder,
        });
      }
    } catch (err) {
      return res.status(404).json({
        err: err.message,
      });
    }
  }
}
export const carritoController = new Carrito();
