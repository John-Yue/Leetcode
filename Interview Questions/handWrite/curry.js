function curry(func, args) {
  const length = func.length;
  args = args || [];

  return function () {
    const _args = Array.from(arguments);
    args.push(..._args);

    if (args.length < length) {
      return curry.call(this, func, args);
    }

    return func.apply(this, args);
  };
}

function add(a, b, c) {
  console.log(a + b + c);
}

const adder = _curry(add);

console.log(adder(1)(2)(3));

function _curry(func, args) {
  const length = func.length;
  args = args || [];

  return function () {
    const _args = Array.prototype.slice.call(arguments);
    args.push(..._args);

    if (args.length < length) {
      return _curry.call(this, func, args);
    }

    return func.apply(this, args);
  };
}
