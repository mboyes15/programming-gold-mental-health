import Chart from 'chart.js';
/**
 * Is triggered when the user submits the sleepForm. It then uses the data to filter the csv data out. Once it has the filtered csv data
 * it then creates a line chart of the data of the number of hours slept vs the number people in the chart who has done the same.
 * It also loads the csv data into an array and then sorts it into the individual columns
 * code is partly from from https://www.chartjs3.com/docs/chart/getting-started/
 * data from https://www.kaggle.com/datasets/mlomuscio/sleepstudypilot
 * @param {FormData} form the data from the form: Enough, reach, time and breakfast (yes/no)
 */
function testResults (form) {
  document.getElementById('chartIndicator').style.display = 'none';
  const enough = form.enough.value;
  const reach = form.reach.value;
  const time = form.time.value;
  const breakfast = form.breakfast.value;

  const chartData = 'chartdata.csv';

  /**
   * @param {chartdata} datapoints the data from the csv file chartData.csv
   */
  d3.csv(chartData).then(function (datapoints) {
    console.log(datapoints);
    const Enough = [];
    const Hours = [];
    const PhoneReach = [];
    const PhoneTime = [];
    const Tired = [];
    const Breakfast = [];

    const NoHours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < datapoints.length; i++) {
      if ((datapoints[i].Enough === enough) && (datapoints[i].PhoneReach === reach) && (datapoints[i].PhoneTime === time) && (datapoints[i].Breakfast === breakfast)) {
        Enough.push(datapoints[i].Enough);
        Hours.push(datapoints[i].Hours);
        NoHours[datapoints[i].Hours - 1] = NoHours[datapoints[i].Hours - 1] + 1; // counting the number of people who slept each of the hours
        PhoneReach.push(datapoints[i].PhoneReach);
        PhoneTime.push(datapoints[i].PhoneTime);
        Tired.push(datapoints[i].Tired);
        Breakfast.push(datapoints[i].Breakfast);
      }
    }
    console.log(NoHours);
    /**
     * represents
     * @constructor
     */
    const data = {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      datasets: [{
        label: 'Number of people with the hours slept',
        data: NoHours,
        backgroundColor: [
          'rgba(255, 26, 104, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 26, 104, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        tension: 0.4
      }]
    };

    const config = {
      type: 'line',
      data,
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                console.log(context);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );
    return myChart;
  });
}
/**
 * When the page loads all the javascript starts running here and is looking for all the event listeners throughout runtime
 */
window.onload = function () {
  document.addEventListener('DOMContentLoaded', testResults);
  document.getElementById('BetterSleep').addEventListener('click', Display);
  document.getElementById('BetterSleep').addEventListener('mouseover', invert);
  document.getElementById('BetterSleep').addEventListener('mouseout', invert);
  document.getElementById('socialImage').addEventListener('mouseover', border);
  document.getElementById('socialImage').addEventListener('mouseout', undoBorder);
};
/**
 * This function displays and hides the text with the ID sleepList after the button "bettersleep" has been clicked
 */
function Display () {
  if (document.getElementById('SleepList').style.display === 'none') {
    document.getElementById('SleepList').style.display = 'inline';
  } else {
    document.getElementById('SleepList').style.display = 'none';
  }
  ;
}
/**
 * This function switches the text between white and black, and the background vice versa when the mouse moves over it
 */
function invert () {
  if (document.getElementById('BetterSleep').style.color === 'white') {
    document.getElementById('BetterSleep').style.color = 'black';
    document.getElementById('BetterSleep').style.background = 'white';
  } else {
    document.getElementById('BetterSleep').style.color = 'white';
    document.getElementById('BetterSleep').style.background = 'black';
  }
}
/**
 * This function displays a blue border around the image with the id socialImage when the mouse is hovering over it
 */
function border () {
  document.getElementById('socialImage').style.boxShadow = '10px 20px 30px blue';
}
/**
 * This function removed the blue border around the image with the id socialImage when the mouse goes off the image
 */
function undoBorder () {
  document.getElementById('socialImage').style.boxShadow = 'none';
}
