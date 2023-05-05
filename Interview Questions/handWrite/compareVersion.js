/*
 * 比较版本号
 * case1: version1 = "1.01", version2 = "1.001";
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
// function compareVersion(version1, version2) {
//   const v1 = version1.split(".").map((v) => v * 1);
//   const v2 = version2.split(".").map((v) => v * 1);
// }

const arr = ["0.1.1", "2.3.3", "0.302.1", "4.2", "4.3.5", "4.3.4.5"];
arr.sort((a, b) => (a > b ? -1 : 1));
console.log(arr);
