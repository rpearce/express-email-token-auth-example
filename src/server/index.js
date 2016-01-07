import 'babel-polyfill';
import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import engines from 'consolidate';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectPGSimple from 'connect-pg-simple';
import homeRouter from '../app/home/router/';
import authsRouter from '../app/auths/router/';
import pg from 'pg';
import dbInfo from '../db/database';

dotenv.load();

const pgSession = connectPGSimple(session);

/*
 * This DB stuff should be somewhere else and be centralized
 */
const { user, password, host, port, database} = dbInfo.dev;
const conString = `postgres://${user}:${password}@${host}:${port}/${database}`;
/*
 * END DB NOTES
 */

const app = express();

app.engine('html', engines.hogan);
app.set('views', path.join(__dirname, '..', 'app'));
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  store: new pgSession({ pg, conString }),
  resave: true,
  saveUninitialized: false,
  secret: process.env.SECRET_KEY_BASE,
  cookie: { path: '/', httpOnly: true, secure: false, maxAge: null }
}));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(homeRouter);
app.use(authsRouter);

export default app;
