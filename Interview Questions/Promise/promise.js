/*
 * Promise 基础题目
 */

/*
 * Event Loop
 * 1. 一开始整个脚本作为一个宏任务执行。也就是同步代码执行完成，先执行微任务队列
 * 2. 执行过程中，同步代码直接执行，宏任务进入宏任务队列，微任务进入伪任务队列。
 * 3. 当前宏任务执行完出队，检查微任务列表，有则依次执行，直到执行完成。
 * 4. 执行浏览器UI线程的渲染工作。
 * 5. 检查是否有Web Worker任务，有则执行。
 * 6. 执行完成本轮宏任务，执行宏任务队列的下一个，依次循环，直到宏任务和微任务队列都为空。
 * ps: 第3步的意思是：当前一个宏任务执行完成后，就去检查微任务队列，微任务队列执行完后，才继续执行下一个宏任务！！！
 */

// {
//   console.log("--------------------------------");
//
//   // 主要是查看Promise的构造器函数是同步执行函数，
//   // 在实力化Promise对象的时候，就会执行(resolve, reject) => {} ,
//   // Promise中的resolve和reject函数是改变Promise对象状态的函数。
//   // 没有resolve和reject执行，Promise对象的状态一直是`pending`.
//   // 如果一直是pending状态的话，then是不会执行的
//
//   // resolve和reject执行，是保存状态，等执行微任务队列的时候，判断
//   // resolve和reject有没有执行，如果状态变成了，执行then
//   const p1 = new Promise((resolve, reject) => {
//     console.log("p1");
//   });
//
//   console.log(p1);
// }

// {
//   console.log("--------------------------------");
//
//   const p = new Promise((resolve, reject) => {
//     // 构造器函数同步执行
//     console.log(1);
//     // 这里改变了promise对象的状态，所以promise对象的then方法会执行。
//     // resolve("seccuss~");
//
//     // 什么改变promise对象的状态，什么时候执行then方法
//     // 测试
//     setTimeout(() => {
//       resolve("seccuss~");
//     }, 4 * 1000);
//
//     console.log(2);
//   });
//   p.then((res) => {
//     // 微任务
//     console.log(3, res);
//   });
//   console.log(4);
// }

// {
//   console.log("--------------------------------");
//
//   const p = new Promise((resolve, reject) => {
//     console.log(1);
//     console.log(2);
//   });
//   p.then(() => {
//     // 因为上面实例化promise对象的时候，没有更改promise对象状态的逻辑
//     // 所以会导致promise对象的then方法不会调用。
//     console.log(3);
//   });
//   console.log(4);
// }

// {
//   console.log("--------------------------------");
//   setTimeout(() => {
//     console.log("马上执行");
//   }, 0);
//   const p1 = new Promise((resolve, reject) => {
//     console.log("promise1");
//     resolve("resolve1");
//   });
//
//   // 也就是说，当promise对象的状态改变，其then方法（只要有调用）就一定会
//   // 执行。
//   const p2 = p1.then((res) => {
//     console.log(res);
//   });
//
//   console.log("1", p1);
//   console.log("2", p2);
//
//   // 这里是同步函数
//   // 同步代码执行完，先执行微任务!
// }

// {
//   console.log("--------------------------------");
//   /*
//    * 刚开始，整个脚本作为一个宏任务来执行，也就是同步代码直接
//    * 压栈执行.
//    * 然后是微任务列表!
//    * 然后是宏任务
//    */
//
//   console.log("start");
//   setTimeout(() => {
//     console.log("time");
//   });
//   Promise.resolve().then(() => {
//     console.log("resolve");
//   });
//   console.log("end");
//
//   /**
//    * 输出顺序：
//    * start
//    * end
//    * resolve
//    * time
//    */
// }

// {
//   const p = new Promise((resolve, reject) => {
//     console.log(1);
//     setTimeout(() => {
//       console.log("timeStart");
//       resolve("success");
//       console.log("timeEnd");
//     }, 0);
//     console.log(2);
//   });
//
//   p.then((res) => {
//     console.log(res);
//   });
//
//   console.log(4);
//
//   /*
//    * 简述上述代码执行流程：
//    * 1. 整段代码作为一个宏任务执行，开始执行同步代码。
//    * 2. 从上之下，先实例化Promise对象，然后同步执行Promise中构造器方法。
//    * 3. 同步打印`1`，
//    * 4. 遇到setTimeout，把setTimeout中的方法放到宏任务队列中。
//    * 5. 同步打印`2`，
//    * 6. promise.then是微任务，把then中的方法放到微任务队列中。
//    * 7. 同步打印`4`，
//    * 8. 同步代码执行完毕，也就是整段脚本作为一个宏任务执行完毕，开始执行微任务队列中的微任务。
//    * 9. 微任务队列中promise.then因为promise对象没有更改状态(PromiseStatus)，所以then方法不能执行。
//    * 10. 微任务队列执行完毕，开始执行宏任务队列任务。
//    * 11. 同步打印`timeStart`,
//    * 12. `resolve`将promise对象的状态改为成功，且保存结果。并把promise.then推入微任务队列当中。
//    * 13. 同步打印`timeEnd`
//    * 14. 同步代码执行完毕，开始执行微任务队列。
//    * 15. 执行promise.then，打印`success`
//    */
// }

