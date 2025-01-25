import express from 'express';
import mysql from 'mysql2';

import { db } from './db.js';

const app = express();
const port = 3001;

// 데이터 가져오기 API
app.get('/data', (req, res) => {
  const query = 'SELECT * FROM your_table_name'; // 원하는 쿼리 작성
  db.query(query, (err, results) => {
    if (err) {
      console.error('데이터 조회 오류:', err);
      res.status(500).send('서버 오류');
    } else {
      res.json(results); // 데이터를 JSON 형태로 반환
    }
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
