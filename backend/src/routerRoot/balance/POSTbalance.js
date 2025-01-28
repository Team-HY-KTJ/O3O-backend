import express from 'express';
import db from '../../db.js';

const route = '/balance';
const router = express.Router();
const { DB_TABLENAME } = process.env;

/*
    POST /balance/update

    요청 예시
    {
        "userid": 1,
        "serverid": 1,
        "amount": 1000,
        "reason": "출금"
    }

    응답 예시 (성공 시)
    {
        "userid": 1,
        "balance": 1000
    }

    응답 예시 (실패 시)
    {
        "error": "유저를 찾을 수 없습니다. /balance 명령어를 통해 잔고를 먼저 초기화 해주세요."
    }

    
    유저 잔액 수정 API
    - userid: 사용자 ID
    - serverid: 서버 ID
    - amount: 수정할 금액 (출금은 음수, 입금은 양수)
    - reason: 수정 사유 (로그 기록용)

    유의 사항
    - 현재는 사용자가 없을 경우 자동으로 추가하지는 않음.
    - 현재는 수정 후 잔고가 0 미만이 되는 경우에 대한 처리는 없음.
    - 사용자가 없을 경우 404 에러 반환하므로 먼저 /balance API를 통해 사용자를 추가하도록 안내 필요.
*/

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
