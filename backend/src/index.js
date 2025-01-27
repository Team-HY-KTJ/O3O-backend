import express from 'express';
import dotenv from 'dotenv';

import { route, router } from './router.js';
import db from './db.js';

dotenv.config();
const { PORT } = process.env;

const app = express();
app.use(express.json());

app.use(route, router);

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
