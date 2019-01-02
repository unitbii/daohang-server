var $util = require('../util');
var codeList = require('./codeList'); // 标准错误码

function jsonWrite (res, result) {
	if(typeof result === 'undefined') {
		res.json(codeList['1']);
	} else {
		res.json(result);
	}
};

// 主方法
function main (router) {
  //
  router.get('/getTagData', function(req, res, next) {
    // 查询数据库
    // userDao.login(req, function (result) {
    //   // console.log(result);
    //   if (result) {
    //   }
    //   jsonWrite(res, result);
    // });
  });
}

module.exports = main;
