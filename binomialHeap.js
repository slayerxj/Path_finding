function BinomialHeapNode() {
    this.value = 0;
    this.parent = null;
    this.child = null;
    this.sibling = null;
};

function binomialTree() {
    this.root = 0;
    this.order = 0;
};

function BinomialHeap() {
    this.keyNum = 0;
    this.min = 0;
    this.maxNumOfDegree = 0;
    this.cons = null;
};

BinomialHeap.prototype.makeHeap = function() {

};

BinomialHeap.prototype.union = function(fibHeap) {
    this.min
};

BinomialHeap.prototype.insert = function(node) {
    var newFibHeap = new BinomialHeap();
    newFibHeap.min = node;
    this.union(newFibHeap);
};
var swap = function (nodeA, nodeB) {
    tempParent = nodeA.parent;
    tempChild = nodeA.child;
    tempSibling = nodeA.sibling;

}
BinomialHeap.prototype.decreaseKey = function(node) {
while(node.value < node.parent.value) {
    node
}
};

BinomialHeap.prototype.extractMin = function() {

};

module.exports = BinomialHeap;
