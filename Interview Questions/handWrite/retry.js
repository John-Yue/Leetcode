/**
 * 实现Promise.retry, 成功后resolve结果，失败后重试，尝试一定次数才真正的reject
 */

Promise.retry = function (promiseFn, times = 3) {
  return new Promise(async (resolve, reject) => {
    while (times--) {
      try {
        let res = await promiseFn();
        resolve(res);
        break;
      } catch (e) {
        if (!times) reject(e);
      }
    }
  });
};
