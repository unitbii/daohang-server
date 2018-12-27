// CRUD SQL语句
var key = 'Abc123_!'
var user = {
	insert:`INSERT INTO user (name,pwd) VALUES(?, ENCODE(?, '${key}'))`,
	// update:'update user set name=?, pwd=? where id=?',
	// delete: 'delete from user where id=?',
  queryById: 'select * from user where id=?',
  queryPwdByName: `select DECODE(pwd, '${key}') from user where name=?`,
	queryAll: 'select * from user'
};

module.exports = user;

