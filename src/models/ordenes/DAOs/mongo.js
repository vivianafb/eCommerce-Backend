import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import Config from '../../../config'
import { logger } from '../../../utils/logs';

const ordenesSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    items: [{
        _id:{ type:Schema.Types.ObjectId,required: true,unique: true },
        cantidad:{ type: String,required: true },
        precio:{ type: String,required: true },
    }],
    estado: {type:String, required:false,default:"Generado"},
    total:{type:String, required:false}
});


export class ordersAtlasDAO  {
    srv;
    orders;

    constructor(local) {
        if (local)
          this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
        else
          this.srv = Config.MONGO_ATLAS_URL;
        mongoose.connect(this.srv);
        this.orders = mongoose.model('orders', ordenesSchema);
      }

      async get(userId) {
        try{
         const result = await this.orders.findOne({userId});
       
         if (result) return result;
        }catch(err){
         logger.warn('Order not found');
        }
      
      }
    //   async add(data) {
    //     const newUser = new this.user(data);
    //     await newUser.save();
    
    //     return newUser;
    //   }

    //   async update(id, data) {
    //     return this.user.findByIdAndUpdate(id, data);
    //   }

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
  
  