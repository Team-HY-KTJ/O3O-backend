import express from 'express';
import scheduleService from '../../services/scheduleService'

const route = '/schedule';
const router = express.Router();

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

// 생성, 변경 시 알람이 현재로부터 너무 멀리 떨어지지 않게,
// 시간 예약할 때, 얼마나 전에 해줄지 할 때, 너무 전은 아닌지 확인 (내일 예약인데, 알림을 1년 전에 해달라는 이상한 요구 X)
router.post('',async (req, res) => {
    const {} = req.body;
    const scheduleData = { server_id: null, channel_id: null, schedule_name: null, schedule_time: null, schedule_alarm: null, schedule_description: null }
    Object.assign(scheduleData, req.body);

    await scheduleService.create(scheduleData);
});
router.get('',(req, res) => {
    const {} = req.query;
});
router.patch('',(req, res) => {
    const {} = req.body;
});
router.delete('',(req, res) => {
    const {} = req.body;
});

export { route, router };