import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import AuthRoutr from './src/routers/auth.router.js';
import PostsRouter from './src/routers/post.router.js';
import UsersRouter from './src/routers/users.router.js';
import LogMiddleware from './src/middlewares/log.middleware.js';
import ErrorHandlingMiddleware from './src/middlewares/error-handler.middleware.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(LogMiddleware);
app.use(ErrorHandlingMiddleware);
app.use('/api', [PostsRouter]);
app.use('/user', [UsersRouter]);
app.use('/auth', [AuthRoutr]);

app.get('/', (req, res) => {
  return res.status(200).send('Hello Token!');
});

app.listen(process.env.PORT, () => {
  console.log('서버가 열렸어요!');
});
