
 import { productsAPI } from '../apis/productos';
let productos =[
    {id:1, 
        nombre:"lapiz", 
        precio:100, 
        descripcion:"color rojo",
        codigo:123456,
        foto:"https://img.freepik.com/vector-gratis/diseno-lapiz-escribiendo_1095-187.jpg?size=338&ext=jpg",
        stock:27,
        timestamp:Date.now()},
    {id:2, 
        nombre:"goma", 
        precio:200, 
        descripcion:"goma de borrar",
        codigo:789123,
        foto:"https://www.libreriaservicom.cl/wp-content/uploads/2019/03/goma-de-borrar-factis-s20.jpg",
        stock:30,
        timestamp:Date.now()}
  ]

class Producto{

    validacion(req, res, next){
        const {nombre,precio,descripcion,codigo,foto,stock} = req.body;
        if(!nombre || !precio || !descripcion || !codigo || !foto || !stock ||
             typeof nombre !== 'string' || 
             typeof descripcion !== 'string' ||
             typeof foto !== 'string' ||
             isNaN(precio) ||  isNaN(codigo) ||  isNaN(stock))
            return res.status(400).json({
                msg: "Campos del body invalidos"
            })
        next();

    }

    async checkProductExists(req, res , next) {
        const id = req.params.id;
        const producto = await productsAPI.getProducts(id);
    
        if (!producto) {
          return res.status(404).json({
            msg: 'producto not found',
          });
        }
        next();
      }
    async getProducto(req, res){
        const { id } = req.params;
        const { nombre, precio } = req.query;
        if (id) {
        const result = await productsAPI.getProducts(id);
        if (!result)
            return res.status(404).json({
            data: 'Objeto no encontrado',
            });

        return res.json({
            data: result
        });
        }
        const query = {};

        if (nombre) query.nombre = nombre;

        if (precio) query.precio = precio;

        if (Object.keys(query).length) {
        return res.json({
            data: await productsAPI.query(query),
        });
        }

        res.json({
        data: await productsAPI.getProducts(),
        });
    }
    async addProducto(req, res){      
        const newItem = await productsAPI.addProduct(req.body)
        res.json({
            msg: "Productos agregado con exito",
            data: newItem
        })
    }
    async updateProducto(req, res){
        const id = req.params.id;

        const newUpdate = await productsAPI.updateProduct(id,req.body);
        console.log(newUpdate)
        res.json({
            msg: "Actualizando los productos",
            data: newUpdate
        })
    }

    async deleteProducto(req, res){
        const id = req.params.id;

        const producto = productsAPI.getProducts(id);
        if(!producto){
            return res.status(400).json({
                msg: "Producto no encontrado"
            })
        }

        productos = await productsAPI.deleteProduct(id) ;

        res.json({
            msg: "Producto eliminado"
        })
    }
}
export const productoController = new Producto();