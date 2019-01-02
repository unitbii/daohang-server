const $util = require('../util');
const userDao = require('../dao/userDao'); // 数据库操作
const codeList = require('./codeList'); // 标准错误码

const jsonWrite = (res, result) => {
	if (typeof result === 'undefined') {
		res.json(codeList['1']);
	} else {
		res.json(result);
	}
};

const main = (router) => {
  // 用户登录
  router.post('/login', (req, res, next) => {
    const param = req.body;
    if (!param.name || !param.password) {
      res.json(codeList['10001']);
      return;
    }
    userDao.login(req, function (result) {
      // console.log(result);
      if (result) {
        const pwd = $util.getFristAttr(result[0]);
        if (pwd && pwd.toString() === param.password) {
          result = {
            code: 200,
            msg:'账号和密码匹配'
          };
          req.session.loginUser = param.name;
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
    // req.session.destroy();
    res.json({
      code: 200,
      msg: '登出成功'
    });
  });
}

module.exports = main;
