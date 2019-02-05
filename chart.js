
Chart.defaults.global.defaultFontFamily = 'ribeye';
Chart.defaults.global.defaultFontSize = 20;
Chart.defaults.global.defaultFontColor = "rebeccapurple";

new Chart(document.getElementById("myChart"),
    {
        "type": "radar",
        "data": {
            labels: ["Family", "Marriage", "Parenting", "Friends", "Leisure", "Work", "Spirituality", "Community", "Health"],
            datasets: [{
                label: "Today",
                data: [63, 63, 63, 63, 63, 63, 63, 63, 63],
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
                data: [60, 60, 60, 60, 60, 60, 60, 60, 60],
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
                text: "This is where the Title goes!",
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
                    left: 40,
                    right: 8,
                    bottom: 100,
                    top: 9
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

