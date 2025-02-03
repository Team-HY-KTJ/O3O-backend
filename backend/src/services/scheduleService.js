import scheduleRepository from '../repositories/scheduleRepository'

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

export async function create(scheduleData = { server_id: null, channel_id: null, schedule_name: null, schedule_time: null, schedule_alarm: null, schedule_description: null }){
    if(!scheduleData.server_id || !scheduleData.channel_id || !scheduleData.schedule_name || !scheduleData.schedule_time){
        console.error('scheduleService Null error');
    }

    // 알람 시간 입력 없으면 자동으로 스케쥴 시간이랑 똑같이
    if(!scheduleData.schedule_alarm){
        scheduleData.schedule_alarm = scheduleData.schedule_time;
    }

    await scheduleRepository.createSchedule(scheduleData);
}

export function read(){

}

export function update(){

}

export function Delete(){

}