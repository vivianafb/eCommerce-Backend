export class CarritoMemDAO{
    carrito = [];
  
    constructor() {
      const mockData = [
        {
          id: 1,
          createdAt: 1632412309156,
          producto_id:1
        },
        {
          id: 2,
          createdAt: 1632412309156,
          producto_id: 2
        }
      ];
  
      mockData.forEach((aMock) => this.carrito.push(aMock));
    }
  
    findIndex(id) {
      return this.carrito.findIndex((aCarrito) => aCarrito.id == id);
    }
  
    find(id) {
      return this.carrito.find((aCarrito) => aCarrito.id == id);
    }
  
    async get(id) {
      if (id) {
        return this.carrito.filter((aCarrito) => aCarrito.id == id);
      }

      return this.carrito;
    }
  
    async add(data) {
  
      const newItem = {
        id: (this.carrito.length + 1),
        createdAt: data.createdAt,
        producto_id: data.producto_id
      }
  
      this.carrito.push(newItem);
      return newItem;
    }
  
    // async update(id, newCarritoData) {
    //   const index = this.findIndex(id);
    //   const oldCarrito = this.carrito[index];
  
    //   const updatedCarrito= { ...oldCarrito, ...newCarritoData };
    //   this.carrito.splice(index, 1, updatedCarrito);
    //   return updatedCarrito;
    // }
  
    // async delete(id) {
    //   const index = this.findIndex(id);
    //   this.carrito.splice(index, 1);
    // }
  
    async query(options){
    //   type Conditions = (aProduct: ProductI) => boolean;
      const query = [];
  
      if (options.nombre)
        query.push((aProduct) => aProduct.nombre == options.nombre);
  
      if (options.precio)
        query.push((aProduct) => aProduct.precio == options.precio);
  
      return this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
    }
}