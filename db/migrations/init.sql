CREATE DATABASE IF NOT EXISTS o3o-database;
USE o3o-database;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  server_id VARCHAR(50) NOT NULL,
  user_id VARCHAR(50) NOT NULL,
  balance BIGINT NOT NULL DEFAULT 0,
  UNIQUE KEY (server_id, user_id)
);

CREATE TABLE IF NOT EXISTS accountHistory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  server_id VARCHAR(50) NOT NULL,
  user_id VARCHAR(50) NOT NULL,
  -- 잔고
  balance BIGINT NOT NULL,
  -- 잔고 변화량
  changeBalance BIGINT NOT NULL,
  -- 변화 사유( ex. 낚시, 도박 )
  reason VARCHAR(50) NOT NULL,
  -- 데이터 입력 시간 ( 잔고 표시 필요할 때 이걸로 ASC 하면 쉽게 정렬할 수 있음 )
  created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (server_id, user_id, balance) VALUES ('1', '1', 50000);