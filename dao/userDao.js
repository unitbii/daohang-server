// 实现与MySQL交互
var mysql = require('mysql');
var $db = require('../conf/db');
var $sql = require('./mapping');

// 使用连接池，提升性能
var pool  = mysql.createPool({
  connectionLimit : 10,
  ...$db.daohang
});

// 抽象出来的连接
function connection (query, dataList, callback) {
  pool.getConnection(function(err, connection) {
    // 建立连接
    connection.query(query, dataList, function(err, result) {
      callback(result);
      // 释放连接
      connection.release();
    });
  });
}

module.exports = {
  // 前端请求登录
	login: function (req, callback) {
    // console.log('req：', req);
    var param = req.body;
    // console.log('参数：', param);
    var query = $sql.user.queryPwdByName;
    var dataList = [param.name]
    connection(query, dataList, function (result) {
      callback(result);
    });
	}
};
