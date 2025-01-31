const mysql = require('mysql2');
const serverID = require('./bot');

const db = mysql.createConnection({
  host: 'localhost', // MySQL 서버 주소
  user: 'root',      // MySQL 사용자 이름 (root는 모든 권한을 가진 사용자)
  password: '*********', // MySQL 비밀번호
  database: 'test',   // 사용할 데이터베이스 이름
  port: 3306 // 사용 포트 (MySQL의 default port가 3306)
});

export async function ranking(input){
    try{
        // 상위 5명의 id와 코인 수만 fiveguys에 입력
        const [fiveguys] = await db.execute('SELECT user_id, coins FROM users ORDER BY coins DESC LIMIT 5');
        // 코인을 보유한 5명(이하)에 해당하는 메시지 반환
        if(fiveguys.length > 0){
            let message = `상위 ${fiveguys.length}명의 보유 코인량\n`;
            for(let i=0; i<fiveguys.length; i++){
                message += `\n${i+1}위 | ${fiveguys[i].user_id} | ${fiveguys[i].coins}`;
            }
            await input.reply(message);
        }
        // 코인을 보유한 인원이 1명도 없을 때에 메시지 반환환
        else {
            await input.reply('여긴 빈털터리밖에 없네');
        }
    }
    catch{
        console.log('/ranking error');
        await input.reply('피곤해 자러갈래');
    }
}