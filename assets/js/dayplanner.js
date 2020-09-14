// For storing activity descriptions
var activities = {};

// Take current time, and add 12 hours if it is in the evening
var now = moment().format("hh");
if (moment().format("a") == "pm") {
    if (now != 12) {
        now = parseInt(now) + 12;
    }
}

// Update current time every second
setInterval(function () {
    $("#currentDay").text(moment().format("dddd, MMM do YYYY hh mm ss a"));
}, 1000);


function getTimesFromLocalstorage() {
    activities = JSON.parse(localStorage.getItem("activities")) || {};
}


function displayActivities() {
    getTimesFromLocalstorage();
    if (activities) {
        for (var key in activities) {
            $(`[data-description=${key}`).text(activities[key]);
        }
    }
}

function writeTimesToLocalstorage() {
    console.log(activities);
    localStorage.setItem("activities", JSON.stringify(activities));

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
function createTimeBlock(time) {
    // Create a row for the time block

    var dataTag = "time" + time;
    var timeBlock = $("<div class='row'> </div>");
    var timeStamp = $("<div class='col-2 hour time-block'> </div>");
    var description = $("<textarea class='description col-8' data-description=" + dataTag + "></textarea>");
    var saveButton = $("<button class='saveBtn col-2' data-time=" + dataTag + "></button>");

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
    for (var i = 9; i < 17; i++) {
        createTimeBlock(i);
    }
    displayActivities();
}


displayPlanner();




// When save button is clicked, check the adjasent textarea, and if it has value, add it to timeblocks object
$(".saveBtn").click(function () {

    // when save button is clicked get its data attribute
    var identifier = $(this).data("time");
    // select description box with the same data attribute
    var description = $(`[data-description=${identifier}`);
    if (description.val() != "") {
        //take that value and assign create an object with the time stamp as key, and the text content as value
        activities[identifier] = description.val();
        writeTimesToLocalstorage();
    }

});






