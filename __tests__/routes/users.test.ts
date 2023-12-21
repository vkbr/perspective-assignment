import supertest from 'supertest';
import app from '../../src/app';
import { createUser, findUsers } from '../../src/services/users';

const mockUser = {
  id: 'random-cuid',
  email: 'some@example.com',
  name: 'Some one',
};

jest.mock('../../src/services/users', () => ({
  createUser: jest.fn((input) => ({ ...mockUser, ...input })),
  findUsers: jest.fn(() => [mockUser]),
}));

describe('POST /users', () => {
  it('should respond with 400 for invalid inputs', async () => {
    const invalidInputs = [
      { email: 'invalid-email' }, // invalid email
      { email: 'some@example.com' }, // missing name
      { name: 'Some' }, // missing email
      { email: 'some@example.com', name: '' }, // empty name
    ];

    for (const input of invalidInputs) {
      const response = await supertest(app).post('/users').send(input);
      expect(response.statusCode).toBe(400);
    }
  });

  it('should create users with valid input', async () => {
    const input = {
      email: 'some@example.com',
      name: 'Some One',
    };

    const response = await supertest(app).post('/users').send(input);

    expect(createUser).toHaveBeenCalledWith(input);
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('application/json'),
    );
    expect(response.body).toEqual(
      expect.objectContaining({
        ...input,
        id: expect.any(String),
      }),
    );
  });
});

describe('GET /users', () => {
  it('should return list of users', async () => {
    const ressponse = await supertest(app).get('/users');
    expect(findUsers).toHaveBeenCalled();
    expect(ressponse.statusCode).toBe(200);
  });
  it('allows sorting by `created` query param', async () => {
    const expectedDesc = expect.objectContaining({ createdAt: 'desc' });
    const expectedAsc = expect.objectContaining({ createdAt: 'asc' });

    await supertest(app).get('/users');
    expect(findUsers).toHaveBeenCalledWith(expectedDesc);

    await supertest(app).get('/users?created=desc');
    expect(findUsers).toHaveBeenCalledWith(expectedDesc);

    await supertest(app).get('/users?created=asc');
    expect(findUsers).toHaveBeenCalledWith(expectedAsc);
  });
});
