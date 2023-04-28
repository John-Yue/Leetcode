/*
 * 节流函数
 * 在wait秒内最多只执行一次的函数
 *
 * 实现逻辑：1. 设置一个初始时间；
 *           2. 在返回函数中判断，如果当前时间超过初始时间，就执行函数；
 *           3. 重新更新初始时间；
 *           ps: 一开始初始时间为0，所以 currentTime - nowTime > wait 肯定成立，所以函数第一次肯定执行
 *               这一机制用到了闭包，用来保存初始时间。
 *
 */

function _throttle(fn, wait) {
  // 设置初始时间，初始时间为0
  let lastTime = 0;

  // 返回包装后的函数，利用闭包实现节流
  return function () {
    // 获取当前的时间
    const now = new Date().getTime();
    // 判断当前是和初始时间的时间差是不是大于了wait的时间；
    if (now - lastTime > wait) {
      // 执行函数
      fn.apply(this, arguments);

      // 这里为什么要用this？是为了传递参数吗？那这里的this指向是那里呢？
      console.log("this: ", this);

      lastTime = now;
    }
  };
}

/*
 * loadsh 中 throttle函数实现
 */
function loadsh_throttle(func, wait, options) {
  let leading = true;
  let trailing = true;

  // 判断当前的类型是不是函数
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  // 到这里就是使用防抖来实现的
}

// 需要防抖的函数
function test() {
  console.log(this.a);
}

const obj = {
  a: 1,
  test: test,
};

// 返回处理好的防抖函数
const throttledFunc = _throttle(test.bind(obj, 1), 1000);

// 记录时间点，然后5s后结束防抖。
const timeid = setInterval(throttledFunc, 10);
setTimeout(() => {
  clearInterval(timeid);
}, 5 * 1000);
