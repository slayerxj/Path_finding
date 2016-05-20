var searchGrid = [];
var searchedNode = [];
var start;
var goal;

var configure = {
    visualization = true;
}

var getNode = function(x, y) {
    if (searchGrid[y]) {
        return searchGrid[y][x];
    }
    return null;
}

var getNeighbor = function(node, index) {
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

var distBetween = function(nodeA, nodeB) {
    return 1;
};

var aStar = function(map) {
    initSearchGrid(map);
    var openList = new MinHeap();
    var heuristic = manhattan;
    openList.insert(start);
    start.open = true;

    start.gScore = 0;
    start.value = start.gScore + heuristic(start, goal);

    while (!openList.isEmpty()) {
        var current = openList.findMinimum();
        if (current === goal) {
            return reconstructPath(goal);
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

                var veerCost = (current.inertia === i) ? 0 : 1;
                var tentativeGScore = current.gScore + distBetween(current, neighbor) + veerCost;

                if ((!neighbor.open) || (tentativeGScore < neighbor.gScore)) {
                    neighbor.cameFrom = current;
                    neighbor.inertia = i;
                    neighbor.gScore = tentativeGScore;
                    neighbor.value = neighbor.gScore + heuristic(neighbor, goal);

                    if (!neighbor.open) {
                        openList.insert(neighbor);
                        searchedNode.push(neighbor);
                        neighbor.open = true;
                    } else {
                        // up heap?
                    }
                }
            }
        }
    }

    return null;
};

var reconstructPath = function(current) {
    var totalPath = [current];

    while (current.cameFrom) {
        current = current.cameFrom;
        totalPath.push(current);
    }

    totalPath = totalPath.slice(1, totalPath.length - 1);
    return totalPath;
};

var initSearchGrid = function(map) {
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
