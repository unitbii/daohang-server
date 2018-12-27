var express = require('express');
var router = express.Router();

var userDao = require('../../dao/userDao');

router.get('/', function(req, res, next) {
  res.send('api入口');
});

// 用户登录
router.post('/login', function(req, res, next) {
  userDao.login(req, res, next);
});

module.exports = router;
