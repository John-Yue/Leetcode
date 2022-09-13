/**
 * @param {number[]} nums
 * @return {boolean}
 */
// var containsDuplicate = function (nums) {
//     return new Set(nums).size !== nums.length;
// };

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

const nums = [1, 2, 3, 4];
console.log(containsDuplicate(nums));
