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
tree.insert(2);
tree.insert(13);
prettyPrint(tree.root);
tree.delete(9);
prettyPrint(tree.root);
