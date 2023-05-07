/**
 * @function lengthOfLongestSubstring
 * @describe 给定一个字符串`s`，请找出其中不含有重复字符串的最长字符串的长度
 * @param {strin} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  const map = new Map();
  let result = 0;
  for (let i = 0; i < s.length; ++i) {
    map.clear();
    for (let j = i; j < s.length; ++j) {
      const char = s[j].charCodeAt();
      if (!map.has(char)) {
        map.set(char, 1);
        result = map.size > result ? map.size : result;
      } else {
        break;
      }
    }
  }
  return result;
}

export { lengthOfLongestSubstring };
