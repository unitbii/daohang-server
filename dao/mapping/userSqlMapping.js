var key = 'Abc123_!' // 由它加密必须由它解密

// CRUD SQL语句
module.exports = {
	insert:`INSERT INTO user (name,pwd) VALUES(?, ENCODE(?, '${key}'))`,
	// update:'update user set name=?, pwd=? where id=?',
	// delete: 'delete from user where id=?',
  queryById: 'select * from user where id=?',
  queryPwdByName: `select DECODE(pwd, '${key}') from user where name=?`,
	queryAll: 'select * from user'
};
