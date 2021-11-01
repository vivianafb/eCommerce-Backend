import {carritoAPI} from '../apis/carrito'
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
        const id = req.params.id;
        const carrito = await carritoAPI.getCarrito(tableName,id);
    
        if (!carrito) {
          return res.status(404).json({
            msg: 'carrito not found',
          });
        }
        next();
      }
      
      async getCarrito(req, res){
        const id = req.params.id;
        if (id) {
            const result = await carritoAPI.getCarrito(id);
            console.log(result)
            if (!result)
                return res.status(404).json({
                data: 'Objeto no encontrado',
                });

            return res.json({
                data: result
            });
        }
        res.json({
            data: await carritoAPI.getCarrito(),
            });
    }

    async addCarrito(req, res){      
        const newItem = await carritoAPI.addCarrito(req.body)
        res.json({
            msg: "Carrito agregado con exito",
            data: newItem
        })
    }
    
    async deleteCarrito(req, res){
        const id = req.params.id;
        
            await carritoAPI.deleteCarrito(id);
            res.json({
            msg: 'carrito borrado',
            });
        
    }
}
export const carritoController = new Carrito();