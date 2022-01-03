import socketIo from "socket.io";
 import { MensajesController } from "../controllers/mensajesController";
import { logger } from "../utils/logs";
import { UserAPI } from "../apis/user";
import { productsAPI } from "../apis/productos";
import { orderApi } from "../apis/ordenes";
import { carritoAPI } from "../apis/carrito";
import jwt from 'jsonwebtoken';
import Config from '../config/index'
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "../middleware/auth";

const data = {
  usuario: undefined,
  mensajes: undefined,
};


export const initWsServer = (server) => {
  const io = socketIo(server);
  // const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
  // const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

  // const StoreOptions = {
  //   store: MongoStore.create({
  //     mongoUrl: Config.MONGO_ATLAS_URL,
  //     mongoOptions: advancedOptions,
  //   }),
  
  //   secret: Config.SESSION_SECRET,
  //   resave: false,
  //   saveUninitialized: true,
  //   cookie: {
  //     maxAge: Config.SESSION_COOKIE_TIMEOUT_MIN * 60 * 1000,
  //   },
  // };
  // io.use(wrap(session(StoreOptions)));
  // io.use(wrap(passport.initialize()));
  // io.use(wrap(passport.session()));
  // io.use((socket, next) => {
  //   if (socket.request.user) {
  //     next();
  //   } else {
  //     next(new Error('unauthorized'))
  //   }
  // });
  
  // io.use(passportSocketIo.authorize({
  //     cookieParser: cookieParser,
  //     key: 'express.sid',
  //     secret: process.env.SESSION_SECRET,
  //     store: store
  //   })
  // );

  io.on("connection", async (socket) => {
    //  console.log(socket.request.session.passport.user)
    // console.log(socket.request)
    logger.warn("WEBSOCKET");
     let mensajes = MensajesController.getMensajes;
     
    socket.emit("receiveMessages", mensajes);

    // socket.broadcast.emit("message", formatMessages(data));

    socket.on("newMessage", async (mensajes) => {
      const username = mensajes.usuario;
      const user = await UserAPI.query(username);

      if (mensajes.mensajes.toLowerCase().includes("stock")) {
        const productos = await productsAPI.getProducts();
        // console.log(`stock : ${productos[0].stock}`)
        let pro = [];
        let stock = [];
        let nombre = [];
        for (let i = 0; i < productos.length; i++) {
          nombre = productos[i].nombre;
          stock = productos[i].stock;
          pro.push({ nombre: nombre, stock: stock });
        }

        console.log(`stock : ${pro}`);
        let data = {
          userId: user._id,
          usuario: mensajes.usuario,
          mensajeUser: mensajes.mensajes,
          mensajeBot: pro,
        };
        MensajesController.addMensaje(data);
        io.emit("newMessage", data);
      } else if (mensajes.mensajes.toLowerCase().includes("orden")) {
        const orden = await orderApi.getOrder(user._id);

        let order = [];
        let items = JSON.stringify(orden[orden.length - 1].items);
        let total = orden[orden.length - 1].total;
        order.push({ items: items, total: total });

        let data = {
          userId: user._id,
          usuario: mensajes.usuario,
          mensajeUser: mensajes.mensajes,
          mensajeBot: order,
        };

        MensajesController.addMensaje(data);
        io.emit("newMessage", data);
      } else if (mensajes.mensajes.toLowerCase().includes("carrito")) {
        const carrito = await carritoAPI.getCarrito(user._id);
        let cart = [];
        let productos = carrito.productos;
        cart.push({ productos: productos });
        for (let i = 0; i < carrito.length; i++) {}
        // console.log(`CARRITO: ${carrito}`)
        let data = {
          userId: user._id,
          usuario: mensajes.usuario,
          mensajeUser: mensajes.mensajes,
          mensajeBot: carrito,
        };
        console.log(`CARRITO :${cart}`);
        MensajesController.addMensaje(data);
        io.emit("newMessage", data);
      } else {
        const message = `Hola! No he podido comprender tu mensaje. Por favor ingresa una de las siguientes opciones "STOCK": Para conocer nuestro stock actual.  "ORDEN" :Para conocer la informacion de tu ultima orden "CARRITO" :Para concer el estado actual de tu carrito`;
        let data = {
          userId: user._id,
          usuario: mensajes.usuario,
          mensajeUser: mensajes.mensajes,
          mensajeBot: message,
        };
        MensajesController.addMensaje(data);
        io.emit("newMessage", data);
      }
    });
  });

  return io;
};
