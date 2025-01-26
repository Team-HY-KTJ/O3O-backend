import express from 'express';
import dotenv from 'dotenv';

import db from './db';

// 임시로 갔다 놓은거 나중에 구조 바꿔야징
dotenv.config();
const { DB_TABLENAME } = process.env;
// end

const { PORT } = process.env;

const app = express();
app.use(express.json());

app.get('/balance', (req, res) => {
    const { userid, serverid } = req.query;
    const response = { userid: 0, balance: 0 };

    console.log(`userid: ${userid}, serverid: ${serverid}`);

    const query = `SELECT user_id, balance FROM ${DB_TABLENAME} WHERE user_id = ${userid} AND server_id = ${serverid}`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('데이터 조회 오류:', err);
            res.status(500).send('서버 오류');
        } else {
            console.log('전송 선공');
            response.userid = results[0].userid;
            response.balance = results[0].balance;
            console.log(response);
            res.json(response);
        }
    });
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
