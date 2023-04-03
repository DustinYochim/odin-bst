class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.arr = this.uniqueSort(arr);
    this.root = this.buildTree(this.arr, 0, this.arr.length - 1);
  }
  uniqueSort(arr) {
    const map = {};
    const res = [];
    for (let i = 0; i < arr.length; i++) {
      if (!map[arr[i]]) {
        map[arr[i]] = true;
        res.push(arr[i]);
      }
    }
    return res.sort((a, b) => a - b);
  }
  buildTree(arr, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);

    const node = new Node(arr[mid]);

    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);

    return node;
  }
  insert(key) {
    let node = new Node(key);
    let previous = this.root;
    let current = this.root;
    while (current) {
      if (key < current.data) {
        previous = current;
        current = current.left;
      } else {
        previous = current;
        current = current.right;
      }
    }
    current = node;
    if (previous.data < current.data) {
      previous.right = current;
    } else {
      previous.left = current;
    }
  }
  minValueNode(node) {
    const current = node;

    while (current && current.left !== null) {
      current = current.left;
    }
    return current;
  }
  delete(key, root = this.root) {
    // Base Case
    if (root === null) return root;

    // Navigate to Node to be deleted
    if (key < root.data) root.left = this.delete(key, root.left);
    else if (key > root.data) root.right = this.delete(key, root.right);
    // Node to be deleted is the leaf
    else {
      if (root.left === null && root.right === null) return null;
      // Node to be deleted has only one child
      else if (root.right === null) return root.left;
      else if (root.left === null) return root.right;
      // Node to be deleted has two children
      const temp = this.minValueNode(root.right);
      root.data = temp.data;
      root.right = this.delete(temp.data, root.right);
    }
    return root;
  }
  find(key) {
    let current = this.root;

    while (current) {
      if (key < current.data) {
        current = current.left;
      } else if (key > current.data) {
        current = current.right;
      } else {
        return current;
      }
    }
    return null;
  }
  levelOrder(fnc) {
    //  traverse the tree in breadth-first level order and provide each node as the argument to the provided function.
    let queue = [this.root];
    let arr = [];
    let current;
    while (queue.length > 0) {
      // Get first element from queue
      current = queue.shift();
      arr.push(current.data);
      if (fnc) fnc(current);
      // Add current elements children to the queue
      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
    return arr;
  }
  inOrder(fnc, arr = [], root = this.root) {
    // left -> root -> right

    // Base Case
    if (root === null) return;
    // 1. Visit left sub-tree
    this.inOrder(fnc, arr, root.left);
    // 2. Visit root
    arr.push(root.data);
    if (fnc) fnc(root.data);
    // 3. Visit right sub-tree
    this.inOrder(fnc, arr, root.right);

    // Return arr
    return arr;
  }
  preOrder(fnc, arr = [], root = this.root) {
    // root -> left -> right

    // Base Case
    if (root === null) return;
    // 1. Visit root
    arr.push(root.data);
    if (fnc) fnc(root.data);
    // 2. Visit left sub-tree
    this.preOrder(fnc, arr, root.left);
    // 3. Visit right sub-tree
    this.preOrder(fnc, arr, root.right);

    // Return arr
    return arr;
  }
  postOrder(fnc, arr = [], root = this.root) {
    // left -> right -> root

    // Base Case
    if (root === null) return;

    // 1. Visit left sub-tree
    this.postOrder(fnc, arr, root.left);
    // 2. Visit right sub-tree
    this.postOrder(fnc, arr, root.right);
    // 3. Visit root
    arr.push(root.data);
    if (fnc) fnc(root.data);

    // Return array
    return arr;
  }
  height(root = this.root) {
    // Base Case
    if (root === null) return -1;

    // Recursive Cases
    let leftHeight = this.height(root.left);
    let rightHeight = this.height(root.right);

    // Return
    return Math.max(leftHeight, rightHeight) + 1;
  }
  depth(root = this.root) {
    let distance = 0;
    let current = this.root;

    while (current) {
      if (root.data < current.data) {
        current = current.left;
        distance++;
      } else if (root.data > current.data) {
        current = current.right;
        distance++;
      } else {
        return distance;
      }
    }
  }
  isBalanced() {}
  reBalance() {}
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let tree = new Tree(arr);
prettyPrint(tree.root);
console.log(tree.height(tree.root));
console.log(tree.depth(tree.root));
