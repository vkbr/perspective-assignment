import { Prisma } from '../db';
import { CreateUserRequestDto } from '../dto/users';
import { prismaClient } from '../utils/db';

export const createUser = (createUserDto: CreateUserRequestDto) => {
  return prismaClient.user.create({
    data: {
      email: createUserDto.email,
      name: createUserDto.name,
    },
  });
};

export const findUsers = (orderBy: Prisma.UserOrderByWithRelationInput) => {
  return prismaClient.user.findMany({
    orderBy,
  });
};
