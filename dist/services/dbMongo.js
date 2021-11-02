"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectToDB = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const connectToDB = async () => {
  try {
    const srv = `mongodb+srv://${_config.default.MONGO_ATLAS_USER}:${_config.default.MONGO_ATLAS_PASSWORD}@${_config.default.MONGO_ATLAS_CLUSTER}/${_config.default.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;
    await _mongoose.default.connect(srv, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};

exports.connectToDB = connectToDB;