function MinBinaryHeap() {
    this.content = [];
};

MinBinaryHeap.prototype.isEmpty = function() {
    return (this.content.length === 0);
};

MinBinaryHeap.prototype.swap = function(indexA, indexB) {
    var heap = this.content;
    var temp = heap[indexA];
    heap[indexA] = heap[indexB];
    heap[indexB] = temp;
};

MinBinaryHeap.prototype.upHeap = function(index) {
    if (index === 0) {
        return;
    }
    var parentIndex = Math.floor((index - 1) / 2);
    if (this.content[parentIndex].value > this.content[index].value) {
        this.swap(index, parentIndex);
        this.upHeap(parentIndex);
    }
};

MinBinaryHeap.prototype.downHeap = function(index) {
    var heap = this.content;
    var tail = heap.length - 1;

    if (index === tail) {
        return;
    }

    var lChildIndex = (index + 1) * 2 - 1;
    var lChild = heap[lChildIndex];
    var rChildIndex = lChildIndex + 1;
    var rChild = heap[rChildIndex];
    var smallerChildIndex;
    if (lChild && rChild) {
        smallerChildIndex = (lChild.value < rChild.value) ? lChildIndex : rChildIndex;
    } else if (lChild) {
        smallerChildIndex = lChildIndex;
    } else if (rChild) {
        smallerChildIndex = rChildIndex;
    } else {
        return;
    }

    if (heap[index].value > heap[smallerChildIndex].value) {
        this.swap(index, smallerChildIndex);
        this.downHeap(smallerChildIndex);
    }
};

MinBinaryHeap.prototype.findMinimum = function() {
    return this.content[0];
};

MinBinaryHeap.prototype.insert = function(node) {
    var heap = this.content;
    var tail = heap.length;
    heap.push(node);
    this.upHeap(tail);
};

MinBinaryHeap.prototype.extractMinimum = function() {
    this.extract(0);
};

MinBinaryHeap.prototype.extract = function(index) {
    var heap = this.content;
    var tail = heap.length - 1;
    this.swap(index, tail);
    var temp = heap.pop();
    this.downHeap(index);

    return temp;
};

MinBinaryHeap.prototype.delete = function(node) {
    return this.extract(this.content.indexOf(node));
};

MinBinaryHeap.prototype.checkHeap = function() {
    return this.content.some(function(cur, i, array) {
        if (i === 0) {
            return false;
        }
        var parentIndex = Math.floor((i - 1) / 2);
        if (array[parentIndex].value > cur.value) {
            return true;
        }

        return false;
    })
};

// module.exports = MinBinaryHeap;
