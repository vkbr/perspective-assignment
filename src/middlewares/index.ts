import { authMiddlewares } from './auth';
import { devMiddlewares } from './dev';

export const middlewares = [...devMiddlewares, ...authMiddlewares];
