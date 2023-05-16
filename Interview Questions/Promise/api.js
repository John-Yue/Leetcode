MyPromise.resolve = function (paramter) {
  if (paramter instanceof MyPromise) {
    return paramter;
  }

  return new MyPromise(function (resovle) {
    resolve(paramter);
  });
};

MyPromise.reject = function (reason) {
  return new MyPromise(function (resolve, reject) {
    reject(reason);
  });
};

MyPromise.all = function (promiseList) {
  var resPromise = new MyPromise(function (resolve, reject) {
    let count = 0;
    const result = [];
    let length = promiseList.length;

    if (length === 0) {
      return resolve(result);
    }

    promiseList.forEach(function (promise, index) {
      MyPromise.resolve(promise).then(
        function (value) {
          count++;
          result[index] = value;
          if (count === length) {
            resolve(result);
          }
        },
        function (reason) {
          reject(reason);
        }
      );
    });
  });
  return resPromise;
};

MyPromise.race = function (promiseList) {
  return new MyPromise((resolve, reject) => {
    const length = promiseList.length;

    if (length === 0) return resolve();

    promiseList.forEach((promise) => {
      MyPromise.resolve(promise).then(
        (value) => {
          resolve(value);
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  });
};

MyPromise.catch = function (onRejected) {
  this.then(null, onRejected);
};

MyPromise.finally = function (fn) {
  return this.then((value) => {
    return MyPromise.resolve(fn()).then(
      function () {
        return value;
      },
      function (error) {
        return MyPromise.resolve(fn()).then(function () {
          throw error;
        });
      }
    );
  });
};

MyPromise.allSettled = function (promiseList) {
  return new MyPromise(function (resolve) {
    const length = promiseList.length;
    const result = [];
    let count = 0;

    if (length === 0) return resolve(result);

    promiseList.forEach((promise, index) => {
      MyPromise.resolve(promise).then(
        (value) => {
          count++;
          result[index] = {
            status: "fulfilled",
            value,
          };

          if (count === length) {
            return resolve(result);
          }
        },
        (reason) => {
          count++;
          result[index] = {
            status: "rejected",
            reason,
          };

          if (count === length) return resolve(result);
        }
      );
    });
  });
};