// {
//   const p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("success");
//     }, 1000);
//   });
//
//   const p2 = p1.then(() => {
//     throw new Error("error!!!");
//   });
//
//   console.log("p1", p1);
//   console.log("p2", p2);
//
//   setTimeout(() => {
//     console.log("p1", p1);
//     console.log("p2", p2);
//   }, 2000);
// }

/*
 * 手写Promise
 */

{
  class _Promise {
    static PENDING = "pending";
    static FULFILLED = "fulfilled";
    static REJECTED = "rejected";

    constructor(func) {
      // promise的状态
      this.PromiseState = _Promise.PENDING;
      // promise的结果参数
      this.PromiseResult = null;

      this.onFulfilledCallbacks = [];
      this.onRejectedCallbacks = [];

      try {
        // 执行器函数，同步执行函数
        // 1. 为什么需要bind方法更改this的指向？
        // 这里执行是创建实例后再执行的，所以要绑定this
        // 这里需要查看constructor的运行原理！！！
        func(this.resolve.bind(this), this.reject.bind(this));
      } catch (error) {
        // 这里不需要给reject()方法进行this绑定，因为这里是直接执行
        // 而不是创建实例后再执行
        this.reject(error);
      }
    }

    resolve(result) {
      if (this.PromiseState === _Promise.PENDING) {
        this.PromiseState = _Promise.FULFILLED;
        this.PromiseResult = result;
        this.onFulfilledCallbacks.forEach((callback) => {
          callback(result);
        });
      }
    }
    reject(reason) {
      if (this.PromiseState === _Promise.PENDING) {
        this.PromiseState = _Promise.REJECTED;
        this.PromiseResult = reason;
        this.onRejectedCallbacks.forEach((callback) => {
          callback(reason);
        });
      }
    }

    then(onFulfilled, onRejected) {
      onFulfilled =
        typeof onFulfilled === "function" ? onFulfilled : (value) => value;

      onRejected =
        typeof onRejected === "function"
          ? onRejected
          : (reason) => {
              throw reason;
            };

      const _promise2 = new _Promise((resolve, reject) => {
        if (this.PromiseState === _Promise.PENDING) {
          this.onFulfilledCallbacks.push(() => {
            setTimeout(() => {
              let x = onFulfilled(this.PromiseResult);
              resolvePromise(_promise2, x, resolve, reject);
            });
          });
          this.onRejectedCallbacks.push(() => {
            setTimeout(() => {
              let x = onRejected(this.PromiseResult);
              resolvePromise(_promise2, x, resolve, reject);
            });
          });
        }

        if (this.PromiseState === _Promise.FULFILLED) {
          setTimeout(() => {
            onFulfilled(this.PromiseResult);
          });
        }
        if (this.PromiseState === _Promise.REJECTED) {
          setTimeout(() => {
            onRejected(this.PromiseResult);
          });
        }
      });

      return _promise2;
    }
  }

  /**
   * 对resolve()、reject() 进行改造增强 针对resolve()和reject()中不同值情况进行处理
   * @param {promise} promise2 promise1.then方法返回的新的promise对象
   * TODO: 手撕Promise实现-> 实现then返回promise对象的问题！
   */
  function resolvePromise(promise2, x, resolve, reject) {}

  console.log(1);
  const p1 = new _Promise((resolve, reject) => {
    console.log(2);
    setTimeout(() => {
      resolve("这次一定");
      console.log(4);
    });
  });

  p1.then(
    (result) => {
      console.log("fulfilled:", result);
    },
    (reason) => {
      console.log("rejected:", reason);
    }
  );
  console.log(3);
  // const p2 = new _Promise((resolve, reject) => {
  //   reject("这次一定");
  // });
  // console.log(p2);
}

// {
//   console.log("--------------------------------");
//
//   const p1 = new Promise((resolve, reject) => {
//     // 这里执行
//     resolve("一键三连");
//   });
//   console.log(p1);
//
//   const p2 = new Promise((resolve, reject) => {
//     reject("这次一定");
//   });
//   console.log(p2);
// }
