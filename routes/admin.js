//관리자 계정이 쓰는 router

const express = require('express');
const router = express.Router();

// 관리자 페이지 제공
router.get('/', (req, res) => {
  if (req.session.admin) {
    res.send('관리자 페이지에 오신 것을 환영합니다!');
  } else {
    res.status(403).send('접근 권한이 없습니다.');
  }
});

// 로그아웃 라우트
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('로그아웃 중 오류가 발생했습니다.');
    }
    res.redirect('/'); // 로그아웃 후 메인 페이지로 리다이렉트
  });
});

module.exports = router;