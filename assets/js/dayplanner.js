// Display today's date in currentDay paragraph


// Take current time, and add 12 hours if it is in the evening
var now = moment().format("hh");
if (moment().format("a") == "pm") {
    if (now != 12) now = parseInt(now) + 12;
}

$("#currentDay").text(moment().format("dddd, MMM do YYYY"));

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
    var timeForComparing = time / 100;

    var timeBlock = $("<div id=" + id + " class='row'> </div>");
    var timeStamp = $("<div class='col-2 hour time-block'> </div>");
    var description = $("<input type='text' class='description col-8'></input>");
    var saveButton = $("<button class='saveBtn col-2'></button>");

    colorCode(timeForComparing, description);

    timeStamp.text(numberToStringTime(time));
    timeStamp.appendTo(timeBlock);
    description.appendTo(timeBlock);
    saveButton.appendTo(timeBlock);
    timeBlock.appendTo("#timeblocks");

}

// Take in a number representation of military time, and return a properly formatted string
function numberToStringTime(numberTime) {
    textTime = numberTime.toString();
    if (textTime.length === 3) {
        return textTime.substring(0, 1) + ":" + textTime.substring(1, 3);
    } else {
        return textTime.substring(0, 2) + ":" + textTime.substring(2, 4);
    }
}

// Display the entire planner
function displayPlanner() {
    for (var i = 1000; i < 2400; i += 100) {
        console.log(i);
        createTimeBlock(i, "time" + i);
    }
}


displayPlanner();