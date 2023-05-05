function _instanceOf(instance, classOrFunc) {
  if (typeof instance !== "object" || instance == null) return false;

  let proto = Object.getPrototypeOf(instance);

  while (proto) {
    if (proto == classOrFunc.prototype) return true;

    proto == Object.getPrototypeof(proto);
  }

  return false;
}

console.log("test:", _instanceOf(null, Array));
console.log("test:", _instanceOf([], Array));
