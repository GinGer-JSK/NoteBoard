import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import PostsRouter from './src/routers/post.router.js';
import UsersRouter from './src/routers/users.router.js';
import AuthRoutr from './src/routers/auth.router.js';
import LogMiddleware from './src/middlewares/log.middleware.js';
import ErrorHandlingMiddleware from './src/middlewares/error-handler.middleware.js';

// Express
const app = express();
const PORT = 3000;

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use('/api', [PostsRouter]);
app.use('/user', [UsersRouter]);
app.use('/auth', [AuthRoutr]);
app.use(LogMiddleware);
app.use(ErrorHandlingMiddleware);

app.get('/', (req, res) => {
  return res.status(200).send('Hello Token!');
});

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
