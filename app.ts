import 'dotenv/config';
import { Application } from './src/server/server';
import { userRouter } from './src/routers/userRouter';
import { setRequestHeaders } from './src/helper/setRequestHeaders';

const PORT: string | number = process.env.PORT || 3000;

const app: Application = new Application();
app.use(setRequestHeaders);
app.route(userRouter);

const start = async () => {
  app.listen(PORT, (): void => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

try {
  start();
} catch (error) {
  console.log('Something is going wrohg! ' + error);
}
