const ctx = document.getElementById('myChart');
let myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});//above is from the online site

$('.clearChart').on("click", function(event){
  storedValues()//this ensures the data is saved first prior to clearing it.
  console.log("Clear button clicked");
  clearValues();
});//created a clear chart button so that I can wipe out the data.

function clearValues(){
  myChart.data.labels = [];//this sets the value to an empty array
  myChart.data.datasets.forEach((dataset) => {//because datasets is an array with nested objects I needed to use the .forEach method
    dataset.label = ''; 
    dataset.data = [];
  });
  myChart.update();//finally I always forgot to do this, but we need to update the chart with these values.
}

function storedValues(){//to store the last set of chart data I needed to create a stored object that would be equal to the current value.
  let chartData = {
    labels: myChart.data.labels,
    datasets: myChart.data.datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data.slice(),
      borderWidth: dataset.borderWidth//inside of this is a function which sets the data label and the data
    }))
  };
  localStorage.setItem('chartData', JSON.stringify(chartData));//next we need to store this in local storage and turn it into JSON.stringifyied data
}

function restoreValues(){
  let chartData = JSON.parse(localStorage.getItem('chartData'))//here we are going through each line of the storage items and then doing an if statement to make sure we are properly updating each line.
  if (chartData) {//we are using .parse to go through each item separately.
    myChart.data.labels = chartData.labels;
    myChart.data.datasets.forEach((dataset, index) => {
      dataset.label = chartData.datasets[index].label;
      dataset.data = chartData.datasets[index].data;
      dataset.borderWidth = chartData.datasets[index].borderWidth;
    });
    myChart.update();//finally we need to make sure we update the chart.
  }
}

function addData(){
  let columnName = $('#columnName').val();//Pop-ups were annoying so I found this fix to push the data from a text line in html
  let columnValue = $('#columnValue').val();
  let columnLabel = $("#columnLabel").val();

  myChart.data.labels.push(columnName);
  myChart.data.datasets[0].data.push(columnValue);
  myChart.data.datasets[0].label = columnLabel;
  myChart.update();
  storedValues();

  $('#columnLabel').val('');
  $('#columnName').val('');
  $('#columnValue').val('');
}

$('#addData').on("click", function(event){
  addData();
});

$('.restoreData').on("click", function(event){
  restoreValues();
  console.log("Clicked");
});

$('.saveData').on("click", function(event){
  storedValues();
  console.log("storedValues saved")
});
