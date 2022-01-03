import Config from "../config/index";
import { carritoAPI } from "../apis/carrito";
import { productsAPI } from "../apis/productos";
import { orderApi } from "../apis/ordenes";
import { Gmail } from "../services/gmail";
import { logger } from "../utils/logs";

// let carrito = [
//   {
//     id: 1,
//     timestamp: Date.now(),
//     producto: {
//       id: 1,
//       nombre: "lapiz",
//       precio: 100,
//       descripcion: "color rojo",
//       codigo: 123456,
//       foto: "https://img.freepik.com/vector-gratis/diseno-lapiz-escribiendo_1095-187.jpg?size=338&ext=jpg",
//       stock: 27,
//       timestamp: Date.now(),
//     },
//   },
//   {
//     id: 2,
//     timestamp: Date.now(),
//     producto: {
//       id: 2,
//       nombre: "goma",
//       precio: 200,
//       descripcion: "goma de borrar",
//       codigo: 789123,
//       foto: "https://www.libreriaservicom.cl/wp-content/uploads/2019/03/goma-de-borrar-factis-s20.jpg",
//       stock: 30,
//       timestamp: Date.now(),
//     },
//   },
// ];

// const tableName = "carrito";

class Carrito {
  async validacion(req, res, next) {
    const { createdAt, producto_id } = req.body;
    if (!createdAt || !producto_id)
      return res.status(400).json({
        msg: "Campos del body invalidos",
      });
    next();
  }

  async checkCarritoExists(req, res) {
    try {
      const { id } = req.params;
      const carrito = await carritoAPI.getCarrito(id);
      if (!carrito) {
        return res.status(404).json({
          msg: `Carrito no encontrado, el id: ${id} no existe`,
        });
      } else {
        return res.json({
          data: carrito,
        });
      }
    } catch (err) {
      logger.warn(err.message);
      return res.status(404).json({
        msg: err,
      });
    }
  }

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
          return res
            .status(400)
            .json({
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

    // const userId = user[0]._id;
    // if (id != userId) return res.status(400).json({ msg: "User id not found" });

    // if (!productId || !productAmount)
    //   return res.status(400).json({ msg: "Invalid body parameters" });

    const product = await productsAPI.getProducts(productId);

    if (!product.length)
      return res.status(400).json({ msg: "Product not found" });

    // if (parseInt(productAmount) < 0)
    //   return res.status(400).json({ msg: "Invalid amount" });

    const proAmount = cart.productos[0].amount;
    // if (parseInt(productAmount) > proAmount)
    //   return res.status(400).json({
    //     msg: `La cantidad que ingresa supera la cantidad actual(${proAmount}) del producto en el carrito`,
    //   });

    const updatedCart = await carritoAPI.deleteProudct(
      cart._id,
      productId,
      parseInt(proAmount)
    );
    let totalstock = product[0].stock + proAmount;
    // let stock = product[0].stock;
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

  // async deleteCarrito(req, res) {
  //   const user = req.user;
  //   const cart = await carritoAPI.getCarrito(user._id);
  //   const updatedCart = await carritoAPI.deleteCarrito(cart._id);

  //   res.json({
  //     msg: "Carrito eliminado ya que el user se elimino",
  //     data: updatedCart,
  //   });
  // }
}
export const carritoController = new Carrito();
