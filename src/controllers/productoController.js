import { productsAPI } from "../apis/productos";
const cloudinary = require("../config/cloudinary");

// let productos = [
//   {
//     id: 1,
//     nombre: "lapiz",
//     precio: 100,
//     descripcion: "color rojo",
//     codigo: 123456,
//     foto: "https://img.freepik.com/vector-gratis/diseno-lapiz-escribiendo_1095-187.jpg?size=338&ext=jpg",
//     stock: 27,
//     timestamp: Date.now(),
//     categoria: "Utiles",
//   },
//   {
//     id: 2,
//     nombre: "goma",
//     precio: 200,
//     descripcion: "goma de borrar",
//     codigo: 789123,
//     foto: "https://www.libreriaservicom.cl/wp-content/uploads/2019/03/goma-de-borrar-factis-s20.jpg",
//     stock: 30,
//     timestamp: Date.now(),
//     categoria: "Utiles",
//   },
// ];

class Producto {
  validacion(req, res, next) {
    const { nombre, precio, descripcion, codigo, foto, stock } = req.body;
    if (
      !nombre ||
      !precio ||
      !descripcion ||
      !codigo ||
      !foto ||
      !stock ||
      typeof nombre !== "string" ||
      typeof descripcion !== "string" ||
      typeof foto !== "string" ||
      isNaN(precio) ||
      isNaN(codigo) ||
      isNaN(stock)
    )
      return res.status(400).json({
        msg: "Campos del body invalidos",
      });
    next();
  }

  async checkProductExists(req, res, next) {
    const id = req.params.id;
    const producto = await productsAPI.getProducts(id);
    let findId = producto.find((el) => el._id == id);
    if (findId) {
      return res.status(404).json({
        msg: "Producto no encontrado",
      });
    }
    next();
  }

  async getProducto(req, res) {
    const { id } = req.params;
    const { nombre, precio } = req.query;
    if (id) {
      const result = await productsAPI.getProducts(id);
      //  console.log(result)
      // Buscar si el id del el parametro existe o no
      let findId = result.find((elemento) => elemento._id == id);
      if (findId === undefined) {
        return res.status(404).json({
          data: "Objeto no encontrado",
        });
      } else {
        return res.json({
          data: result,
        });
      }
    }

    const query = {};

    if (nombre) query.nombre = nombre;

    if (precio) query.precio = precio;

    // if (categoria) query.categoria = categoria;

    if (Object.keys(query).length) {
      return res.json({
        data: await productsAPI.query(query),
      });
    }

    res.json({
      data: await productsAPI.getProducts(),
    });
  }

  async getCategoria(req, res) {
    const { categoria } = req.params;
    if (categoria) {
      const result = await productsAPI.getCategoria(categoria);
      // console.log(result)
      if (!result) {
        return res.status(404).json({
          data: "Objeto no encontrado",
        });
      } else {
        return res.json({
          data: result[0],
        });
      }
    }
  }

  async addProducto(req, res) {
    console.log(req.body);
    try {
      console.log(req.body);
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(result);
      let prod = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        foto: result.secure_url,
        stock: req.body.stock,
        categoria: req.body.categoria,
        cloudinary_id: result.public_id,
      };
      const newItem = await productsAPI.addProduct(prod);
      res.json({
        msg: "Productos agregado con exito",
        data: newItem,
      });
    } catch (err) {
      return res.status(404).json({
        err: err.message,
      });
    }
  }

  async updateProducto(req, res) {
    try {
      const id = req.params.id;
      const result = await productsAPI.getProducts(id);
      let findId = result.find((elemento) => elemento._id == id);
      if (findId === undefined) {
        return res.status(404).json({
          err: "ID de producto no encontrado",
        });
      } else {
        if(req.file){
          const pro = await productsAPI.getProducts(req.params.id);
          await cloudinary.uploader.destroy(pro[0].cloudinary_id);
          const result = await cloudinary.uploader.upload(req.file.path);
          let prod = {
            nombre: req.body.nombre || pro.nombre,
            precio: req.body.precio || pro.precio,
            descripcion: req.body.descripcion || pro.descripcion,
            codigo: req.body.codigo || pro.codigo,
            foto: pro.foto || result.secure_url ,
            stock: req.body.stock || pro.stock,
            categoria: req.body.categoria | pro.categoria,
            cloudinary_id: result.public_id || pro.cloudinary_id,
          };
  
          const newUpdate = await productsAPI.updateProduct(id, prod);
  
          console.log(result);
          res.json({
            msg: "Actualizando los productos",
            data: newUpdate,
          });
        }else{
          const pro = await productsAPI.getProducts(req.params.id);
          let prod = {
            nombre: req.body.nombre || pro.nombre,
            precio: req.body.precio || pro.precio,
            descripcion: req.body.descripcion || pro.descripcion,
            codigo: req.body.codigo || pro.codigo,
            foto: pro.foto,
            stock: req.body.stock || pro.stock,
            categoria: req.body.categoria | pro.categoria,
            cloudinary_id: pro.cloudinary_id,
          };
  
          await productsAPI.updateProduct(id, prod);
          const updatedProduct = await productsAPI.getProducts(req.params.id);
          console.log(result);
          res.json({
            msg: "Actualizando los productos",
            data: updatedProduct,
          });

        }
        
      }
    } catch (err) {
      return res.status(404).json({
        error: err.message,
      });
    }
  }

  async deleteProducto(req, res) {
    try {
      const id = req.params.id;
      const result = await productsAPI.getProducts(id);
      let findId = result.find((elemento) => elemento._id == id);
      if (findId === undefined) {
        return res.status(404).json({
          err: "ID de producto no encontrado",
        });
      } else {
        const id = req.params.id;
        const result = await productsAPI.getProducts(id);
        await productsAPI.deleteProduct(id);
        await cloudinary.uploader.destroy(result[0].cloudinary_id);
        res.json({
          msg: "Producto eliminado",
        });
      }
    } catch (err) {
      return res.status(404).json({
        err: err.message,
      });
    }
  }
}
export const productoController = new Producto();
