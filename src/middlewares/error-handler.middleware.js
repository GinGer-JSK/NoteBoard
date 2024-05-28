export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // joi에서 발생한 에러 처리
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 400,
      message: err.message,
    });
  }

  // 그 밖의 예상치 못한 에러 처리
  return res.status(500).json({
    status: 500,
    message: '예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.',
  });
};

export default function (err, req, res, next) {
  // 에러를 출력합니다.
  console.error(err);

  // 클라이언트에게 에러 메시지를 전달합니다.
  res.status(500).json({ errorMessage: '서버 내부 에러가 발생했습니다.' });
}
