import 'dotenv/config';
import { Application } from '../src/server/server';
import { userRouter } from '../src/routers/userRouter';
import { setRequestHeaders } from '../src/helper/setRequestHeaders';
import request from 'supertest';

const PORT = process.env.PORT || 3000;

afterAll(() => {
  app.server.close();
});

let userOne: any;
let userTwo: any;

const testUserOne = {
  username: 'User 1',
  age: 35,
  hobbies: ['cycling', 'skiing'],
};

const testUserTwo = {
  username: 'User 2',
  age: 45,
  hobbies: ['walking'],
};

const app: Application = new Application();
app.use(setRequestHeaders);
app.route(userRouter);

app.listen(PORT, (): void => {
  console.log(`Server running at http://localhost:${PORT}`);
});

it('should create a user', async (): Promise<void> => {
  const res1 = await request(app.server).post('/api/users').send(testUserOne);
  userOne = res1.body;
  const res2 = await request(app.server).post('/api/users').send(testUserTwo);
  userTwo = res2.body;
  expect(res1.statusCode).toEqual(201);
  expect(res1.body).toEqual({ id: userOne.id, ...testUserOne });
  expect(res2.statusCode).toEqual(201);
  expect(res2.body).toEqual({ id: userTwo.id, ...testUserTwo });
});

it('should be size of array of users equal 2', async (): Promise<void> => {
  const res = await request(app.server).get('/api/users');
  expect(res.statusCode).toEqual(200);
  expect(res.body.length).toEqual(2);
});

it('should get error trying delete user by id', async (): Promise<void> => {
  const id: string = userOne.id.slice(1);
  const res = await request(app.server).delete('/api/users/' + id);
  expect(res.statusCode).toEqual(400);
  expect(res.body.message).toEqual(`User id:${id} is invalid`);
});

it('should get error trying delete user with not existing id', async (): Promise<void> => {
  const id: string = 'cf5707df-ff86-4cce-9e9e-39a90049b25e';
  const res = await request(app.server).delete('/api/users/' + id);
  expect(res.statusCode).toEqual(404);
  expect(res.body.message).toEqual(`User not found by id:${id}`);
});

it('should delete user by id', async (): Promise<void> => {
  const res = await request(app.server).delete('/api/users/' + userOne.id);
  expect(res.statusCode).toEqual(204);
});

it('should be size of array of users equal 1', async (): Promise<void> => {
  const res = await request(app.server).get('/api/users');
  expect(res.statusCode).toEqual(200);
  expect(res.body.length).toEqual(1);
});
