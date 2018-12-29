var express = require('express');
var router = express.Router();

// 无需鉴权页面
router.get('/login', function(req, res, next){
  send(res);
});

// 其他所有页面判断登录
router.get('*', function(req, res, next){
  var isLogined = checkPermission(req);
  if (isLogined) {
    send(res);
  } else {
    res.redirect('/login'); // 去往login或社区页 todo
  }
});

// 登录鉴权
function checkPermission (req) {
  var sess = req.session;
  console.log(sess);
  var loginUser = sess.loginUser;
  var isLogined = !!loginUser;
  return isLogined;
}
// 路由交给前端解决
function send (res) {
  res.sendfile('./views/index.html');
}

module.exports = router;
