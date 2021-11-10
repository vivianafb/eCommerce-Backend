// import mongoose from 'mongoose';
// import Config from '../config';


// export const connectToDB = async () => {
//   try {
//     const srv = Config.MONGO_ATLAS_URL
//     await mongoose.connect(srv, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//   } catch (error) {
//     console.log(`ERROR => ${error}`);
//     return error;
//   }
// };