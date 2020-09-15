// For storing activity descriptions
var activities = {};

// Take current time, and add 12 hours if it is in the evening
var now = moment().format("hh");
if ((moment().format("a") == "pm" && now != 12)) {
    now = parseInt(now) + 12;
}

// Update current time every second
setInterval(function () {
    $("#currentDay").text(moment().format("dddd, MMM do YYYY hh mm ss a"));
}, 1000);

// If there are activities in localdrive, display each activity in the appropriate time slot
function displayActivities() {
    activities = JSON.parse(localStorage.getItem("activities")) || {};
    if (activities) {
        for (var key in activities) {
            $(`[data-description=${key}]`).text(activities[key]);
        }
    }
}

// Save activities to the local storage
function writeTimesToLocalstorage() {
    localStorage.setItem("activities", JSON.stringify(activities));

}

// Color code individual timeblocks to represent present, past, and future using red, grey, and green colors.
function colorCode(timeBlock, description) {
    if (timeBlock == now) {
        description.addClass("present");
    } else if (timeBlock < now) {
        description.addClass("past");
    } else {
        description.addClass("future");
    }

}
function createTimeBlock(time) {
    // Create a row for the time block

    var dataTag = "time" + time;
    var individualHour = $("<div class='row'>");
    var timeStamp = $("<div class='col-2 hour time-block'>");
    var activityDescription = $("<textarea class='description col-8' data-description=" + dataTag + ">");
    var saveButton = $("<button class='saveBtn col-2' data-time=" + dataTag + "><i class='fas fa-save'></i>");

    colorCode(time, activityDescription);
    timeStamp.text(numberToStringTime(time));
    individualHour.append(timeStamp, activityDescription, saveButton);
    $("#timeblocks").append(individualHour);

}

// Take in a number representation of military time, and return a properly formatted string
function numberToStringTime(numberTime) {
    textTime = numberTime.toString();
    return textTime + ":00";
}

// Display the entire planner
function displayPlanner() {
    for (var i = 8; i < 17; i++) {
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






