import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const dbConfig = {
    host: DB_HOST || 'db',
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE, // 기존 코드에서 DB_NAME이 아니라 DB_DATABASE로 수정
    port: DB_PORT || 3306,
    connectionLimit: 10, // 연결 제한 설정
    waitForConnections: true,
    queueLimit: 0,
};

// DB 연결 생성
let db;

const handleDisconnect = () => {
    db = mysql.createPool(dbConfig);

    db.getConnection((err, connection) => {
        if (err) {
            console.error('MySQL DB Connect Failed:', err);
            setTimeout(handleDisconnect, 2000); // 재연결 시도 (2초 후)
        } else {
            console.log('MySQL DB Connect Success');
            if (connection) connection.release();
        }
    });

    db.on('error', (err) => {
        console.error('DB Connection Error:', err);
        if (
            err.code === 'PROTOCOL_CONNECTION_LOST' ||
            err.code === 'ECONNRESET'
        ) {
            console.log('DB 연결이 끊어져 재연결 시도 중...');
            handleDisconnect();
        } else {
            throw err;
        }
    });
};

handleDisconnect();

export default db;
