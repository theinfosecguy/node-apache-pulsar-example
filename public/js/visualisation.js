const buildConfigForBarChart = (_data) => {
  try {
    // Aggregate the data based on event type
    const aggregatedData = _data.reduce((acc, curr) => {
      const eventType = curr.event_type;
      acc[eventType] = (acc[eventType] || 0) + 1;
      return acc;
    }, {});

    // Convert the event counts object to arrays for use with Chart.js
    const labels = Object.keys(aggregatedData);
    const data = Object.values(aggregatedData);

    // Construct the Chart.js data object for the bar chart
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Count of Events",
          data: data,
          backgroundColor: [
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
          ],
          borderWidth: 1,
        },
      ],
    };

    return chartData;
  } catch (err) {
    console.error(err);
  }
};

const buildConfigForLineChart = (_data) => {
  try {
    const eventsByTime = _data.reduce((acc, event) => {
      const eventTime = event.event_time; //.split(" ")[0]; // extract the date portion of the event time
      if (!acc[eventTime]) {
        acc[eventTime] = 1;
      } else {
        acc[eventTime]++;
      }
      return acc;
    }, {});

    const labels = Object.keys(eventsByTime);
    const dataPoints = Object.values(eventsByTime);

    return {
      labels: labels,
      datasets: [
        {
          label: "Count of Events",
          data: dataPoints,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  } catch (err) {
    console.error(err);
  }
};

const barChart = new Chart(document.getElementById("bar-chart"), {
  type: "bar",
  // Convert the aggregated data to an array of objects with "label" and "data" properties
  data: buildConfigForBarChart([{}]),
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const lineChart = new Chart(document.getElementById("line-chart"), {
  type: "line",
  data: buildConfigForLineChart([{}]),
});

const updateCharts = (newData) => {
  try {
    const barChartData = buildConfigForBarChart(newData);
    const lineChartData = buildConfigForLineChart(newData);

    // Clear the existing data in the charts
    barChart.data.labels = [];
    barChart.data.datasets = [];
    lineChart.data.labels = [];
    lineChart.data.datasets = [];

    // Add the new data to the charts
    barChart.data.labels.push(...barChartData.labels);
    barChart.data.datasets.push(...barChartData.datasets);
    lineChart.data.labels.push(...lineChartData.labels);
    lineChart.data.datasets.push(...lineChartData.datasets);

    // Update the charts
    barChart.update();
    lineChart.update();
  } catch (err) {
    console.error(err);
  }
};
