import { RequestHandler } from 'express';
import { isDev } from '../utils/env';

const devMiddlewares: RequestHandler[] = [];

const devLatencyMiddleware: RequestHandler = (req, res, next) => {
  setTimeout(next, Math.random() * 300 + 300);
};

if (isDev) {
  devMiddlewares.push(devLatencyMiddleware);
}

export { devMiddlewares };
