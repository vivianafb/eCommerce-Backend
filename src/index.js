import Server from './services/server';
import Config from './config';
import { connectToDB } from './services/dbMongo';

const puerto = Config.PORT || 8080;

connectToDB().then(() =>{
    console.log('DB MONGO CONECTADA');
    Server.listen(puerto, ()=> console.log(`Server up puerto ${puerto}`));
});
