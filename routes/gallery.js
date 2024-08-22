const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// 이미지 파일 목록 제공
router.get('/images', (req, res) => {
  const imagesDir = path.join(__dirname, '..', 'public', 'uploads');
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory');
    }
    // 이미지 파일 이름 목록을 클라이언트로 전송
    res.json(files);
  });
});

module.exports = router;