CREATE DATABASE IF NOT EXISTS o3o-database;
USE o3o-database;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  server_id VARCHAR(50) NOT NULL,
  user_id VARCHAR(50) NOT NULL,
  balance BIGINT NOT NULL DEFAULT 0,
  UNIQUE KEY (server_id, user_id)
);

INSERT INTO users (server_id, user_id, balance) VALUES ('1', '1', 50000);