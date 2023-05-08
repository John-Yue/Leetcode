// 使用WeakMap，可以使得在下一次垃圾回收机制执行的时候，释放这块儿内存
function deepClone(target, map = new WeakMap()) {
  if (typeof target === "object") {
    // 兼容数组类型
    let cloneTarget = Array.isArray(target) ? [] : {};

    // 解决循环引用
    if (map.get(target)) {
      return map.get(target);
    }

    map.set(target, cloneTarget);

    for (const key in target) {
      cloneTarget[key] = deepClone(target[key], map);
    }

    return cloneTarget;
  } else {
    return target;
  }
}

// 优化for...in 的性能
function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }

  return array;
}

const target = {
  file1: 1,
  file2: undefined,
  dile3: {
    child: "child",
  },
  file4: [2, 3, 4],
};
target.target = target;

console.log("deepCloneTarget:", deepClone(target));
