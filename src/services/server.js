import express from 'express';
import session from 'express-session'
import apiRouter from '../routes/index'
import path from 'path';
import * as http from 'http';
import MongoStore from 'connect-mongo';
import config from '../config';
import passport from '../middleware/auth';
const app = express();

const publicPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicPath));
app.use(express.json());
const server = new http.Server(app);

app.use(express.urlencoded({ extended: true }));

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const StoreOptions = {
    store: MongoStore.create({
      mongoUrl: config.MONGO_ATLAS_URL,
      mongoOptions: advancedOptions,
    }),
  
    secret: 'cat',
    resave: false,
    saveUninitialized: true,
  };
app.use(session(StoreOptions));

app.use(function(err,req,res,next){
    return res.status('500').json({
        msg:'There was an unexpected error',
        error: err.message,
    })
});

app.use(passport.initialize());
app.use(passport.session());
app.use('/api',apiRouter);
app.get('/', (req, res) => {
  console.log('Resolving / endpoint');
  res.json({
    pid: process.pid,
    msg: `HOLAaaaa`,
  });
});
export default server;
