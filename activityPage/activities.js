
//This will be taken from the DB.
const values = ["family", "marriage", "parenting", "friends", "liesure", "work", "spirituality", "community", "health"]
//This will be taken from the DB.
const myIdealValues = [4, 4, 3, 6, 5, 7, 4, 1, 8];
//empty for storing entered values
let itemValWeightArray = [];
//empty for storing calculated differences between Ideal and Activity Facet Values.
let valueDifArray = [];
let newActivityObject = {};


// Defining the User class
class User {
    constructor(firstName, lastName, idealsArray, activitiesArray) {
        this.firstName = firstName;
        this.lastName = lastName
        this.idealsArray = idealsArray;
        this.activitiesArray = activitiesArray;
    };

};
// Defining the Actiity class
class Activity {
    constructor(name, idealWeights, totalCompleted) {
        this.name = name;
        this.idealWeights = idealWeights;
        this.totalCompleted = totalCompleted;
    };
    addOne() {
        this.totalCompleted++;
        console.log('this \\/');
        console.log(this.totalCompleted)
    };
    subtractOne() {
        console.log("I'm subtracting!")
        console.log('this \\/');
        this.totalCompleted--;
        console.log(this.totalCompleted);
    };
};
// Defining the button class to be added to each radar card
class Button {
    constructor(operation, activity) {
        
        this.operation = operation;
        this.activity = activity;
        this.change = () => {
            if (this.operation == "add") {
                console.log(`Adding from within the ${this.activity.name.replace(/\s/g, '')}  Card!`);
                console.log(`It went from ${this.activity.totalCompleted} to:`);
                this.activity.addOne()
                
            } else {
                console.log(`Subtracting from within the ${this.activity.name.replace(/\s/g, '')}  Card!`);
                console.log(`It went from ${this.activity.totalCompleted} to:`);
                this.activity.subtractOne();
            }
            console.log(`Looking for $("#${this.activity.name.replace(/\s/g, '')}total")`);
            
            

            $(`#${this.activity.name.replace(/\s/g, '')}total`).text(this.activity.totalCompleted);
        }

        return ($('<button>')
            .attr('id', `${operation}-button`)
            .text(this.operation))
            .click(this.change);

    }

}

// Define the Activity Card 'component'
class ActivityCard {
    constructor(activity) {
        this.activity = activity;

        let $radar = $("<img>").attr('src', "../radar.png")
        let $addButton = new Button('add', this.activity);
        let $subButton = new Button('subtract', this.activity);
        let $total = $("<h1>").attr('id', this.activity.name.replace(/\s/g, '') + "total").text(this.activity.totalCompleted)
        console.log(`The ${this.activity.name} card is being made.`)
        
        return ($('<div>')
            .attr('id', `${this.activity.name.replace(/\s/g, '')}-card`)
            .addClass('activityCard')
            .text(this.activity.name))
            .attr('title', this.activity.idealWeights)
            .append($total)
            .append($radar)
            .append($addButton)
            .append($subButton)
    }
}

// Make all of Butler's Ideals objects ( no Ideal class.)
let usersIdeals = [
    {
        name: "family",
        weight: 8
    },
    {
        name: "marriage",
        weight: 5
    },
    {
        name: "parenting",
        weight: 10
    },
    {
        name: "friends",
        weight: 6
    },
    {
        name: "liesure",
        weight: 5
    },
    {
        name: "work",
        weight: 8
    },
    {
        name: "spirituality",
        weight: 1
    },
    {
        name: "community",
        weight: 2
    },
    {
        name: "health",
        weight: 7
    },

];

// Make all of Butler's Activity objects with their associated weight array;
let usersActivities = [
    new Activity("shaving", [1, 2, 3, 4, 5, 6, 7, 8, 9], 23),
    new Activity("showering", [5, 4, 3, 2, 1, 5, 3, 2, 6], 14),
    new Activity("cooking dinner", [4, 5, 7, 6, 3, 4, 1, 1, 3], 20),
    new Activity("playing with legos", [7, 2, 4, 6, 8, 1, 6, 6, 9], 4),
    new Activity("brushing teeth", [2, 2, 2, 2, 2, 2, 6, 8, 1], 19),
    new Activity("baking brownies", [9, 1, 9, 1, 9, 1, 9, 1, 9], 3),
]


