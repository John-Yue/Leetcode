/**
 * 二叉树的层序遍历
 * @param {TreeNode} root
 * @param {number [][]}
 */
function levelOrder(root) {
  // 队列
  const q = [];
  const result = [];
  if (root != null) {
    q.push(root);
  }
  while (q.length) {
    let n = q.length;
    const level = [];
    while (n) {
      const node = q.shift();
      level.push(node.val);
      if (node.left) {
        q.push(node.left);
      }
      if (node.right) {
        q.push(node.right);
      }

      n -= 1;
    }
    result.push(level);
  }

  return result;
}
