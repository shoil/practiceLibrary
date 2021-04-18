/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const res = new ListNode();
  res.val = l1.val + l2.val;
  res.next =
};
// @lc code=end
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
const l1 = new ListNode(2);
l1.next = new ListNode(4);
l1.next.next = new ListNode(3); 
const l2 = new ListNode(5);
l2.next = new ListNode(6);
l2.next.next = new ListNode(4);