//Making Butler a User with activities & ideals.
let user = new User("Butler", "Nutler", usersIdeals, usersActivities)


// Make a function makeActivityCards() that loops through each of the user's activities and:
// [X]  makes a radar chart card for each one
// [X] puts an add and subtract button on each one
//      [X] that adds/subtracts the total number of times the activity's been done.
//      [ ] and stores the new number in the db (localStorage for now)

makeActivityCards = () => {
    user.activitiesArray.forEach((e, i) => {
        let $newCard = new ActivityCard(e);
        $(document.body).append($newCard)
    })
}

// Says what to do when the form is submitted
submitForm = () => {
    //Create array of the values of Facets
    $(".valInput").each(function () {
        itemValWeightArray.push(parseInt($(this).val()))
    });

    //    Map the array to be the difference b/w idealWeight & activityWeight
    valueDifArray = itemValWeightArray.map((e, i) => {
        return e - myIdealValues[i];
    });

    // Grab the activity name from the activity name input
    let actName = $("#activityName").val();

    //The resulting object, which will be posted to the database, and/or used for other things around this page:
    newActivityObject = {
        name: actName,
        idealArray: itemValWeightArray,
    };





    // ----------------------------------DATABASE CODE HERE ----------------------------------------------------------
    //Insert the sequelize query model function stuff here. For now, write to localstorage
    //Fake database!!
    let localActivitiesObject = JSON.parse(localStorage.getItem("allDBActivities"));

    let activitiesArray = [];

    if (!localActivitiesObject) {
        activitiesArray = [newActivityObject]
    } else {
        activitiesArray = localActivitiesObject.activities;
        activitiesArray.push(newActivityObject);
    }

    localActivitiesObject = { activities: activitiesArray };

    localStorage.setItem("allDBActivities", JSON.stringify(localActivitiesObject));


    //------------------------------------Yes, Here-------------------------------------------------------------------



    //Hide the form
    $("#valuesForm").hide();
    //Baseline array: all 0's to give relative values for an activity
    //When making this better, dynamically generate baseline array to reflect .length of values, when adding a value is possible.
    //This can be done better by using valueDifArray.length within createChart() instead of a separate baseline.

    let baseline = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    //and Create the Chart!
    createChart(baseline, valueDifArray, actName);

};

// creates a chart from the info harvested.
createChart = (idealArray, itemArray, activityName) => {
    Chart.defaults.global.defaultFontFamily = 'ribeye';
    Chart.defaults.global.defaultFontSize = 20;
    Chart.defaults.global.defaultFontColor = "rebeccapurple";

    new Chart(document.getElementById("myChart"),
        {
            "type": "radar",
            "data": {
                labels: ["Family", "Marriage", "Parenting", "Friends", "Leisure", "Work", "Spirituality", "Community", "Health"],
                datasets: [{
                    label: activityName,
                    data: itemArray,
                    fill: true,
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgb(255, 99, 132)",
                    pointBackgroundColor: "rgb(255, 99, 132)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#f00",
                    pointHoverBorderColor: "rgb(255, 99, 132)",
                    borderDash: [3]
                }, {
                    label: "Ideal",
                    data: idealArray,
                    fill: true,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgb(54, 162, 235)",
                    pointBackgroundColor: "rgb(54, 162, 235)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgb(54, 162, 235)",
                }]
            },
            options: {
                title: {
                    display: true,
                    text: activityName,
                    fontSize: 25
                },
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontColor: 'orange'
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0
                    }
                },
                scale: {
                    ticks: {
                        beginAtZero: true
                    },
                },
                elements: {
                    line: {
                        tension: 0.1,
                        borderWidth: 3
                    },
                    point: {
                        pointStyle: "star"
                    }
                }
            }
        });


};

//Make the Activity Cards on the page.
makeActivityCards();

//call the submitForm function when submit button is clicked.
$("#valueFormSubmit").click(function () {
    submitForm();
});