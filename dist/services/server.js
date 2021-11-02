"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _index = _interopRequireDefault(require("../routes/index"));

var _path = _interopRequireDefault(require("path"));

var http = _interopRequireWildcard(require("http"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _config = _interopRequireDefault(require("../config"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();

const publicPath = _path.default.resolve(__dirname, '../../public');

app.use(_express.default.static(publicPath));
app.use(_express.default.json());
const server = new http.Server(app);
app.use(_express.default.urlencoded({
  extended: true
}));
const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
const StoreOptions = {
  store: _connectMongo.default.create({
    mongoUrl: _config.default.MONGO_ATLAS_URL,
    mongoOptions: advancedOptions
  }),
  secret: 'cat',
  resave: false,
  saveUninitialized: true
};
app.use((0, _expressSession.default)(StoreOptions));
app.use(function (err, req, res, next) {
  return res.status('500').json({
    msg: 'There was an unexpected error',
    error: err.message
  });
});
app.use(_auth.default.initialize());
app.use(_auth.default.session());
app.use('/api', _index.default);
app.get('/', (req, res) => {
  console.log('Resolving / endpoint');
  res.json({
    pid: process.pid,
    msg: `HOLAaaaa`
  });
});
var _default = server;
exports.default = _default;