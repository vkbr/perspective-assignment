import { Router } from 'express';
import { helloRouter } from './hello';

const router = Router();

router.use('/hello', helloRouter);

export { router as appRouter };
