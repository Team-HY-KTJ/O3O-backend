import express from 'express';
import dotenv from 'dotenv';

import db from './db';

dotenv.config();
const { DB_TABLENAME, PORT } = process.env;

const app = express();
app.use(express.json());

app.get('/balance', (req, res) => {
    const { userid, serverid } = req.query;
    const response = { userid: 0, balance: 0, newlyAdded: false };

    console.log(`userid: ${userid}, serverid: ${serverid}`);

    const query = `SELECT user_id, balance FROM ${DB_TABLENAME} WHERE user_id = ? AND server_id = ?`;
    db.query(query, [userid, serverid], (err, results) => {
        if (err) {
            console.error('데이터 조회 오류:', err);
            return res.status(500).send('서버 오류');
        }

        if (results.length > 0) {
            console.log('데이터 조회 성공');
            response.userid = results[0].user_id;
            response.balance = results[0].balance;
            res.json(response);
        } else {
            console.log('사용자 없음, 새로 추가 중');
            const insertQuery = `INSERT INTO ${DB_TABLENAME} (user_id, server_id, balance) VALUES (?, ?, 1000)`;
            db.query(insertQuery, [userid, serverid], (insertErr) => {
                if (insertErr) {
                    console.error('데이터 삽입 오류:', insertErr);
                    return res.status(500).send('서버 오류');
                }
                response.userid = userid;
                response.balance = 1000;
                response.newlyAdded = true;
                res.json(response);
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
