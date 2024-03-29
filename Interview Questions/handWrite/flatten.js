function flatten(arr, d = 0) {
  let result = [];
  (function flat(arr, d) {
    arr.forEach((item) => {
      if (Array.isArray(item) && d > 0) {
        flat(item, d - 1);
      } else {
        result.push(item);
      }
    });
  })(arr, d);
  return result;
}

// 添加深度的flat 数组展平
function flat(arr, d = 0) {
  return d > 0
    ? arr.reduce(
        (prev, curr) =>
          prev.concat(Array.isArray(curr) ? flat(curr, d - 1) : curr),
        []
      )
    : arr.slice();
}

const arr = [1, [2, [3, 4]]];
console.log(flatten(arr, 1));

// function flat(arr, d = 0) {
//   return d > 0
//     ? arr.reduce(
//         (prev, cur) => prev.concat(Array.isArray(cur) ? flat(cur, d - 1) : cur),
//         []
//       )
//     : arr.slice();
// }

function _flat(arr, d = 0) {
  const result = [];
  (function __flat(arr, d) {
    for (let item of arr) {
      if (Array.isArray(item) && d > 0) {
        __flat(item, d - 1);
      } else {
        result.push(item);
      }
    }
  })(arr, d);
  return result;
}

console.log(_flat(arr, 1));
