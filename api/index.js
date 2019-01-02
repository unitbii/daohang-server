const express = require('express');
const router = express.Router();

const codeList = require('./codeList'); // 标准错误码
const { checkPermission } = require('../util/permission');

// api总鉴权通道
const permission = (req, res, next) => {
  checkPermission({
    req,
    success: next, // 继续下一个匹配,
    error () { // 返回错误码
      res.json(codeList['10003']);
    }
  });
}

// 我们在这里做api的鉴权处理
router.get('*', (req, res, next) => {
  permission (req, res, next);
});

router.post('*', (req, res, next) => {
  permission (req, res, next);
});

// api入口在这里录入
const loginRoute = require('./login');
const tagDataRoute = require('./tagData');

loginRoute(router);
tagDataRoute(router);

module.exports = router;
