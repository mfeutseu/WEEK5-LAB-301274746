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

// Auth Step 1 - import modules
import passport from "passport";
import passportLocal from "passport-local"
import flash from 'connect-flash'

// Auth Step 2 - define our auth strategy
let localStrategy = passportLocal.Strategy;

// Auth Step 3 - import the user model
import mongoose from "mongoose";

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

// Auth Step 4 - Setup Express Session
app.use(session({
    secret: Secret,
    saveUninitialized: false,
    resave: false
}))

// Auth Step 5 - Step Flash 
app.use(flash());

// Auth Step 6 - initialize Password and Session
app.use(passport.initialize());
app.use(passport.session);

// Auth Step 7 - implement the Auth strategy 
passport.use(User.createStrategy());

// Auth Step8 - Setup serialization and deserialization
passport.serializeUser(user.serializeUser());
passport.deserializeUser(User.deserializeUser);


// use Routes 
app.use('/', indexRouter);
app.use('/', movieRouter);

// //run app
// app.listen(3000);

// console.log('Server running at http://localhost:3000');

export default app;