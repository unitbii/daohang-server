// 实现与MySQL交互
var mysql = require('mysql');
var $db = require('../conf/db');
// var $util = require('../util');
var $sql = require('./mapping');

// 使用连接池，提升性能
var pool  = mysql.createPool({
  connectionLimit : 10,
  ...$db.daohang
});

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, result) {
	if(typeof result === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(result);
	}
};

// 抽象出来的连接
var connection = function (query, dataList, callback) {
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
	login: function (req, res, next) {
    // console.log('req：', req);
    var param = req.body;
    // console.log('参数：', param);

    var query = $sql.user.queryPwdByName;
    var dataList = [param.name]
    
    connection(query, dataList, function(result) {
      // console.log(result);
      if (result) {
        var pwd;
        for(var key in result[0]) {
          pwd = result[0][key].toString();
        }
        if (pwd && pwd === param.password) {
          result = {
            code: 200,
            msg:'密码匹配'
          };
        }
      }
      jsonWrite(res, result);
    });
	}
};
