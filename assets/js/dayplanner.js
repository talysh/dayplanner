// Display today's date in currentDay paragraph


// Take current time, and add 12 hours if it is in the evening
var now = moment().format("hh");
if (moment().format("a") == "pm") {
    if (now != 12) {
        now = parseInt(now) + 12;
    }
}

// Update current time every second
setInterval(function () {
    $("#currentDay").text(moment().format("dddd, MMM do YYYY hh ss a"));
}, 1000);


var timeBlocksArray = [];
function getTimesFromLocalstorage() {
    timeBlocksArray = JSON.parse(localStorage.getItem("timeBlocks")) || [];
}

function writeTimesToLocalstorage() {

}


// Color code individual timeblocks
function colorCode(timeForComparing, description) {
    if (timeForComparing == now) {
        description.addClass("present");
    } else if (timeForComparing < now) {
        description.addClass("past");
    } else {
        description.addClass("future");
    }

}
function createTimeBlock(time, id) {
    // Create a row for the time block

    var timeBlock = $("<div id=" + id + " class='row'> </div>");
    var timeStamp = $("<div class='col-2 hour time-block'> </div>");
    var description = $("<input type='text' class='description col-8'></input>");
    var saveButton = $("<button class='saveBtn col-2'></button>");

    colorCode(time, description);

    timeStamp.text(numberToStringTime(time));
    timeBlock.append(timeStamp, description, saveButton);
    $("#timeblocks").append(timeBlock);

}

// Take in a number representation of military time, and return a properly formatted string
function numberToStringTime(numberTime) {
    textTime = numberTime.toString();
    return textTime + ":00";
}

// Display the entire planner
function displayPlanner() {
    for (var i = 8; i < 24; i++) {
        console.log(i);
        createTimeBlock(i, "time" + i);
    }
}


displayPlanner();