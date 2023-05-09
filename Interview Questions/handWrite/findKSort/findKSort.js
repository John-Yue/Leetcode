/**
 * 分而治之、减而治之
 * 快排
 */
function findKSort1(nums, k) {
  // 改变了数组的结构
  // 如果是用Array默认的排序算法，在Chrome浏览器中用的
  // 应该是插入排序和快排。length<10的数组使用插入排序的稳定排序
  return nums.sort((a, b) => b - a)[k - 1];
}

const nums = [3, 2, 1, 5, 6, 4];
const k = 2;

console.log(findKSort1(nums, k));
