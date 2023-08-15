import { mergeSort } from "./mergeSort.js";

let arrayToBalance = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const removeDupes = (array) => {
	return array.filter((value, index) => array.indexOf(value) === index);

	// console.log(array);
};

const node = (value, left = null, right = null) => {
	return { value, left, right };
};

const tree = (array) => {
	const buildTree = (treeArray, start = 0, end = treeArray.length - 1) => {
		if (start > end) {
			return null;
		}
		let mid = Math.floor((start + end) / 2);
		let root = node(array[mid]);

		root.left = buildTree(array, start, mid - 1);
		root.right = buildTree(array, mid + 1, end);

		return root;
	};

	return buildTree(array);
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

prettyPrint(tree(mergeSort(removeDupes(arrayToBalance))));
//need treeNode factory function / class
//has left / right node / value
//left / right start as null

// initialise start= 0 end = array length -1
// set mid to (start+end) /2
// create tree node with mid as root (THIS IS A)
//Recursively do this:
//calculate mid of left subarray make it root of left subtree of A
//calculate mid of right subarray make it root of right subtree of A
