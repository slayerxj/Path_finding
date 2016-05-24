function MinHeap() {
    this.content = [];
};

MinHeap.prototype.isEmpty = function() {
    return (this.content.length === 0);
};

MinHeap.prototype.swap = function(indexA, indexB) {
    var heap = this.content;
    var temp = heap[indexA];
    heap[indexA] = heap[indexB];
    heap[indexB] = temp;
};

MinHeap.prototype.upHeap = function(index) {
    if (index === 0) {
        return;
    }
    var parentIndex = Math.floor((index - 1) / 2);
    if (this.content[parentIndex].value > this.content[index].value) {
        this.swap(index, parentIndex);
        this.upHeap(parentIndex);
    }
};

MinHeap.prototype.downHeap = function(index) {
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

MinHeap.prototype.findMinimum = function() {
    return this.content[0];
};

MinHeap.prototype.insert = function(node) {
    var heap = this.content;
    var tail = heap.length;
    heap.push(node);
    this.upHeap(tail);
};

MinHeap.prototype.extractMinimum = function(index) {
    this.extract(0);
};

MinHeap.prototype.extract = function(index) {
    var heap = this.content;
    var tail = heap.length - 1;
    this.swap(index, tail);
    var temp = heap.pop();
    this.downHeap(index);

    return temp;
};

MinHeap.prototype.delete = function(node) {
    return this.extract(this.content.indexOf(node));
};

MinHeap.prototype.checkHeap = function() {
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

// module.exports = MinHeap;
