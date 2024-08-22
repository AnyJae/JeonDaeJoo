//관리자 로그인을 위한 router
const express = require('express');
const path = require('path');

const router = express.Router();
require('dotenv').config();

// 환경 변수에서 관리자 자격 증명 로드
const ADMIN_ID = process.env.ADMIN_ID;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'auth.html'));
});

router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_ID && password === ADMIN_PASSWORD) {
    req.session.admin = true;  // 세션에 관리자 정보 저장
    return res.redirect('/admin');  // 로그인 성공 시 관리자 페이지로 리다이렉트
  } else {
    return res.status(401).send('아이디 또는 비밀번호가 잘못되었습니다.');
  }
});

module.exports = router;