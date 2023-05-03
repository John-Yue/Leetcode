/*
 * 防抖函数
 * 创建一个防抖函数，该函数从上次被调用后，延迟wait毫秒后调用func方法。
 *
 */

function sample_debounce(fn, wait) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, wait);
  };
}

// console.log(sample_debounce);
// 简单防抖函数测试
// function test() {
//   console.log("debounced func");
// }
//
// const debouncedFunc = sample_debounce(test, 500);
//
// const intervalTimerId = setInterval(debouncedFunc, 499);
//
// setTimeout(() => {
//   clearInterval(intervalTimerId);
//   clearTimeout(intervalTimerId);
// }, 5 * 1000);
console.time("time");
const p1 = Promise.resolve(
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("p1, test");
    }, 502);
  })
);
const p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 503, "foo");
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("seccuss~");
  }, 500);
});

const promises = [p1, p2, p3];

console.time("all");
Promise.all(promises).then((res) => {
  console.log("Promise.all func:");
  console.log(res);
});
console.timeEnd("all");

console.time("allSettled");
Promise.allSettled(promises).then((res) => {
  console.log("Promise.allSettled func:");
  console.log(res);
});
console.timeEnd("allSettled");

console.time("race");
Promise.race(promises).then((res) => {
  console.log("Promise.race func:");
  console.log(res);
});
console.timeEnd("race");

console.timeEnd("time");
