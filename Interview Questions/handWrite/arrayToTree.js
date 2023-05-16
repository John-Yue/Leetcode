var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
function arrayToTree(data) {
  var map = new Map();
  var result = [];
  data.forEach(function (item) {
    return map.set(item.id, __assign(__assign({}, item), { children: [] }));
  });
  map.forEach(function (item) {
    if (map.has(item.pid)) {
      var parentNode = map.get(item.pid);
      parentNode.children.push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}
// 需转换的数据
var data = [
  { id: 1, name: "电脑", pid: 0 },
  { id: 2, name: "mac", pid: 1 },
  { id: 3, name: "mac 笔记本", pid: 2 },
  { id: 4, name: "mac 台式机", pid: 2 },
  { id: 5, name: "mac air", pid: 3 },
  { id: 6, name: "mac pro", pid: 3 },
  { id: 7, name: "win", pid: 1 },
  { id: 8, name: "win 笔记本", pid: 7 },
];
var result = arrayToTree(data);
console.log(JSON.stringify(result));
