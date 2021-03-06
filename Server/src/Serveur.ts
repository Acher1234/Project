import express from 'express';
import mongoose from 'mongoose';
import {addRoute} from './Routes/Routes'
import { Connection } from './Model/Connection';
import { User } from './Model/Userclass';
import { Categorie } from './Model/Categorie';
import Database from './Model/DatabaseClass'
import session from "express-session";
import passport from "passport";
import passportInitialisation from "./Model/PassportAuthentification";
const app = express();
var cors = require('cors');

const port = 8080;
const database = Database.CreateObject();

//middleware

app.use(session({
  resave:false,
  secret:'cat',
  saveUninitialized:false
}));

app.use(cors({credentials: true, origin: true}));
app.use(passport.initialize())
app.use(passport.session())
passportInitialisation(passport);
// URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


//serveur
async function ServeurLaunch()
{
  const categorie  = await database.RecupCategorie();
  await database.CreateTest();
  addRoute(app,port,categorie,passport);
}
ServeurLaunch();
