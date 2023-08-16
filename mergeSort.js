//if number of elements is less than 2 return
//else
//sort left half of elements
//sort right half of elements
//merge sorted halves

const list = [38, 27, 43, 10, 10000];

const merge = (left, right) => {
	let sortedArray = [];
	let i = 0;
	let j = 0;

	let leftLength = left.length;
	let rightLength = right.length;

	while (i < leftLength && j < rightLength) {
		if (left[i] < right[j]) {
			sortedArray.push(left[i++]);
		} else {
			sortedArray.push(right[j++]);
		}
	}

	while (i < leftLength) {
		sortedArray.push(left[i++]);
	}

	while (j < rightLength) {
		sortedArray.push(right[j++]);
	}
	return sortedArray;
};

export const mergeSort = (array) => {
	const mid = Math.floor(array.length / 2);
	let left = array.slice(0, mid);
	let right = array.slice(mid);

	if (array.length < 2) {
		return array;
	} else {
	}
	return merge(mergeSort(left), mergeSort(right));
};
