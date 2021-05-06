/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let ret = [...nums1, ...nums2];
  let retisEven = ret.length % 2;
  ret.sort((a, b) => a - b);
  console.log(ret);
  let num;
  if (retisEven == 1) {
    num = ret[(ret.length + 1) / 2 - 1];
    return num;
  } else if (retisEven == 0) {
    num = (ret[ret.length / 2] + ret[ret.length / 2 + 1]) / 2;
    return num;
  }
};
// @lc code=end

findMedianSortedArrays([1, 2], [3, 4]);
