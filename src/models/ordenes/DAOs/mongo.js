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
  time: { type: Date, default: Date.now },
});

// ordenesSchema.pre('save', function (next) {
//   var data = this;
//   var order = mongoose.model('orders')
//   order.find({id: data._id}, function (err, docs) {
//       if (!docs.length){
//           next();
//       }else{
//           logger.warn(`La orden ya existe ${data}`);
//           next(new Error(`La orden ya existe! Orden: ${data._id}`));
//       }
//   });
// }) ;
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
  async add(userId, dato, total, numOrder) {
    const order = new this.orders({ userId, items: [], total, numOrder });
    for (let i = 0; i < dato.length; i++) {
      order.items.push(dato[i]);
    }
    //  console.log(`Order id: ${order._id}`)
    await order.save();

    return order;
  }

  async update(id, data) {
    return this.orders.findByIdAndUpdate(id, data);
  }

  //   async delete(id) {
  //     await this.user.findByIdAndDelete(id);
  //   }

  //   async query(query) {
  //     const result = await this.user.find(query);
  //     // console.log(result);

  //     return result[0];
  //   }

  //   async validateUserPassword(username,password) {
  //     const users = await this.user.findOne({ username });
  //     if (!users) return false;
  //     const compare = await bcrypt.compare(password, users.password);
  //     if (!compare) return false;
  //     return true;
  //   }

  //   async validateConfirmPassword(password,confirmPassword) {
  //     if(!(password === confirmPassword)){
  //        return false
  //     }
  //     return true;

  //   }
}
