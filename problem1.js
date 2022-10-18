// Javascript program to find out smallest
// range that includes elements from
// each of the given sorted lists.
class Node {
    constructor(a, b, c) {
        this.ele = a;
        this.i = b;
        this.j = c;
    }
}

// A class for Min Heap
class MinHeap {
    // Array of elements in heap
    harr;
    // Size of min heap
    size;

    // Constructor: creates a min heap
    // of given size
    constructor(arr, size) {
        this.harr = arr;
        this.size = size;
        let i = Math.floor((size - 1) / 2);

        while (i >= 0) {
            this.MinHeapify(i);
            i--;
        }
    }

    // To get index of left child
    // of node at index i
    left(i) {
        return 2 * i + 1;
    }

    // To get index of right child
    // of node at index i
    right(i) {
        return 2 * i + 2;
    }

    // To heapify a subtree with
    // root at given index
    MinHeapify(i) {
        let l = this.left(i);
        let r = this.right(i);
        let small = i;

        if (l < this.size &&
            this.harr[l].ele <
            this.harr[i].ele)
            small = l;
        if (r < this.size &&
            this.harr[r].ele <
            this.harr[small].ele)
            small = r;
        if (small != i) {
            this.swap(small, i);
            this.MinHeapify(small);
        }
    }

    swap(i, j) {

        let temp = this.harr[i];
        this.harr[i] = this.harr[j];
        this.harr[j] = temp;
    }

    // To get the root
    getMin() {
        return this.harr[0];
    }

    // To replace root with new node x
    // and heapify() new root
    replaceMin(x) {
        this.harr[0] = x;
        this.MinHeapify(0);
    }

}
// This function takes an k sorted lists
// in the form of 2D array as an argument.
// It finds out smallest range that includes
// elements from each of the k lists.
function findSmallestRange(arr, k) {
    let range = Number.MAX_VALUE;
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    let start = -1, end = -1;
    let n = arr[0].length;

    // Create a min heap with k heap nodes.
    // Every heap node has first element of an list
    let arr1 = new Array(k);
    for (let i = 0; i < k; i++) {
        let node = new Node(arr[i][0], i, 1);
        arr1[i] = node;

        // Store max element
        max = Math.max(max, node.ele);
    }

    // Create the heap
    let mh = new MinHeap(arr1, k);

    // Now one by one get the minimum element
    // from min heap and replace it with
    // next element of its list
    while (true) {

        // Get the minimum element and
        // store it in output
        let root = mh.getMin();

        // Update min
        min = root.ele;

        // Update range
        if (range > max - min + 1) {
            range = max - min + 1;
            start = min;
            end = max;
        }

        // Find the next element that will
        // replace current root of heap.
        // The next element belongs to same
        // list as the current root.
        if (root.j < n) {
            root.ele = arr[root.i][root.j];
            root.j++;

            // Update max element
            if (root.ele > max)
                max = root.ele;
        }

        // Break if we have reached
        // end of any list
        else
            break;

        // Replace root with next element of list
        mh.replaceMin(root);
    }
    document.write("The smallest range is [" +
        start + " " + end + "]");
}

// Driver Code
let arr = [[4, 7, 9, 12, 15],
[0, 8, 10, 14, 20],
[6, 12, 16, 30, 50]];
let k = arr.length;

findSmallestRange(arr, k);

// This code is contributed by rag2127
