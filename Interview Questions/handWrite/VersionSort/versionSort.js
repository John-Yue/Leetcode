const versionList = [
  "1.1",
  "2.3.3",
  "4.3.5",
  "0.3.1",
  "0.302.1",
  "4.20.0",
  "4.3.5.1",
  "1.2.3.4.5",
];

// function versionSort(versionList) {
//   const p = 1000;
//   // 获取最大长度的版本号的长度
//   const maxLen = Math.max(...versionList.map((item) => item.split(".").length));
//   const reducer = (acc, value, index) =>
//     acc + +value * Math.pow(p, maxLen - index - 1);
//
//   const gen = (arr) => arr.split(".").reduce(reducer, 0);
//
//   versionList.sort((a, b) => (gen(a) > gen(b) ? -1 : 1));
//
//   return versionList;
// }

function _versionSort(versionList) {
  // 获取最大版本号的长度，为在版本号之前补0
  const maxLen = Math.max(...versionList.map((item) => item.split(".").length));

  // 开始排序，这里可以看作两个版本号之间比较大小的问题
  versionList.sort((a, b) => {
    let i = 0;

    // 字符串拆分成数组，且字符可以通过unicode编码比较大小
    const arr1 = a.split(".");
    const arr2 = b.split(".");

    // 在位数不够的版本号之前补0
    function merge(arr) {
      let step = maxLen - arr.length;
      while (step) {
        arr.unshift("0");
        --step;
      }
    }

    merge(arr1);
    merge(arr2);

    // 开始比较两个版本号之间的大小
    while (true) {
      // 从左边最高位开始比较
      const s1 = arr1[i];
      // 取出后索引自增
      const s2 = arr2[i++];

      if (s1 === s2) continue;

      // 升序排序
      return s1 - s2;
    }
  });

  return versionList;
}

function versionSort(versionList) {
  const maxLen = Math.max(...versionList.map((item) => item.split(".").length));
  return versionList.sort((a, b) => {
    const arr1 = a.split(".");
    const arr2 = b.split(".");

    function merge(arr) {
      let step = maxLen - arr.length;
      while (step) {
        arr.unshift("0");
        --step;
      }
    }

    merge(arr1);
    merge(arr2);

    let i = 0;
    while (true) {
      const s1 = arr1[i];
      const s2 = arr2[i++];

      if (s1 === s2) {
        continue;
      }

      return s1 - s2;
    }
  });
  return versionList;
}

console.log("versionList: ", versionSort(versionList));
