import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  port: DB_PORT,
  password: DB_PASSWORD,
  database: DB_NAME,
});

db.connect((err) => {
    if (err) {
      console.error('MySQL DB Connect Failed:', err);
    } else {
      console.log('MySQL DB Connect Success');
    }
});

export { db };