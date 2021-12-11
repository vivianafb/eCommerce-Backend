import e from 'cors';
import { productsAPI } from '../apis/productos';
import { logger } from '../utils/logs';
let productos =[
    {id:1, 
        nombre:"lapiz", 
        precio:100, 
        descripcion:"color rojo",
        codigo:123456,
        foto:"https://img.freepik.com/vector-gratis/diseno-lapiz-escribiendo_1095-187.jpg?size=338&ext=jpg",
        stock:27,
        timestamp:Date.now(),
        categoria: "Utiles"
    },
    {id:2, 
        nombre:"goma", 
        precio:200, 
        descripcion:"goma de borrar",
        codigo:789123,
        foto:"https://www.libreriaservicom.cl/wp-content/uploads/2019/03/goma-de-borrar-factis-s20.jpg",
        stock:30,
        timestamp:Date.now(),
        categoria: "Utiles"}
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
        let findId = producto.find((el)=> el._id == id) 
        if (findId) {
          return res.status(404).json({
            msg: 'Producto no encontrado',
          });
        }
        next();
      }
    async getProducto(req, res){
        const { id } = req.params;
        const { nombre, precio,categoria } = req.query;
        if (id) {
            const result = await productsAPI.getProducts(id);
            // Buscar si el id que paso en el parametro existe o no
            let findId = result.find((elemento)=> elemento._id == id) 
            if (findId === undefined){
                return res.status(404).json({
                data: 'Objeto no encontrado',
            })
            }else{
                return res.json({
                    data: result
                });
            }

    
        }
        const query = {};

        if (nombre) query.nombre = nombre;

        if (precio) query.precio = precio;

        if (categoria) query.categoria = categoria;

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
        try{
            
            const newItem = await productsAPI.addProduct(req.body)
            res.json({
                msg: "Productos agregado con exito",
                data: newItem
            })
        }catch(err){
        return res.status(404).json({
            err: err.message
        })
        }
    
    }
    
    async updateProducto(req, res){
    try{
        const id = req.params.id;
        const result = await productsAPI.getProducts(id);
        let findId = result.find((elemento)=> elemento._id == id) 
        if (findId === undefined){
            return res.status(404).json({
            err: 'ID de producto no encontrado',
        })
        }else{
        const newUpdate = await productsAPI.updateProduct(id,req.body);
            console.log(newUpdate)
            res.json({
                msg: "Actualizando los productos",
                data: newUpdate
            })
    }
    }catch(err){
        return res.status(404).json({
            err: err.message
        })
    }}

    async deleteProducto(req, res){
        try{
            const id = req.params.id;
            const result = await productsAPI.getProducts(id);
            let findId = result.find((elemento)=> elemento._id == id) 
            if (findId === undefined){
                return res.status(404).json({
                    err: 'ID de producto no encontrado',
                })
            }else{
                const productos = await productsAPI.deleteProduct(id) ;
    
                res.json({
                    msg: "Producto eliminado"
                })
            }
            
        } catch(err){
        return res.status(404).json({
            err: err.message
        })}
        
    }
}
export const productoController = new Producto();