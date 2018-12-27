var jsonto = function (obj) {
  return JSON.stringify(obj);
}
var tojson = function (string) {
  return JSON.parse(string);
}

module.exports = {
  jsonto,
  tojson
}
