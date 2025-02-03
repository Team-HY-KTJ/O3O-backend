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

export async function createSchedule(scheduleData = { server_id: null, channel_id: null, schedule_name: null, schedule_time: null, schedule_alarm: null, schedule_description: null }){
    const query = `INSERT INTO ? (server_id, channel_id, schedule_name, schedule_time, schedule_alarm, schedule_description) VALUES (?, ?, ?, ?, ?, ?)`
    const data = [ dbConfig.tables.schedule, ...Object.values(scheduleData) ];

    db.query(query, data);

    // 비동기 아직 어렵다...
    // return new Promise((resolve, reject) => {
    //     db.query(query, data, (err, results, fields) => {
    //         if(err) reject(err);
    //         else resolve(results);
    //     });
    // });
}

export async function readSchedule(){

}

export function updateSchedule(){

}

export function deleteSchedule(){

}