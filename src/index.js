import server from './services/server';
import { connectToDB } from './services/dbMongo';
import cluster from 'cluster';
import { Argumentos } from './middleware/args';
import os from 'os';
const clusterMode = Argumentos;
const puerto = process.env.PORT || 8080;
connectToDB();
// connectToDB().then(() =>{
//     console.log('DB MONGO CONECTADA');
//     server.listen(puerto, ()=> console.log(`Server up puerto ${puerto}`));
// });

const numCPUs = os.cpus().length;
if (clusterMode && cluster.isMaster) {
//   console.log(`NUMERO DE CPUS ===> ${numCPUs}`);
//   console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {
  server.listen(puerto, () =>
    console.log(
      `Servidor express escuchando en el puerto ${puerto} - PID WORKER ${process.pid}`
    )
  );
  server.on('error', error => console.log(`Error en el servidor: ${error}`));
}
