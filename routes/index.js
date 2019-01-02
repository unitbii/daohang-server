const express = require('express');
const router = express.Router();

const { checkPermission } = require('../util/permission');

router.get('*', (req, res, next) => {
  // 鉴权
  checkPermission({
    req,
    success () { // 前端入口，路由交给前端解决
      res.sendfile('./views/index.html');
    },
    error () { // 未来应去往社区页 todo
      res.redirect('/login');
    }
  })
});

module.exports = router;
