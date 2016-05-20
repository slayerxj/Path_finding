var searchGrid = [];

var getNode = function (x, y) {
    if (searchGrid[x]) {
        return searchGrid[x][y];
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

var jump = function(nodeA, goal) {
    if ()
};

var jps = function (start, goal) {
    var openList = [];

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
                        neighbor.open = true;
                    } else {
                        // up heap?
                    }
                }
            }
        }
    }

    return [];
};

var reconstructPath = function (current) {
    var totalPath = [current];

    while (current.cameFrom) {
        current = current.cameFrom;
        totalPath.push(current);
    }

    return totalPath;
};

var initSearchGrid = function (sdf) {
    for (var i = 0; i < sdf.length; i++) {
        for (var j = 0; j < sdf[i].length; j++) {
            if (!searchGrid[i]) {
                searchGrid[i] = [];
            }
            searchGrid[i][j] = new Node(i, j, (sdf[i][j] === 0));
        }
    }
}
