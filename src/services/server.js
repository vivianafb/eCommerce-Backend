import express from "express";
import session from "express-session";
import apiRouter from "../routes/index";
import path from "path";
import * as http from "http";
import MongoStore from "connect-mongo";
import Config from "../config";
import passport from "../middleware/auth";
import { logger } from "../utils/logs";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import handlebars from "express-handlebars";
import { initWsServer } from "../services/socket";
import cookieParser from "cookie-parser";

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: Config.MONGO_ATLAS_URL,
    mongoOptions: advancedOptions,
  }),

  secret: Config.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: Config.SESSION_COOKIE_TIMEOUT_MIN * 60 * 1000,
  },
};

const app = express();
app.use(session(StoreOptions));
const server = new http.Server(app);
initWsServer(server);
const publicPath = path.resolve(__dirname, "../../public");
const layoutFolderPath = path.resolve(__dirname, "../../views/layouts");
const defaultLayerPth = path.resolve(
  __dirname,
  "../../views/layouts/index.hbs"
);
app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars({
    layoutsDir: layoutFolderPath,
    defaultLayout: defaultLayerPth,
    extname: "hbs",
  })
);
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(function (err, req, res, next) {
  logger.error(`HUBO UN ERROR ${err.message}`);
  return res.status("500").json({
    error: err.message,
  });
});
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API REST",
      description:
        "Desafio de Coderhouse el cual consiste en un BackEnd de ecommerce ",
      version: "1.0.0",
      contact: {
        name: "Viviana Fajardo",
        email: "vivianafb15@gmail.com",
        url: "https://github.com/vivianafb/eCommerce-Backend/",
      },
    },
  },
  apis: [`${path.join(__dirname, "../routes/*.js")}`],
};
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerSpec)));

app.use("/api", apiRouter);

export default server;
