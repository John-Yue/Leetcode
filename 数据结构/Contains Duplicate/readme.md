# 题目描述  
判断给定的数组种是否有重复元素

# 思路

## 排序
数组排序后，判断数组相邻元素是否相等。
```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
    const _nums = nums.sort();
    for (let i = 0; i < _nums.length; i++) {
        if (_nums[i] === _nums[i + 1]) return true;
    }
    return false;
};
```

**时间复杂度:** $O(nlogn)$。即排序的时间复杂度。扫描的时间复杂度$O(n)$可忽略。

**空间复杂度:** $O(n)$。 没有用到额外空间。如果深究 Arrays.sort(nums) 使用了栈空间，那就是$O(logn)$。


## Map或者Set