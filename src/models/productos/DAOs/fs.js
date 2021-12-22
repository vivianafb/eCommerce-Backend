import fs from "fs";

export class ProductosFSDAO {
  productos = [];
  nombreArchivo;

  constructor(fileName) {
    const mockData = [
      {
        id: 1,
        nombre: "lapiz",
        precio: 100,
        descripcion: "color rojo",
        codigo: 123456,
        foto: "https://img.freepik.com/vector-gratis/diseno-lapiz-escribiendo_1095-187.jpg?size=338&ext=jpg",
        stock: 27,
        timestamp: Date.now(),
      },
      {
        id: 2,
        nombre: "goma",
        precio: 200,
        descripcion: "goma de borrar",
        codigo: 789123,
        foto: "https://www.libreriaservicom.cl/wp-content/uploads/2019/03/goma-de-borrar-factis-s20.jpg",
        stock: 30,
        timestamp: Date.now(),
      },
    ];
    this.nombreArchivo = fileName;
    this.productos = mockData;
  }

  async leer(archivo) {
    this.productos = JSON.parse(await fs.promises.readFile(archivo, "utf-8"));
  }

  async guardar() {
    await fs.promises.writeFile(
      this.nombreArchivo,
      JSON.stringify(this.productos, null, "\t")
    );
  }

  async findIndex(id) {
    await this.leer(this.nombreArchivo);
    return this.productos.findIndex((aProduct) => aProduct.id == id);
  }

  async find(id) {
    await this.leer(this.nombreArchivo);

    return this.productos.find((aProduct) => aProduct.id === id);
  }

  async get(id) {
    await this.leer(this.nombreArchivo);

    if (id) {
      return this.productos.filter((aProduct) => aProduct.id == id);
    }
    return this.productos;
  }

  async add(data) {
    await this.leer(this.nombreArchivo);

    const newItem = {
      id: this.productos.length + 1,
      nombre: data.nombre,
      precio: data.precio,
      descripcion: data.descripcion,
      codigo: data.codigo,
      foto: data.foto,
      stock: data.stock,
    };

    this.productos.push(newItem);
    await this.guardar();
    return newItem;
  }

  async update(id, newProductData) {
    await this.leer(this.nombreArchivo);

    const index = await this.findIndex(id);
    const oldProduct = this.productos[index];

    const updatedProduct = { ...oldProduct, ...newProductData };
    this.productos.splice(index, 1, updatedProduct);

    await this.guardar();

    return updatedProduct;
  }

  async delete(id) {
    await this.leer(this.nombreArchivo);

    const index = await this.findIndex(id);
    this.productos.splice(index, 1);
    await this.guardar();
  }

  async query(options) {
    await this.leer(this.nombreArchivo);
    // type Conditions = (aProduct) => boolean;
    const query = [];

    if (options.nombre)
      query.push((aProduct) => aProduct.nombre == options.nombre);

    if (options.precio)
      query.push((aProduct) => aProduct.precio == options.precio);

    return this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
  }
}
