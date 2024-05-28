import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

const router = express.Router();
dotenv.config();

let tokenStorage = {};

/** Access Token, Refresh Token 발급 API **/
router.post('/tokens', (req, res) => {
  const { id } = req.body;
  const accessToken = createAccessToken(id);
  const refreshToken = createRefreshToken(id);

  tokenStorage[refreshToken] = {
    id: id,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  };

  res.cookie('accessToken', accessToken);
  res.cookie('refreshToken', refreshToken);

  return res
    .status(200)
    .json({ message: 'Token이 정상적으로 발급되었습니다.' });
});

// Access Token을 생성하는 함수
function createAccessToken(id) {
  const accessToken = jwt.sign({ id: id }, ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: '7d',
  });

  return accessToken;
}

// Refresh Token을 생성하는 함수
function createRefreshToken(id) {
  const refreshToken = jwt.sign({ id: id }, REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: '7d',
  });

  return refreshToken;
}

/** 엑세스 토큰 검증 API **/
router.get('/tokens/validate', (req, res) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res
      .status(400)
      .json({ errorMessage: 'Access Token이 존재하지 않습니다.' });
  }

  const payload = validateToken(accessToken, ACCESS_TOKEN_SECRET_KEY);
  if (!payload) {
    return res
      .status(401)
      .json({ errorMessage: 'Access Token이 유효하지 않습니다.' });
  }

  const { id } = payload;
  return res.json({
    message: `${id}의 Payload를 가진 Token이 성공적으로 인증되었습니다.`,
  });
});

/** 리프레시 토큰 검증 API **/
router.post('/tokens/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken)
    return res
      .status(400)
      .json({ errorMessage: 'Refresh Token이 존재하지 않습니다.' });

  const payload = validateToken(refreshToken, REFRESH_TOKEN_SECRET_KEY);
  if (!payload) {
    return res
      .status(401)
      .json({ errorMessage: 'Refresh Token이 유효하지 않습니다.' });
  }

  const userInfo = tokenStorage[refreshToken];
  if (!userInfo)
    return res.status(419).json({
      errorMessage: 'Refresh Token의 정보가 서버에 존재하지 않습니다.',
    });

  const newAccessToken = createAccessToken(userInfo.id);

  res.cookie('accessToken', newAccessToken);
  return res.json({ message: 'Access Token을 새롭게 발급하였습니다.' });
});

// Token을 검증하고 Payload를 반환합니다.
function validateToken(token, secretKey) {
  try {
    const payload = jwt.verify(token, secretKey);
    return payload;
  } catch (error) {
    return null;
  }
}

export default router;
