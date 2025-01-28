import express from 'express';
import db from '../../db.js';

const route = '/balance';
const router = express.Router();
const { DB_TABLENAME } = process.env;

/*
    GET /balance?userid=1&serverid=1
    쿼리로 사용자 ID(userid)와 서버 ID(serverid) 전달

    응답 예시
    {
        "userid": 1,
        "balance": 1000,
        "newlyAdded": false
    }
    
    유저 잔액 조회 API
    - userid: 사용자 ID
    - serverid: 서버 ID

    유의 사항
    - 사용자 ID와 서버 ID에 해당하는 사용자의 잔액 조회
    - 사용자가 없을 경우 새로 추가하고 잔액 1000으로 초기화
    - 조회 성공 시 newlyAdded는 false, 새로 추가 시 newlyAdded는 true
*/

router.get('',(req, res) => {
    const { userid, serverid } = req.query;
    const response = { userid: 0, balance: 0, newlyAdded: false };

    console.log(`userid: ${userid}, serverid: ${serverid}`);

    const query = `SELECT user_id, balance FROM users WHERE user_id = ? AND server_id = ?`;
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
            const insertQuery = `INSERT INTO users (user_id, server_id, balance) VALUES (?, ?, 1000)`;
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

export { route, router };
