var express = require('express');
var router = express.Router();

var $util = require('../util');
var userDao = require('../dao/userDao'); // 数据库操作
var codeList = require('./codeList'); // 标准错误码

/* API */
// 
router.get('/', function(req, res, next) {
  res.send('api入口');
});

// 用户登录
router.post('/login', function(req, res, next) {
  // console.log(req);
  var param = req.body;
  if (!param.name || !param.password) {
    res.json(codeList['10001']);
    return;
  }
  userDao.login(req, function (result) {
    // console.log(result);
    if (result) {
      var pwd = $util.getFristAttr(result[0]).toString();
      if (pwd && pwd === param.password) {
        result = {
          code: '200',
          msg:'账号和密码匹配'
        };
        // 登录时，给客户端重新分配一个session.id
        // req.session.regenerate(function (err) {
        //   if(err){
        //     return res.json({code: '2', msg: 'session失败'});
        //   }
          req.session.loginUser = param.name;
          console.log("看一下session，这时候我们应该已经登录成功了", req.session);
        // });
      } else {
        result = codeList['10002'];
      }
    }
    jsonWrite(res, result);
  });
});
// 用户登出
router.get('/logout', function(req, res, next) {
  req.session.loginUser = null;
  res.json({
    code: '200',
    msg: '登出成功'
  });
});

// 向前台返回JSON方法的简单封装
function jsonWrite (res, result) {
	if(typeof result === 'undefined') {
		res.json(codeList['1']);
	} else {
		res.json(result);
	}
};

module.exports = router;
