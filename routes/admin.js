const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();

// 업로드 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // 파일명에 타임스탬프 추가
  }
});

const upload = multer({ storage: storage });

// 여러 이미지 업로드 라우트
router.post('/upload-images', upload.array('images', 10), (req, res) => {
  if (req.files && req.files.length > 0) {
    res.send(`${req.files.length}개의 이미지가 성공적으로 업로드되었습니다.`);
  } else {
    res.status(400).send('이미지 업로드에 실패했습니다.');
  }
});

// 업로드된 이미지 목록 제공 라우트
router.get('/uploaded-images', (req, res) => {
  const uploadsDir = path.join(__dirname, '../public/uploads');

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).send('이미지를 불러오는 중 오류가 발생했습니다.');
    }

    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
    res.json(imageFiles);
  });
});

// 이미지 삭제 라우트
router.delete('/delete-image', (req, res) => {
  const imageName = req.query.name;
  const imagePath = path.join(__dirname, '../public/uploads', imageName);

  fs.unlink(imagePath, (err) => {
    if (err) {
      return res.status(500).send('이미지 삭제 중 오류가 발생했습니다.');
    }
    res.send('이미지가 성공적으로 삭제되었습니다.');
  });
});

// 관리자 페이지 제공
router.get('/', (req, res) => {
  if (req.session.admin) {
    res.render('admin'); // views/admin.pug 파일을 렌더링
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
