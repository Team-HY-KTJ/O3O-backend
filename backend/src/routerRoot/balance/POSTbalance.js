import express from 'express';
import db from '../../db.js';

const route = '/balance';
const router = express.Router();
const { DB_TABLENAME } = process.env;

router.post('/update',(req, res) => {
    const { userid, serverid, amount, reason } = req.body;
    if (!userid || !serverid || !amount || !reason) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // 잔고 수정 쿼리
    const updateQuery = `
        UPDATE users
        SET balance = balance + ?
        WHERE user_id = ? AND server_id = ?;
    `;

    db.query(updateQuery, [amount, userid, serverid], (updateErr, results) => {
        if (updateErr) {
            // 사용자가 없을 경우 404 에러 반환
            if (results.affectedRows === 0) return res.status(404).json({ error: '유저를 찾을 수 없습니다. /balance 명령어를 통해 잔고를 먼저 초기화 해주세요.' });
            
            // 이외의 오류는 500 에러 반환
            console.error('잔고 수정 오류:', updateErr);
            return res.status(500).send('서버 오류 : 잔고 수정 실패');
        }

        /*
            추후 개발 선택 사항 : 이벤트 로깅 (계좌 입출금 내역 기록)
            - 사용자가 얼마나 잔고를 수정했는지, 이유를 함께 기록
            - 이벤트 로그 테이블에 로그를 기록
        */

        // 수정 후 사용자 잔고 반환
        const selectQuery = `SELECT balance FROM users WHERE user_id = ? AND server_id = ?`;
        db.query(selectQuery, [userid, serverid], (selectErr, selectResults) => {
            if (selectErr) {
                console.error('잔고 조회 오류:', selectErr);
                return res.status(500).send('서버 오류 : 잔고 조회 실패');
            }
            if (selectResults.length > 0) res.json({ userid: userid, balance: selectResults[0].balance });
            else res.status(404).json({ error: 'User not found' });
        });
    });
});

export { route, router };
