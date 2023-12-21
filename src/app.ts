import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import { createServer } from 'node:http';

import { middlewares } from './middlewares';
import { appRouter } from './routes';

import './types/express';
import { Env } from './utils/env';

Env.load();

const port = parseInt(process.env.PORT ?? '3000', 10);

var app = express();

app.use(logger('dev'));
app.use(express.json());
// app.use(express.raw());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(middlewares);

app.use('/', appRouter);

const server = createServer(app);

server.listen(port, '0.0.0.0', () => {
  console.log(`Running at http://localhost:${port} or http://0.0.0.0:${port}`);
});

process.on('SIGUP', () => {
  console.debug('SIGUP');
  server.close();
});

process.on('SIGINT', () => {
  console.debug('SIGINT');
  server.close();
});

// const testUser = LoginRequest.create({
//   userForm: FormLoginRequest.create({
//     email: 'vivek@gmail.com',
//     password: 'pw',
//   }),
// });

// import { toProto3JSON } from 'proto3-json-serializer';
// (testUser as any).$type = LoginRequest;

// toProto3JSON(testUser as any);

// console.log(LoginRequest.toJSON(testUser));
