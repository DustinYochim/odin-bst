# odin-bst

# JavaScript Binary Search Tree Project

This project implements a balanced Binary Search Tree (BST) in JavaScript. The code provided includes classes for building and manipulating a balanced BST. The project is part of **The Odin Project** curriculum.

## Features

- Build a Node class for storing data and children.
- Build a Tree class for creating a balanced BST from an array.
- Implement insertion and deletion methods for the tree.
- Implement traversal methods: level order, in order, pre order, post order.
- Calculate the height and depth of a node in the tree.
- Check if the tree is balanced and rebalance it if necessary.
- Include a prettyPrint function to visualize the tree's structure.

## Usage

To use this implementation, follow these steps:

1. Clone the repository or copy the provided code into your project.
2. Create a new instance of the `Tree` class by passing an array of unique and sorted values.
3. Use the various methods to manipulate and traverse the tree.

Example usage:

```javascript
let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// Create a new balanced Binary Search Tree
let tree = new Tree(arr);

// Print the tree structure
prettyPrint(tree.root);

// Check if the tree is balanced
console.log(tree.isBalanced());

// Traverse the tree in level order
console.log(tree.levelOrder());

// Traverse the tree in pre order
console.log(tree.preOrder());

// Traverse the tree in post order
console.log(tree.postOrder());

// Traverse the tree in in order
console.log(tree.inOrder());

// Insert values into the tree
tree.insert(6500);
tree.insert(7500);
tree.insert(8500);
tree.insert(9500);

// Print the updated tree structure
prettyPrint(tree.root);

// Check if the tree is balanced
console.log(tree.isBalanced());

// Rebalance the tree
tree.reBalance();

// Print the rebalanced tree structure
prettyPrint(tree.root);

// Check if the tree is balanced
console.log(tree.isBalanced());

// Traverse the rebalanced tree in level order
console.log(tree.levelOrder());

// Traverse the rebalanced tree in pre order
console.log(tree.preOrder());

// Traverse the rebalanced tree in post order
console.log(tree.postOrder());

// Traverse the rebalanced tree in in order
console.log(tree.inOrder());
