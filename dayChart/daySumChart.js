// Grab info from the DB:
// all their activities (as objects)
let activities = [];
// all their 
localStorage.setItem("allActivities", JSON.stringify({
    activities: [
        {
            name: "moonwalking",
            idealArray: [8, 2, 8, 2, 4, 8, 5, 8, 6]
        },
        {
            name: "discoDancing",
            idealArray: [1, 2, 3, 4, 5, 1, 2, 3, 4]
        }

    ]
}));

//DATABASE CODE HERE! It's FIRST THING TO DO! ----------------
//but for now, we use localStorage again.

let allActivities = JSON.parse(localStorage.getItem("allActivities"));

if (allActivities) {
    console.log('allActivities exists. See?', allActivities)
    console.log(allActivities)
} else {
    console.log('allActivities does NOT exist YET')
}

let newActivity = {
    name: "horsebobbing",
    idealArray: [3, 3, 3, 3, 3, 3, 3, 3, 3]
}

$(document).keypress(function (e) {
    if (e.key === "m") {

        allActivities.activities.push(newActivity)
    } else {
        console.log('not M')
    }

    console.log('here it is:clog    ')
    console.log(allActivities);
    localStorage.setItem("allActivities", allActivities)


})