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

const testUserTwo = {
  name: 'User 2',
  age: 35,
  hobbies: ['walking'],
};

const app: Application = new Application();
app.use(setRequestHeaders);
app.route(userRouter);

app.listen(PORT, (): void => {
  console.log(`Server running at http://localhost:${PORT}`);
});

it('should create a user withoud required fields', async (): Promise<void> => {
  const res = await request(app.server).post('/api/users').send(testUserTwo);
  expect(res.statusCode).toEqual(400);
});

it('should get user by incorrect id ', async (): Promise<void> => {
  const id = 'dabe2872-d95a-4736-b075-c1b398cba22';
  const res = await request(app.server).get(`/api/users/${id}`);
  expect(res.statusCode).toEqual(400);
  expect(res.body.message).toEqual(`User id:${id} is invalid`);
});

it('should get user by not existing id ', async (): Promise<void> => {
  const id = 'dabe2872-d95a-4736-b075-c1b398cba22f';
  const res = await request(app.server).get(`/api/users/${id}`);
  expect(res.statusCode).toEqual(404);
  expect(res.body.message).toEqual(`User not found by id:${id}`);
});
