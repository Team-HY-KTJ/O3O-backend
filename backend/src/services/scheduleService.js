import scheduleRepository from '../repositories/scheduleRepository.js'

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

async function createSchedule(scheduleData = { server_id: null, channel_id: null, schedule_name: null, schedule_time: null, schedule_alarm: null, schedule_description: null }){
    if(!scheduleData.server_id || !scheduleData.channel_id || !scheduleData.schedule_name || !scheduleData.schedule_time){
        console.error('scheduleService createSchedule Null error');
        // throw new Error('scheduleService parameter Null'); //일단 Error 받는 거 처리 안했으니 주석으로만
    }

    // 비지니스 로직 처리는 대충해서 나중에 보강해야됨.
    if(typeof scheduleData.schedule_time == "string"){
        scheduleData.schedule_time = new Date(scheduleData.schedule_time);
    }
    else if(typeof scheduleData.schedule_time == "Date"){
        console.error("schedule_time type error");
    }

    // 알람 시간 입력 없으면 자동으로 스케쥴 시간이랑 똑같이
    if(!scheduleData.schedule_alarm){
        scheduleData.schedule_alarm = scheduleData.schedule_time;
    }

    await scheduleRepository.createSchedule(scheduleData);
}

// 일단 스케쥴 이름으로 불러오는 것 까지만
async function readSchedule(scheduleData = { server_id: null, channel_id: null, schedule_name: null }){
    if(!scheduleData.server_id || !scheduleData.channel_id || !scheduleData.schedule_name){
        console.error('scheduleService readSchedule Null error');
    }

    try{
        const results = await scheduleRepository.readScheduleByName(scheduleData);
        return results;
    }
    catch(err){
        throw { error : "임시로 넣어둔거"};
    }
}

function updateSchedule(){

}

function deleteSchedule(){

}

export default { createSchedule, readSchedule, updateSchedule, deleteSchedule};