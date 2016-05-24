var timer = {
    timeStack: [],
    titleStack: [],
    start: function(title) {
        var startDate = new Date();
        var startTime = startDate.getTime();
        this.timeStack.push(startTime);
        if (!title) {
            var title = "Temp";
        }
        this.titleStack.push(title);
        console.log(title + " start record time.");
    },

    stop: function() {
        if (this.timeStack.length === 0) {
            console.log("No timer activate");
            return;
        }
        var stopDate = new Date();
        var stopTime = stopDate.getTime();
        console.log(this.titleStack.pop() + " stop record time, spent: " + (stopTime - this.timeStack.pop()) + "ms");
    }
}
