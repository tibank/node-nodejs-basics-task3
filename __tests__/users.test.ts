import 'dotenv/config';
import { Application } from '../src/server/server';
import { userRouter } from '../src/routers/userRouter';
import { setRequestHeaders } from '../src/helper/setRequestHeaders';
import request from 'supertest';

const PORT = process.env.PORT || 3000;
afterAll(() => {
  app.server.close();
});

let id: string;

const testUserOne = {
  username: 'User 1',
  age: 30,
  hobbies: ['swimming', 'reading'],
};

const app: Application = new Application();
app.use(setRequestHeaders);
app.route(userRouter);

app.listen(PORT, (): void => {
  console.log(`Server running at http://localhost:${PORT}`);
});

it('should be empty list of users', async (): Promise<void> => {
  const res = await request(app.server).get('/api/users');
  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual([]);
});

it('should create a user', async (): Promise<void> => {
  const res = await request(app.server).post('/api/users').send(testUserOne);
  id = res.body.id;
  expect(res.statusCode).toEqual(201);
  expect(res.body).toEqual({ id, ...testUserOne });
});

it('should get user by id (first created user)', async (): Promise<void> => {
  const res = await request(app.server).get('/api/users/' + id);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual({ id, ...testUserOne });
});

it('should update user by id (first created user)', async (): Promise<void> => {
  const tempRes = await request(app.server).get('/api/users/' + id);
  const userById = tempRes.body;
  userById.age = 33;
  const res = await request(app.server)
    .put('/api/users/' + id)
    .send(userById);
  expect(res.statusCode).toEqual(200);
  expect(res.body.age).toEqual(33);
});

it('should delete user by id (first created user)', async (): Promise<void> => {
  const res = await request(app.server).delete('/api/users/' + id);
  expect(res.statusCode).toEqual(204);
});

it('should get error trying to get deleted user by id (first created user)', async (): Promise<void> => {
  const res = await request(app.server).get('/api/users/' + id);
  expect(res.statusCode).toEqual(404);
});
