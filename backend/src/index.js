import express from 'express';
import dotenv from 'dotenv';

import { db } from './db.js';

// 임시로 갔다 놓은거 나중에 구조 바꿔야징
dotenv.config();
const { DB_NAME } = process.env;
// 

const { PORT } = process.env;

const app = express();
app.use(express.json());

app.get('/balance', (req, res) => {
  const { userid, serverid } = req.body;
  const response = { userid, balance };

  const query = 'SELECT balance FROM ${DB_NAME} WHERE userid = ${userid} AND serverid = ${serverid}';
  db.query(query, (err, results) => {
    if (err) {
      console.error('데이터 조회 오류:', err);
      res.status(500).send('서버 오류');
    } else {
      response.userid = userid;
      response.balance = results[0].balance;
      res.json(response);
    }
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
