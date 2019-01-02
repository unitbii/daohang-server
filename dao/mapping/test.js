// 基本 SQL语句

// 创建/删除 数据库
var creatDataBase = `CREATE DATABASE <数据库名>;`
var dropDataBase = `DROP DATABASE <数据库名>;`

// 创建/删除 表
var createTable = `CREATE TABLE IF NOT EXISTS user(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL UNIQUE,
  pwd BLOB NOT NULL,
  submission_date datetime NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ( id )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;`
var dropTable = `DROP TABLE <表名>;`

// 增加一条记录
// ENCODE()和DECODE()加密解密函数
// INSERT INTO user (name, pwd) VALUES ('unitbii', ENCODE('Abc123_!', 'Abc123_!'));
// select DECODE(pwd, 'Abc123_!') from user where name='unitbii';

// 删除
// DELETE FROM user WHERE id = 1

var mysqlMapping = {
  creatDataBase,
  dropDataBase,
  createTable,
  dropTable
};
 
module.exports = mysqlMapping;
