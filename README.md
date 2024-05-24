게시판 프로젝트 시작!

0.  (설계) API 명세서 및 ERD 작성
1.  (개발) 프로젝트 기본 세팅
2.  (개발) DB 연결, 스키마 작성, 테이블 생성
3.  (필수) 회원가입
4.  (필수) 로그인
5.  (필수) 사용자 인증
6.  (필수) 이력서 관리
7.  (선택) 역할에 따른 실행 결과 분기
8.  (선택) Transaction 활용
9.  (선택) RefreshToken 활용
10. (테스트) API Client로 동작 확인
11. (배포) 누구나 이용할 수 있도록 하기

01-1. 프로젝트 기본 세팅
새로운 Github 저장소를 생성합니다.
express 패키지를 이용해 백엔드 서버를 띄우는 기본 코드를 작성합니다.
.env 파일과 dotenv 패키지를 이용해서 민감한 정보(DB 계정 정보 등)를 관리합니다.
.gitignore 파일을 생성하여 .env ,node_modules 등 불필요하거나 민감한 정보가 Github에 올라가지 않도록 설정합니다.
.prettierrc 파일과 prettier 패키지를 이용하여 일정한 코드 형태를 유지할 수 있도록 설정합니다.
package.json 파일의 scripts 항목에 dev 라는 이름으로 nodemon 패키지를 이용해 서버를 실행할 수 있도록 추가합니다.
error-handler.middleware.js 파일에 에러 처리 미들웨어를 작성하고 사용할 수 있도록 app.js에 추가합니다.
README.md 파일을 생성하여 간략한 프로젝트의 설명 및 실행 방법을 작성합니다.

01-2. 폴더구조 예시
.
├── node_modules // Git에는 올라가지 않습니다.
├── prisma
│   └── schema.prisma
├── src
│   ├── constants
│   │ ├── auth.constant.js
│   │   ├── env.constant.js
│   │   ├── resume.constant.js
│   │   └── user.constant.js
│   ├── middlewares
│   │   ├── error-handler.middleware.js
│   │   ├── require-access-token.middleware.js
│   │   ├── require-refresh-token.middleware.js
│   │   └── require-roles.middleware.js
│   ├── routers
│   │   ├── auth.router.js
│   │   ├── index.js
│   │   ├── resumes.router.js
│   │   └── users.router.js
│   ├── utils
│   │   └── prisma.util.js
│   └── app.js
├── .env // Git에는 올라가지 않습니다.
├── .env.example // Git에 올라갑니다. .env의 복사본으로 Key만 있고 Value는 삭제합니다.
├── .gitignore
├── .prettierrc
├── package.json
├── README.md
└── yarn.lock // npm을 사용하면 package-lock.json

02-1.
