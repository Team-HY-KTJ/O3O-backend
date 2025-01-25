const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: 'localhost', // MySQL 서버 주소
  user: 'root',      // MySQL 사용자 이름 (root는 모든 권한을 가진 사용자)
  password: '*********', // MySQL 비밀번호
  database: 'test',   // 사용할 데이터베이스 이름
  port: 3306 // 사용 포트 (MySQL의 default port가 3306)
});

// MySQL 연결
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
  } else {
    console.log('MySQL 연결 성공');

    const query = 'SELECT * FROM table1';
    db.query(query, (err, results) => {
        if (err) {
          console.error('데이터 조회 오류:', err);
        } else {
            console.log("데이터 조회 성공");
            console.log(results);
        }
      });
  }
});

// 데이터 가져오기 API
app.get('/data', (req, res) => {
  const query = 'SELECT * FROM your_table_name'; // 원하는 쿼리 작성
  db.query(query, (err, results) => {
    if (err) {
      console.error('데이터 조회 오류:', err);
      res.status(500).send('서버 오류');
    } else {
      res.json(results); // 데이터를 JSON 형태로 반환
    }
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
