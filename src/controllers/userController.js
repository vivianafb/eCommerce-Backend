import { carritoAPI } from '../apis/carrito';
import { UserAPI } from '../apis/user';

class User {
  
    async validateUserInput(req, res, next){
        const {username,email} = req.body;
        const user = await UserAPI.query(username, email);
        if (!user) next();
        else res.status(400).json({ msg: 'invalid username or email' });

    }
    async getUsers(req, res) {
      const data = await UserAPI.getUsers(req.params.id);
      console.log(data)
      res.json({ msg: 'GET USERS', data });
    }
  
    async addUser(req, res) {
      const newItem = await UserAPI.addUser(req.body);
      res.json({ msg: 'ADD USER', newItem });
    }
  
    async updateUser(req, res) {
      const id = req.params.id;

      const newUpdate = await UserAPI.updateUser(id,req.body);
      res.json({
          msg: "Usuario actualizado",
          data: newUpdate
      })
    }
  
    async deleteUser(req, res) {
      const id = req.params.id;

      const user = UserAPI.getUsers(id);
      const cart = carritoAPI.getCarrito(id)
      if(!user){
          return res.status(400).json({
              msg: "Usuario no encontrado"
          })
      }

       await UserAPI.deleteUser(id);
      //  console.log(cart)
      res.json({
          msg: cart
      })
    }
  }
  
  export const UserController = new User();