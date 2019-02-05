
//This will be taken from the DB.
const values = ["family", "marriage", "parenting", "friends", "liesure", "work", "spirituality", "community", "health"]
//This will be taken from the DB.
const myIdealValues = [4, 4, 3, 6, 5, 7, 4, 1, 8];
//empty for storing entered values
let itemValWeightArray = [];
//empty for storing calculated differences between Ideal and Activity Facet Values.
let valueDifArray = [];
let newActivityObject = {};



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
    localStorage.setItem("ActivityObject", JSON.stringify(newActivityObject));

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

populateFormInputs = () => {
    // Each Value gets an input with its name and id 
    values.forEach((e, i) => {
        let $valInput = $("<input>")
            .addClass('valInput')
            .attr('type', 'number')
            .attr('id', `${e}Weight`)
            //for now, make them all 5.
            .val(5);
        $("#valuesForm").append(e).append($valInput).append("<br>")
    });
};

//
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


}

//Make the inputs for all the Values
populateFormInputs();

//call the submitForm function when submit button is clicked.
$("#valueFormSubmit").click(function () {
    submitForm();
})