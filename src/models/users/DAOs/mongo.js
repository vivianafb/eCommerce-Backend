import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Config from '../../../config'


const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true,},
    email: {type: String, required: true, unique: true,},
    password: {type: String, required: true,},
    firstName: {type: String, required: true,},
    lastName: {type: String, required: true,},
    adress:{type: String, required:true},
    age:{type: Number, required:true},
    phone:{type:Number, required:true},
    photo:{type:String, required:true}
});

UserSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    this.password = hash;
    next();
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
          return output;
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
        return result[0];
      }

      async validateUserPassword(username,password) {
        const users = await this.user.findOne({ username });
        if (!users) return false;
        const compare = await bcrypt.compare(password, users.password);
        if (!compare) return false;
        return true;
      }
}
  
  