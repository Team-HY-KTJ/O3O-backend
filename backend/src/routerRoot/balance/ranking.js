import express from 'express';
import db from '../../db.js';

const route = '/balance';
const router = express.Router();
const { DB_TABLENAME } = process.env;

router.get('/ranking', async (req, res) => {
    const { guildId, scope='top' , limit=10, page=1 } = req.query;
    limit = Number(limit);
    page = Number(page);
    // limit가 100보다 큰 경우
    if(limit > 100) return res.status(422).json({ error: 'Too much request(Reduce the limit)'});
    // 서버 인원 구하기
    const [count] = await db.execute('SELECT COUNT(*) AS count FROM users WHERE server_id = ?',[guildId]);
    if(scope==='top'){
        // user_id, coins 구하기
        const [ranking] = await db.execute('SELECT user_id, coins FROM users WHERE server_id = ? ORDER BY coins DESC LIMIT ?',[guildId, limit]);
        // 반환 객체 생성성
        const response = {
            guildId: guildId,
            ranking: ranking.map(rank => ({
                userId: rank.user_id,
                balance: rank.coins
            })),
            totalCount: count[0].count
        }
    }
    else if(scope==='all'){
        // user_id, coins 구하기
        const [ranking] = await db.execute('SELECT user_id, coins FROM users WHERE server_id = ? ORDER BY coins DESC LIMIT ? OFFSET ?',[guildId, limit, limit*(page-1)]);
        // 반환 객체 생성
        const response = {
            guildId: guildId,
            ranking: ranking.map(rank => ({
                userId: rank.user_id,
                balance: rank.coins
            })),
            page: page,
            totalPage: Math.ceil(count[0].count/limit),
            limit: limit,
            totalCount: count[0].count
        }
    }
    // 잘못된 scope를 입력했을 때
    else{
        return res.status(400).json({ error: 'Wrong scope' });
    }
    // JSON 반환
    res.json(response);
});

export { route, router };