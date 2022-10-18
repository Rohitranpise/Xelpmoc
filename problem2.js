// JavaScript Program for The painter's
// partition problem

// Function to calculate sum between
// two indices in array
function sum(arr, from, to)
{
	let total = 0;
	for(let i = from; i <= to; i++)
		total += arr[i];
		
	return total;
}

// For n boards and k partitions
function partition(arr, n, k)
{
	
	// Base cases
	if (k == 1) // one partition
		return sum(arr, 0, n - 1);
	if (n == 1) // one board
		return arr[0];

	let best = Number.MAX_VALUE;

	// Find minimum of all possible maximum
	// k-1 partitions to the left of arr[i],
	// with i elements, put k-1 th divider
	// between arr[i-1] & arr[i] to get k-th
	// partition
	for(let i = 1; i <= n; i++)
		best = Math.min(best,
			Math.max(partition(arr, i, k - 1),
							sum(arr, i, n - 1)));

	return best;
}

// Driver Code
let arr = [ 10, 20, 60, 50, 30, 40 ];

// Calculate size of array.
let n = arr.length;
let k = 3;

console.log(partition(arr, n, k));


