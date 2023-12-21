import type { RequestHandler } from 'express';
import { prismaClient } from '../utils/db';
import { isProd } from '../utils/env';

const authMiddlewares: RequestHandler[] = [];

const devAuthMiddleware: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith('Testuser ')) {
    const token = authHeader.split(' ').at(-1);
    const email = `${token}@gmail.com`;

    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    console.log(user ? `User found ${JSON.stringify(user)}` : 'No user found');
    req.user = user;
  }

  next();
};

const authMiddleware: RequestHandler = async (req, res, next) => {
  next();
};

if (!isProd) {
  authMiddlewares.push(devAuthMiddleware);
}

authMiddlewares.push(authMiddleware);

export { authMiddlewares };
