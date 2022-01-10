import mongoose, { Schema } from "mongoose";
import Config from "../../../config";
import { logger } from "../../../utils/logs";

const ordenesSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  items: [
    {
      producto: { type: String, required: true },
      cantidad: { type: String, required: true },
      precio: { type: String, required: true },
    },
  ],
  estado: { type: String, required: false, default: "Generado" },
  total: { type: String, required: true },
  numOrder: { type: String, required: true },
  direccion: [
    {
      _id: false,
      Comuna: { type: String,required: true },
      Pasaje: { type: String,required: true },
      NumeroCasa: { type: Number, default: null },
      CodigoPostal: { type: Number, required: true },
      Piso: { type: Number, default: null },
      Departamento: { type: Number, default: null },
    },
  ],
  time: { type: Date, default: Date.now },
});

export class ordersAtlasDAO {
  srv;
  orders;

  constructor(local) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else this.srv = Config.MONGO_ATLAS_URL;
    mongoose.connect(this.srv);
    this.orders = mongoose.model("orders", ordenesSchema);
  }

  async get(userId) {
    try {
      if (userId) {
        const result = await this.orders.find({ userId: userId });
        if (result) return result;
      } else {
        const result = await this.orders.find();
        if (result) return result;
      }
    } catch (err) {
      logger.warn("Order not found");
    }
  }

  async getById(id) {
    try {
      if (id) {
        const result = await this.orders.find({ _id: id });
        if (result) return result;
      } else {
        const result = await this.orders.find();
        if (result) return result;
      }
    } catch (err) {
      logger.warn("Order not found");
    }
  }

  async add(userId, dato, total, numOrder, direccion) {
    const order = new this.orders({
      userId,
      items: [],
      total,
      numOrder,
      direccion,
    });
    for (let i = 0; i < dato.length; i++) {
      order.items.push(dato[i]);
    }
    await order.save();

    return order;
  }

  async update(id, data) {
    return this.orders.findByIdAndUpdate(id, data);
  }
}
