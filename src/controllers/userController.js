import { carritoAPI } from "../apis/carrito";
import { UserAPI } from "../apis/user";
import { logger } from "../utils/logs";

class User {
  async validateUserInput(req, res, next) {
    const { username, email } = req.body;
    const user = await UserAPI.query(username, email);
    if (!user) next();
    else res.status(400).json({ msg: "invalid username or email" });
  }
  async getUsers(req, res) {
    const { id } = req.params;
    if (id) {
      const data = await UserAPI.getUsers(id);
      let findId = data.find((elemento) => elemento._id == id);
      if (findId === undefined) {
        return res.status(404).json({
          err: "Usuario no encontrado",
        });
      } else {
        return res.json({
          user: data,
        });
      }
    }
    res.json({
      data: await UserAPI.getUsers(),
    });
  }

  async addUser(req, res) {
    try {
      const newItem = await UserAPI.addUser(req.body);
      res.json({
        msg: "Usuario agregado con exito",
        newItem,
      });
    } catch (err) {
      return res.status(404).json({
        err: err.message,
      });
    }
  }

  async updateUser(req, res) {
    try {
      const id = req.params.id;
      const result = await UserAPI.getUsers(id);
      let findId = result.find((elemento) => elemento._id == id);
      if (findId === undefined) {
        return res.status(404).json({
          err: "ID de usuario no encontrado",
        });
      } else {
        const newUpdate = await UserAPI.updateUser(id, req.body);
        res.json({
          msg: "Usuario actualizado",
          data: newUpdate,
        });
      }
    } catch (err) {
      return res.status(404).json({
        err: err.message,
      });
    }
  }

  async deleteUser(req, res) {
    const id = req.params.id;

    const user = UserAPI.getUsers(id);
    const cart = carritoAPI.getCarrito(id);
    if (!user) {
      return res.status(400).json({
        msg: "Usuario no encontrado",
      });
    }

    await UserAPI.deleteUser(id);
    //  console.log(cart)
    res.json({
      msg: cart,
    });
  }
}

export const UserController = new User();
