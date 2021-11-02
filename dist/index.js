"use strict";

var _server = _interopRequireDefault(require("./services/server"));

var _dbMongo = require("./services/dbMongo");

var _cluster = _interopRequireDefault(require("cluster"));

var _args = require("./middleware/args");

var _os = _interopRequireDefault(require("os"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const clusterMode = _args.Argumentos;
const puerto = process.env.PORT;
(0, _dbMongo.connectToDB)(); // connectToDB().then(() =>{
//     console.log('DB MONGO CONECTADA');
//     server.listen(puerto, ()=> console.log(`Server up puerto ${puerto}`));
// });

const numCPUs = _os.default.cpus().length;

if (clusterMode && _cluster.default.isMaster) {
  //   console.log(`NUMERO DE CPUS ===> ${numCPUs}`);
  //   console.log(`PID MASTER ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    _cluster.default.fork();
  }

  _cluster.default.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} died at ${Date()}`);

    _cluster.default.fork();
  });
} else {
  _server.default.listen(puerto, () => console.log(`Servidor express escuchando en el puerto ${puerto} - PID WORKER ${process.pid}`));

  _server.default.on('error', error => console.log(`Error en el servidor: ${error}`));
}