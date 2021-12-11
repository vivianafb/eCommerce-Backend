import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Config from '../../../config'
import { logger } from '../../../utils/logs';
import { boolean } from 'joi';

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone:{type:Number, required:true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: {type:Boolean, required:false,default:false}
   
});

UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  this.password = hash;
  next();
});
UserSchema.pre('save', function (next) {
  var data = this;
 
  var usuario = mongoose.model('users')
  usuario.find({email: data.email,username: data.username}, function (err, docs) {
      if (!docs.length){
        
          next();
      }else{                
          logger.warn('El usuario ya existe ',data.email);
          next(new Error(`Esta cuenta de email ya ha sido registrada: ${data.email}`));

      }
  });
});
export class UsuarioAtlasDAO  {
    srv;
    user;

    constructor(local) {
        if (local)
          this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
        else
          this.srv = Config.MONGO_ATLAS_URL;
        mongoose.connect(this.srv);
        this.user = mongoose.model('users', UserSchema);
      }

      async get(id) {
        let output = [];
        try {
          if (id) {
            const document = await this.user.findById(id);
            if (document) output.push(document);
          } else {
            output = await this.user.find();
          }
          return output;
        } catch (err) {
          return err.message;
        }
      }

      async add(data) {
        const newUser = new this.user(data);
        await newUser.save();
    
        return newUser;
      }

      async update(id, data) {
        return this.user.findByIdAndUpdate(id, data);
      }

      async delete(id) {
        await this.user.findByIdAndDelete(id);
      }

      async query(query) {
        const result = await this.user.find(query);
        // console.log(result);

        return result[0];
      }

      async validateUserPassword(username,password) {
        const users = await this.user.findOne({ username });
        if (!users) return false;
        const compare = await bcrypt.compare(password, users.password);
        if (!compare) return false;
        return true;
      }

      async validateConfirmPassword(password,confirmPassword) {
        if(!(password === confirmPassword)){
           return false
        }
        return true;
        
      }
}
  
  