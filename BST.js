import { mergeSort } from "./mergeSort.js";

const generateArray = () => {
	let array = [];

	for (let i = 0; i < 20; i++) {
		let newNumber = Math.floor(Math.random() * 100);
		array.push(newNumber);
	}
	return array;
};

const prepArray = (array) => {
	return mergeSort(
		array.filter((value, index) => array.indexOf(value) === index)
	);
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};

const node = (value, left = null, right = null) => {
	return { value, left, right };
};

const tree = () => {
	let rootNode = null;

	const getTree = () => {
		return rootNode;
	};
	const buildTree = (treeArray, start = 0, end = treeArray.length - 1) => {
		if (start > end) {
			return null;
		}
		let mid = Math.floor((start + end) / 2);
		let root = node(treeArray[mid]);

		root.left = buildTree(treeArray, start, mid - 1);
		root.right = buildTree(treeArray, mid + 1, end);
		rootNode = root;

		return root;
	};

	const insert = (value, root = rootNode) => {
		if (value < root.value) {
			if (root.left !== null) {
				insert(value, root.left);
			} else {
				root.left = node(value);
				return;
			}
		} else if (value > root.value) {
			if (root.right !== null) {
				insert(value, root.right);
			} else {
				root.right = node(value);
				return;
			}
		}
	};

	const deleteNode = (value, root = rootNode) => {
		if (root === null) {
			return root;
		}

		if (root.value > value) {
			root.left = deleteNode(value, root.left);
			return root;
		} else if (root.value < value) {
			root.right = deleteNode(value, root.right);
			return root;
		}

		if (root.left === null) {
			return (temp = root.right);
		} else if (root.right === null) {
			return (temp = root.left);
		} else {
			let succParent = root;
			let succ = root.right;

			while (succ.left !== null) {
				succParent = succ;
				succ = succ.left;
			}
			if (succParent !== root) {
				succParent.left = succ.right;
			} else {
				succParent.right = succ.right;
			}

			root.value = succ.value;
			return root;
		}
	};
	const find = (value, root = rootNode) => {
		if (root === null) {
			return "Value not found in tree";
		}
		if (root.value === value) {
			return root;
		}

		if (value < root.value) {
			return find(value, root.left);
		} else if (value > root.value) {
			return find(value, root.right);
		}
	};

	const levelOrder = (root = rootNode) => {
		if (root === null) {
			return;
		}

		let queue = [];
		let result = [];

		queue.push(root);
		while (queue.length > 0) {
			let current = queue[0];
			result.push(current.value);
			if (current.left !== null) {
				queue.push(current.left);
			}
			if (current.right !== null) {
				queue.push(current.right);
			}
			queue.shift();
		}
		return result;
	};

	const inOrder = (root = rootNode, result = []) => {
		if (root === null) {
			return;
		}

		if (root.left !== null) {
			inOrder(root.left, result);
		}
		result.push(root.value);

		if (root.right !== null) {
			inOrder(root.right, result);
		}

		return result;
	};

	const preOrder = (root = rootNode, result = []) => {
		if (root === null) {
			return;
		}

		result.push(root.value);
		if (root.left !== null) {
			preOrder(root.left, result);
		}

		if (root.right !== null) {
			preOrder(root.right, result);
		}

		return result;
	};

	const postOrder = (root = rootNode, result = []) => {
		if (root === null) {
			return;
		}

		if (root.left !== null) {
			postOrder(root.left, result);
		}
		if (root.right !== null) {
			postOrder(root.right, result);
		}
		result.push(root.value);
		return result;
	};

	const findHeight = (node) => {
		let rightHeight = 0;
		let leftHeight = 0;
		if (node === null || (node.left === null && node.right === null)) return 0;

		if (node.left !== null) {
			leftHeight = findHeight(node.left);
		}
		if (node.right !== null) {
			rightHeight = findHeight(node.right);
		}
		if (leftHeight > rightHeight) {
			return leftHeight + 1;
		} else {
			return rightHeight + 1;
		}
	};

	const findDepth = (node, root = rootNode) => {
		if (node === null) {
			return 0;
		}

		let depth = 0;

		if (node === root) {
			return depth;
		}

		if (node.value < root.value) {
			depth = findDepth(node, root.left);
		}

		if (node.value > root.value) {
			depth = findDepth(node, root.right);
		}

		return depth + 1;
	};

	const isBalanced = (node = rootNode) => {
		if (node === null) {
			return;
		}

		let difference = Math.abs(findHeight(node.left) - findHeight(node.right));
		if (node.left !== null) {
			isBalanced(node.left);
		}

		if (node.right !== null) {
			isBalanced(node.right);
		}

		if (difference > 1) {
			return "The Tree is NOT balanced!";
		} else {
			return "The tree is balanced!";
		}
	};

	const rebalance = () => {
		buildTree(inOrder());
	};

	return {
		buildTree,
		insert,
		getTree,
		deleteNode,
		find,
		levelOrder,
		inOrder,
		preOrder,
		postOrder,
		findHeight,
		findDepth,
		isBalanced,
		rebalance,
	};
};

let newTree = tree();

newTree.buildTree(prepArray(generateArray()));
prettyPrint(newTree.getTree());
console.log(newTree.isBalanced());
console.log("Level Order");
console.log("-----------------------------------");
console.log(newTree.levelOrder());
console.log("Pre Order");
console.log("-----------------------------------");
console.log(newTree.preOrder());
console.log("Post Order");
console.log("-----------------------------------");
console.log(newTree.postOrder());
console.log("In Order");
console.log("-----------------------------------");
console.log(newTree.inOrder());
newTree.insert(101);
newTree.insert(200);
newTree.insert(300);
prettyPrint(newTree.getTree());
console.log(newTree.isBalanced());
newTree.rebalance();
prettyPrint(newTree.getTree());
console.log(newTree.isBalanced());
console.log("Level Order");
console.log("-----------------------------------");
console.log(newTree.levelOrder());
console.log("Pre Order");
console.log("-----------------------------------");
console.log(newTree.preOrder());
console.log("Post Order");
console.log("-----------------------------------");
console.log(newTree.postOrder());
console.log("In Order");
console.log("-----------------------------------");
console.log(newTree.inOrder());
