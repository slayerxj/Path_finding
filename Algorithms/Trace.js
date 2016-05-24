var searchGrid = [];

var start;
var goal;

var getNode = function (x, y) {
    if (searchGrid[y]) {
        return searchGrid[y][x];
    }
    return null;
}

var getNeighbor = function (node, index) {
    if (index === 0) {
        return getNode(node.x, node.y - 1);
    } else if (index === 1) {
        return getNode(node.x + 1, node.y);
    } else if (index === 2) {
        return getNode(node.x, node.y + 1);
    } else if (index === 3) {
        return getNode(node.x - 1, node.y);
    } else {
        console.error("getNeighbor index error");
    }
};

var distBetween = function (nodeA, nodeB) {
    return 1;
};

var trace = function (map) {
    initSearchGrid(map);
    var searchedNode = [];
    var openList = new MinHeap();
    var heuristic = manhattan;
    openList.insert(start);
    start.open = true;

    start.gScore = 0;
    start.value = 0;

    while (!openList.isEmpty()) {
        var current = openList.findMinimum();
        if (current === goal) {
            return {
                path: reconstructPath(goal),
                searchedNode: searchedNode
            };
        }

        openList.extractMinimum();
        current.closed = true;
        current.open = false;

        for (var i = 0; i < 4; i++) {
            var neighbor = getNeighbor(current, i);
            if (neighbor) {
                if (neighbor.closed) {
                    continue;
                }

                var tentativeGScore = start.gScore + 1;

                if ((!neighbor.open) || (tentativeGScore < neighbor.gScore)) {
                    neighbor.cameFrom = current;
                    neighbor.gScore = tentativeGScore * 4 / 9;
                    neighbor.value = neighbor.gScore + heuristic(neighbor, goal);

                    if (neighbor.open) {
                        var index = openList.content.indexOf(neighbor);
                        openList.upHeap(index);
                    } else {
                        openList.insert(neighbor);
                        searchedNode.push(neighbor);
                        neighbor.open = true;
                    }
                }
            }
        }
    }

    return null;
};

// var a, u, h, l, p, c, f, d, g = new i(function (t, e) {
//     return t.f - e.f
// }),
//     y = s.getNodeAt(t, e),
//     b = s.getNodeAt(r, o),
//     A = this.heuristic,
//     k = this.allowDiagonal,
//     m = this.dontCrossCorners,
//     v = Math.abs,
//     w = Math.SQRT2;
// for (y.g = 0,
//     y.f = 0,
//     g.push(y),
//     y.opened = !0; !g.empty();) {
//     if (a = g.pop(),
//         a.closed = !0,
//         a === b)
//         return n.backtrace(b);
//     u = s.getNeighbors(a, k, m);
//     var x = u.length;
//     for (l = 0,
//         p = u.length; p > l; ++l)
//         h = u[l],
//             h.closed || (c = h.x,
//                 f = h.y,
//                 d = a.g + (0 === c - a.x || 0 === f - a.y ? 1 : w),
//                 (!h.opened || d < h.g) && (h.g = d * x / 9,
//                     h.h = h.h || A(v(c - r), v(f - o)),
//                     h.f = h.g + h.h,
//                     h.parent = a,
//                     h.opened ? g.updateItem(h) : (g.push(h),
//                         h.opened = !0)))
// }
// return [];


var reconstructPath = function (current) {
    var totalPath = [current];

    while (current.cameFrom) {
        current = current.cameFrom;
        totalPath.push(current);
    }

    totalPath = totalPath.slice(1, totalPath.length - 1);
    return totalPath;
};

var initSearchGrid = function (map) {
    for (var row = 0; row < map.length; row++) {
        searchGrid[row] = [];
        for (var col = 0; col < map[row].length; col++) {
            searchGrid[row][col] = new Node(col, row, (map[row][col] === 1));
            if (map[row][col] === 2) {
                start = searchGrid[row][col];
            }
            if (map[row][col] === 3) {
                goal = searchGrid[row][col];
            }
        }
    }
}


