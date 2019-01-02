/** 权限相关 */

// 无须登录权限列表
const unLoginPermissionList = [
  '/login',
  /^\/visit\/[A-Za-z0-9_]+$/
];

// 匹配正则数组(兼容字符串)
const RegArrTest = (string, arr = unLoginPermissionList) => {
  for (let key in arr) {
    let item = arr[key];
    if (typeof item === 'string') {
      item = new RegExp(`^${item}$`);
    }
    const result = item.test(string);
    if (result) {
      console.log('--匹配无须鉴权--')
      return result;
    }
  }
  return false;
}
exports.RegArrTest = RegArrTest;

// 登录鉴权
const LoginPermission = (req) => {
  console.log('——————————开始登录鉴权——————————');
  const sess = req.session;
  // console.log(sess);
  const loginUser = sess ? sess.loginUser : null;
  const isLogined = !!loginUser; // 这里应该做更严格的鉴权? todo
  console.log('登录鉴权：', isLogined)
  return isLogined;
}
exports.LoginPermission = LoginPermission;

// 总鉴权通道
exports.checkPermission = ({ req, success, error }) => {
  console.log('========= 所有请求鉴权 =========');
  const isLogined = LoginPermission(req);
  if (isLogined || RegArrTest(req.path)) {
    success();
  } else {
    error();
  }
  console.log('================================');
}
