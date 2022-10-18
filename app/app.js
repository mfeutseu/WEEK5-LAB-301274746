// Third Party Modules
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";

// ES Modules fix for _dirname
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import { lookup } from "dns";
const _dirname = dirname(fileURLToPath(import.meta.url));

// Import Mongoose Module
import mongoose from "mongoose";

// Configuration Module
import { MongoURI, Secret } from "../config/config.js";

// Import Router
import indexRouter from './routes/index.routes.server.js' 
import movieRouter from './routes/movies.route.server.js';


// intanciate app-server
const app = express();

//Complete the DB Configuration
mongoose.connect(MongoURI);
const db = mongoose.connection;

//Listen for connection success or error
db.on('open', () => console.log("Connection to MongoDB"));
db.on('erro', () => console.log("Mongo connection Error"));

// setup viewEngine EJS
app.set('views', path.join(_dirname, '/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extend: false}));
app.use(cookieParser());
app.use(express.static(path.join(_dirname, '../public')));
app.use(session({
    secret: Secret,
    saveUninitialized: false,
    resave: false
}))

// use Routes 
app.use('/', indexRouter);
app.use('/', movieRouter);

// //run app
// app.listen(3000);

// console.log('Server running at http://localhost:3000');

export default app;