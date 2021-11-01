import mongoose from 'mongoose';
import Config from '../config';


export const connectToDB = async () => {
  try {
    const srv = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;
    await mongoose.connect(srv, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};