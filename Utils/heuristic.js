var manhattan = function(start, goal) {
    return Math.abs(start.x - goal.x) * 1 + Math.abs(start.y - goal.y) * 1;
};
