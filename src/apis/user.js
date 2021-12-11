import { userFactoryDAO } from '../models/users/users.factory'
import { TipoPersistencia } from '../models/users/users.factory'
import { carritoAPI } from './carrito';

/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = TipoPersistencia.MongoAtlas;

class User {
     users;
  
    constructor() {
      this.users = userFactoryDAO.get(tipo);
    }
  
    async getUsers(id) {
      if (id) return this.users.get(id);
  
      return this.users.get();
    }
  
    async addUser(productData) {
      const newUser = await this.users.add(productData);
      await carritoAPI.createCarrito(newUser._id);
      return newUser;
    }
  
    async updateUser(id, userData) {
      const updatedUser = await this.users.update(id, userData);
      return updatedUser;
    }
  
    async deleteUser(id) {
      await this.users.delete(id);
      await carritoAPI.carrito.deleteCarrito()
      //Borrar carrito tambien
    }
  
    async query(username, email) {
      const query = {
        $or: [] ,
      };
  
      if (username) query.$or.push({ username });
      if (email) query.$or.push({ email });
      
      const user = await this.users.query(query)
      // console.log(user);
      return user;
    }
  
    async ValidatePassword(username, password) {
      return this.users.validateUserPassword(username, password);
    }

    async ValidateSecondPassword(password, confirmPassword) {
      return this.users.validateConfirmPassword(password, confirmPassword);
    }
  }
  
  export const UserAPI = new User();