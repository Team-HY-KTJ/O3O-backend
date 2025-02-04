import express from 'express';
import db from '../../db.js';

const route = '/balance';
const router = express.Router();
const { DB_TABLENAME } = process.env;
/*
    GET /balance/ranking

    요청 예시
    {
        "guildId": 1,
        "scope": top,
        "limit": 10,
        "page": 1
    }

    응답 예시 (성공 시)
    {
        "guildId": "1",
        "ranking": [
            {
                "userId": "1",
                "balance": 1000
            }
        ],
        "page": 1,
        "totalPage": 1,
        "limit": 10,
        "totalCount": 1
    }

    응답 예시 (실패 시)
    {
        "error": "Wrong scope" 또는 "error": "Too much request(Reduce the limit)"
    }

    
    유저 잔액 수정 API
    - guildId: 서버 ID
    - scope: 추출 방법(top, all)
    - limit: 한 페이지 제한 개수
    - page: 선택할 페이지
*/
router.get('/ranking', async (req, res) => {
    const { guildId, scope='top' , limit=10, page=1 } = req.query;
    let limit2 = Number(limit);
    let page2 = Number(page);
    // limit가 100보다 큰 경우
    if(limit2 > 100) return res.status(422).json({ error: 'Too much request(Reduce the limit)'});
    // 서버 인원 구하기
    // const [count] = db.execute(`SELECT COUNT(*) AS count FROM users WHERE server_id = ?`,[guildId]);

    const count = await new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) AS count FROM users WHERE server_id = ?`,[guildId], (err, results) => {
            if(err) reject(err);
            resolve(results);
        });
    });
    if(scope==='top'){
        // user_id, coins 구하기
        const ranking = await new Promise((resolve, reject) => {
            db.query(`SELECT user_id, balance FROM users WHERE server_id = ? ORDER BY balance DESC LIMIT ?`,[guildId, limit2], (err, results) => {
                if(err) reject(err);
                resolve(results);
            });
        });
        // 반환 객체 생성
        const response = {
            guildId: guildId,
            ranking: ranking.map(rank => ({
                userId: rank.user_id,
                balance: rank.balance
            })),
            totalCount: count[0].count
        }
        // JSON 반환
        res.json(response);
    }
    else if(scope==='all'){
        // user_id, coins 구하기
        const ranking = await new Promise((resolve, reject) => {
            db.query(`SELECT user_id, balance FROM users WHERE server_id = ? ORDER BY balance DESC LIMIT ? OFFSET ?`,[guildId, limit2, limit2*(page2-1)], (err, results) => {
                if(err) reject(err);
                resolve(results);
            });
        });
        // 반환 객체 생성
        const response = {
            guildId: guildId,
            ranking: ranking.map(rank => ({
                userId: rank.user_id,
                balance: rank.balance
            })),
            page: page2,
            totalPage: Math.ceil(count[0].count/limit2),
            limit: limit2,
            totalCount: count[0].count
        }
        // JSON 반환
        res.json(response);
    }
    // 잘못된 scope를 입력했을 때
    else{
        return res.status(400).json({ error: 'Wrong scope' });
    }
});

export { route, router };