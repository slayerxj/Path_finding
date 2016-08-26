function PairingHeap() {
    this.element = null;
    this.subHeaps = [];
};

PairingHeap.merge = function (heap1, heap2) {
    if ((heap1 === null) && (heap2 === null)) {
        return null;
    } else if (heap1 === null) {
        return heap2;
    } else if (heap2 === null) {
        return heap1;
    }

    if (heap1.element.value > heap2.element.value) {
        heap2.subHeaps.push(heap1);
        return heap2;
    } else {
        heap1.subHeaps.push(heap2);
        return heap1;
    }
};

PairingHeap.mergePairs = function (heaps) {
    if (heaps.length === 0) {
        return null;
    } else if (heaps.length === 1) {
        return heaps[0];
    } else {
        return PairingHeap.merge(PairingHeap.merge(heaps[0], heaps[1]), PairingHeap.mergePairs((heaps.splice(0, 2), heaps)));
    }
};

PairingHeap.prototype.insert = function (node) {
    if (this.element === null) {
        this.element = node;
        return;
    }

    var oneElementHeap = new PairingHeap();

    if (this.element.value > node.value) {
        oneElementHeap.element = this.element;
        this.element = node;
    } else {
        oneElementHeap.element = node;
    }
    this.subHeaps.push(oneElementHeap);
};

PairingHeap.prototype.extractMinimum = function () {
    var minimum = this.element;
    return PairingHeap.mergePairs(this.subHeaps);
};

// module.exports = PairingHeap;
