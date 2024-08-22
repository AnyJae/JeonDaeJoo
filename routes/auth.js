// //관리자 로그인을 위한 router
// const express = require('express');
// const flash = require('connect-flash');
// const path = require('path');
// const router = express.Router();
// require('dotenv').config();

// // 환경 변수에서 관리자 자격 증명 로드
// const ADMIN_ID = process.env.ADMIN_ID;
// const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// router.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'auth.html'));
// });

// router.post('/', (req, res) => {
//   const { username, password } = req.body;

//   if (username === ADMIN_ID && password === ADMIN_PASSWORD) {
//     req.session.admin = true;  // 세션에 관리자 정보 저장
//     return res.redirect('/admin');  // 로그인 성공 시 관리자 페이지로 리다이렉트
//   } else {
//     req.flash('error', '관리자 계정이 아닙니다.');
//     return res.redirect('/auth');  // 로그인 실패 시 다시 로그인 페이지로 리다이렉트
//   }
// });

// module.exports = router;
const express = require('express');
const path = require('path');
const router = express.Router();
require('dotenv').config();

// 환경 변수에서 관리자 자격 증명 로드
const ADMIN_ID = process.env.ADMIN_ID;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// 로그인 페이지 제공
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'auth.html'));
});

// 로그인 처리
router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_ID && password === ADMIN_PASSWORD) {
    req.session.admin = true;  // 세션에 관리자 정보 저장
    req.session.message = '';  // 에러 메시지 초기화
    return res.redirect('/admin');  // 로그인 성공 시 관리자 페이지로 리다이렉트
  } else {
    req.session.message = '관리자 계정이 아닙니다.';
    return res.redirect('/auth');  // 로그인 실패 시 다시 로그인 페이지로 리다이렉트
  }
});

// 에러 메시지를 클라이언트에 전달하는 라우트
router.get('/error-message', (req, res) => {
  const message = req.session.message || '';
  req.session.message = '';  // 메시지를 한 번 보여준 후 초기화
  res.json({ message });
});

module.exports = router;
