import server from "./services/server";

import cluster from "cluster";
import { Argumentos } from "./middleware/args";
import os from "os";
import { logger } from "./utils/logs";

const clusterMode = Argumentos;
const puerto = process.env.PORT;

const numCPUs = os.cpus().length;
if (clusterMode && cluster.isMaster) {
  logger.info(`NUMERO DE CPUS ===> ${numCPUs}`);
  logger.info(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    logger.warn(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {
  server.listen(puerto, () =>
    logger.info(
      `Servidor express escuchando en el puerto ${puerto} - PID WORKER ${process.pid}`
    )
  );
  server.on("error", (error) => logger.warn(`Error en el servidor: ${error}`));
}
