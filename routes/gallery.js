const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// uploads 폴더의 경로
const uploadsDir = path.join(__dirname, '../public/uploads');

// gallery.pug 파일 렌더링
router.get('/', (req, res) => {
    res.render('gallery');  // Pug 파일을 렌더링
});

// 갤러리 이미지 가져오기 API (페이지네이션 포함)
router.get('/images', (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 9;

    // uploads 폴더에서 이미지 파일 이름 목록 가져오기
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            return res.status(500).send('이미지를 불러오는 중 오류가 발생했습니다.');
        }

        // 이미지 파일 필터링 (jpg, jpeg, png, gif)
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));

        const totalPages = Math.ceil(imageFiles.length / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = Math.min(startIndex + limit, imageFiles.length);

        const imagesForPage = imageFiles.slice(startIndex, endIndex);

        res.json({ images: imagesForPage, totalPages });
    });
});

module.exports = router;
