import db from '../db.js';
import dbConfig from '../config/dbConfig.js'

/*
Schedule DB 구조
- id : ID
- server_id  :   서버 ID
- channel_id :   서버 내 알림 보낼 방 (채팅 채널)
- schedule_name : 스케줄 이름
- schedule_time : 스케줄 시간 // TimeStamp
- schedule_alarm : 스케줄 알림 몇 분 전에 해줄지 // TimeStamp
- schedule_description스케줄 설명 (세부 사항)
*/

/**
 * 함수에 대한 설명을 여기에 작성합니다.
 * @param {Object} scheduleData 스케쥴 관련 데이터
 * @param {string} scheduleData.server_id 숫자도 되긴 하더라 (server, channel id는 number임)
 * @param {string} scheduleData.channel_id 숫자도 되긴 하더라 (server, channel id는 number임)
 * @param {string} scheduleData.schedule_name
 * @param {Date} scheduleData.schedule_time 형식 맞추면 string도 되긴 함.
 * @param {Date} scheduleData.schedule_alarm 형식 맞추면 string도 되긴 함.
 * @param {string} scheduleData.schedule_description
 * 
 * @returns {void} 아직 없음
 */
async function createSchedule(scheduleData = { server_id: null, channel_id: null, schedule_name: null, schedule_time: null, schedule_alarm: null, schedule_description: null }){
    const query = `INSERT INTO ${dbConfig.tables.schedule} (server_id, channel_id, schedule_name, schedule_time, schedule_alarm, schedule_description) VALUES (?, ?, ?, ?, ?, ?)`
    const data = [...Object.values(scheduleData) ];

    db.query(query, data, (err, results, fields) => {
        if(err) console.error(err);
    });

    // 비동기 아직 어렵다...
    // return new Promise((resolve, reject) => {
    //     db.query(query, data, (err, results, fields) => {
    //         if(err) reject(err);
    //         else resolve(results);
    //     });
    // });
}

async function readScheduleByName(scheduleData = { server_id: null, channel_id: null, schedule_name: null }){
    // 임시
    const query = `SELECT * FROM ${dbConfig.tables.schedule} WHERE server_id = ${scheduleData.server_id} AND channel_id = ${scheduleData.channel_id} AND schedule_name = ${scheduleData.schedule_name}`;

    //prepared statements가 보안상 좋긴 한데 schedule_name에 string 입력이 안 되가지고 일단 가림
    //const query = `SELECT * FROM ${dbConfig.tables.schedule} WHERE server_id = ? AND channel_id = ? AND schedule_name = ?`
    // const data = [...Object.values(scheduleData)];
    
    //let [rows] = await db.execute(query, data); // 이 방식 사용하려면 mysql2/promise로 바꿔야 됨... 바꾸자... 난 async/await가 callback보단 나은거 같애...
    //console.log(rows);
    //return [results, fields];

    return new Promise((resolve, reject) => {
        db.query(query/*, data*/, (err, results, fields) => {
            if(err) reject(err);
            else{
                console.log(query);
                console.log(err);
                console.log(results);
                resolve(results);
            }
        });
    });
}

function updateSchedule(){

}

function deleteSchedule(){

}

export default { createSchedule, readScheduleByName, updateSchedule, deleteSchedule};