import Config from '../config/index';
import {carritoAPI} from '../apis/carrito';
import {productsAPI} from '../apis/productos';
import { Gmail } from '../services/gmail';
import {SmsService} from '../services/twilio'
import { logger } from '../utils/logs';
let carrito =[
    {
        id:1, 
        timestamp:Date.now(),
        producto:{
            id:1, 
            nombre:"lapiz", 
            precio:100, 
            descripcion:'color rojo',
            codigo:123456,
            foto:'https://img.freepik.com/vector-gratis/diseno-lapiz-escribiendo_1095-187.jpg?size=338&ext=jpg',
            stock:27,
            timestamp:Date.now()
        }
    },
    {
        id:2, 
        timestamp:Date.now(),
        producto:{
            id:2, 
            nombre:"goma", 
            precio:200, 
            descripcion:'goma de borrar',
            codigo:789123,
            foto:'https://www.libreriaservicom.cl/wp-content/uploads/2019/03/goma-de-borrar-factis-s20.jpg',
            stock:30,
            timestamp:Date.now()
        }
    },
]
const tableName ='carrito'
class Carrito{
    async validacion(req, res, next){
        const {createdAt,producto_id} = req.body;
        if(!createdAt || !producto_id )
            return res.status(400).json({
                msg: "Campos del body invalidos"
            })
        next();

    }

    async checkCarritoExists(req, res , next) {
      try{
        const {id}= req.params;
        const carrito = await carritoAPI.getCarrito(id);
        // console.log(carrito.userId)
        if (!carrito) {
          return res.status(404).json({
            msg: `Carrito no encontrado, el id: ${id} no existe`,
          });
        }else{
          return res.json({
            data: carrito
          }) 
        }
        
      }catch(err){
        logger.warn(err.message)
        return res.status(404).json({
          msg: err
        })
      }
    }
    

    async getCartByUser(req, res) {
        const user = req.user;
        const cart = await carritoAPI.getCarrito(user[0]._id);
        return res.json(cart); 
    }

    async addProduct(req, res) {
        const user = req.user;
        const cart = await carritoAPI.getCarrito(user[0]._id);
    
        const { productId, productAmount } = req.body;
    
        if (!productId || !productAmount)
          return res.status(400).json({ msg: 'Parametros del body invalidos' });
    
        const product = await productsAPI.getProducts(productId);
    
        if (!product.length)
          return res.status(400).json({ msg: `Producto no encontrado, id: ${productId} no existe`});
    
        if (parseInt(productAmount) < 0)
          return res.status(400).json({ msg: 'Cantidad de productos invalida' });

        if(parseInt(productAmount) > product[0].stock)
        return res.status(400).json({ msg: `La cantidad de producto supera el stock, el stock actual es: ${product[0].stock}` });

        if(product[0].stock === 0)
        return res.status(400).json({ msg: `No queda stock, el stock actual es: ${product[0].stock}` });

        const updatedCart = await carritoAPI.addProduct(
          cart._id,
          productId,
          parseInt(productAmount)
        );
        let totalstock = product[0].stock - productAmount
        console.log(totalstock)
        let stock =product[0].stock
        let updatedProduct = await productsAPI.updateProduct(
          productId,
          {stock:totalstock} 
        );
        console.log(updatedProduct)
        res.json({ msg: 'Producto agregado con exito', cart: updatedCart });
      }
    
      async deleteProduct(req, res) {
        const user = req.user;
        const cart = await carritoAPI.getCarrito(user._id);
    
        const { productId, productAmount } = req.body;
    
        if (!productId || !productAmount)
          return res.status(400).json({ msg: 'Invalid body parameters' });
    
        const product = await productsAPI.getProducts(productId);
    
        if (!product.length)
          return res.status(400).json({ msg: 'product not found' });
    
        if (parseInt(productAmount) < 0)
          return res.status(400).json({ msg: 'Invalid amount' });
    
        const updatedCart = await carritoAPI.deleteProudct(
          cart._id,
          productId,
          parseInt(productAmount)
        );
        res.json({ msg: 'Product deleted', cart: updatedCart });
      }

      async comprarProduct(req, res) {
        const user = req.user;
        const cart = await carritoAPI.getCarrito(user[0]._id);
        const productosCarrito = cart.productos;

        let content = '';
        let contentWhatsApp= '';
        for(let i = 0; i < productosCarrito.length; i++ ){
           const productId =cart.productos[i]._id;

           const productAmount =cart.productos[i].amount;
           const dato = await productsAPI.getProducts(productId)
          content += `<p>${dato}</p>`;
          contentWhatsApp += `${dato}`;

        }

        const gmailService = new Gmail('gmail');
        gmailService.sendEmail(Config.GMAIL_EMAIL, 
          `Nuevo pedido del usuario: ${user[0].username}, email: ${user[0].email}`,
        content);
        
        SmsService.sendMessage(
          Config.TWILIO_WHATSAPP,
          `Nuevo pedido del usuario: ${user[0].username}, email: ${user[0].email}
          Productos: ${contentWhatsApp}`,
          'whatsapp',
          
        );
        // const updatedCart = await carritoAPI.deleteAll(cart._id,productosCarrito);
        res.json({ msg: 'Compra exitosa' });
    }

    async deleteCarrito(req,res){
      const user = req.user;
      const cart = await carritoAPI.getCarrito(user._id);
      const updatedCart = await carritoAPI.deleteCarrito(cart._id);
    
      res.json({ msg: 'Carrito eliminado ya que el user se elimino',data:updatedCart });
    }
}
export const carritoController = new Carrito();