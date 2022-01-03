import fs from "fs";

export class CarritoFSDAO {
  carrito = [];
  nombreArchivo;

  constructor(fileName) {
    const mockData = [
      {
        id: 1,
        createdAt: 1632412309156,
        producto_id: 1,
      },
      {
        id: 2,
        createdAt: 1632412309156,
        producto_id: 2,
      },
    ];
    this.nombreArchivo = fileName;
    this.carrito = mockData;
    if (!mockData) this.guardar();
  }

  async leer(archivo) {
    this.carrito = JSON.parse(await fs.promises.readFile(archivo, "utf-8"));
  }

  async guardar() {
    await fs.promises.writeFile(
      this.nombreArchivo,
      JSON.stringify(this.carrito, null, "\t")
    );
  }

  async findIndex(id) {
    await this.leer(this.nombreArchivo);
    return this.carrito.findIndex((aCarrito) => aCarrito.id == id);
  }

  async find(id) {
    await this.leer(this.nombreArchivo);

    return this.carrito.find((aCarrito) => aCarrito.id === id);
  }

  async get(id) {
    await this.leer(this.nombreArchivo);

    if (id) {
      return this.carrito.filter((aCarrito) => aCarrito.id == id);
    }
    return this.carrito;
  }

  async add(data) {
    await this.leer(this.nombreArchivo);
    const newItem = {
      id: this.carrito.length + 1,
      createdAt: data.createdAt,
      producto_id: data.producto_id,
    };

    this.carrito.push(newItem);
    await this.guardar();
    console.log(newItem);
    return newItem;
  }

  async delete(id) {
    await this.leer(this.nombreArchivo);

    const index = await this.findIndex(id);
    this.carrito.splice(index, 1);
    await this.guardar();
  }

  async query(options) {
    await this.leer(this.nombreArchivo);
    // type Conditions = (aProduct) => boolean;
    const query = [];

    if (options.nombre)
      query.push((aCarrito) => aCarrito.nombre == options.nombre);

    if (options.precio)
      query.push((aCarrito) => aCarrito.precio == options.precio);

    return this.carrito.filter((aCarrito) => query.every((x) => x(aCarrito)));
  }
}
