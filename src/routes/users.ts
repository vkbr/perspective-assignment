import { ValidationError } from 'class-validator';
import { Router } from 'express';
import { Prisma } from '../db';
import { CreateUserRequestDto } from '../dto/users';
import { createUser, findUsers } from '../services/users';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const payload = await CreateUserRequestDto.parse(req.body);
    res.json(await createUser(payload));
  } catch (error: any) {
    if (Array.isArray(error) && error[0] instanceof ValidationError) {
      res.status(400).send(`Invalid "${error[0].property}" field.`);
    } else {
      res.status(500).send('Something went wrong.');
    }
  }
});

router.get('/', async (req, res) => {
  const created = req.query.created as any;
  const orderByCreated: Prisma.SortOrder = ['asc', 'desc'].includes(created)
    ? created
    : 'desc'; // default=desc to return latest first

  res.json(await findUsers({ createdAt: orderByCreated }));
});

export { router as usersRouter };
