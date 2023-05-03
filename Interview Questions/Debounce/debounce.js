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

console.log(sample_debounce);
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
