import db from '../../db.js';

/*
    INSERT Column elements
    {
        "id": AUTO_INCREMENT,
        "server_id": server_id,
        "user_id": user_id,
        "balance" : balance,
        "changeBalance" : changeBalance,
        "reason" : reason,
        "created_at" : current_time
    }

    유저 거래 내역 API
    - user_id : 유저 아이디
    - server_id : 서버 아이디
    - changeBalance : 잔고 변화량
    - reason : 잔고 변화 사유( 낚시, 도박, 시드머니 )

    유의 사항
    - reason 추가 필요 시 작성
    - reason의 종류에 따라 예외처리를 할 필요가 있을 지에 대한 토의 필요
    - changeBalance 변수명 고민해보기
*/

export async function accountHistory(user_id, server_id, changeBalance, reason){
    // 기존 보유 잔고
    let balance = await new Promise((resolve, reject) => {
        db.query('SELECT balance FROM users WHERE user_id = ? AND server_id = ?', [user_id, server_id], (err, results) => {
            if(err) reject(err);
            // users table에 해당하는 유저가 없는 경우
            if(results.length === 0) reject(new Error("해당 유저가 테이블에 없음"));
            resolve(results[0].balance);
        })
    });
    // 변화 반영한 잔고
    balance += changeBalance;
    // 거래 내역 추가
    await db.query('INSERT INTO accountHistory (server_id, user_id, balance, changeBalance, reason) VALUES (?, ?, ?, ?)', [server_id, user_id, balance, changeBalance, reason]);
}