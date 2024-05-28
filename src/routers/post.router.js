import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router(); // express.Router()를 이용해 라우터를 생성합니다.

/** 게시글 생성 API **/
router.post('/new-posts', authMiddleware, async (req, res, next) => {
  const { userId } = req.user;
  const { title, content } = req.body;

  const post = await prisma.posts.create({
    data: {
      userId: +userId,
      title,
      content,
    },
  });

  return res.status(201).json({ data: post });
});
export default router;
