function Node(x, y, closed) {
    this.x = x;
    this.y = y;
    this.open = false;
    this.closed = closed;
    this.fScore = 0;
    this.gScore = 0;
    this.inertia = -1;
}

// module.exports = Node;
