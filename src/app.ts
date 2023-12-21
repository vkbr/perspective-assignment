import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { appRouter } from './routes';

import './types/express';
import { Env } from './utils/env';

Env.load();

var app = express();

app.use(morgan('dev')).use(express.json()).use(cors()).options('*', cors());

app.use('/', appRouter);

export default app;
