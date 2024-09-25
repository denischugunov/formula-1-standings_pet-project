import Chart from 'chart.js/auto'

(async function() {
    const data = [
      { year: 2010, count: 10, t: 3 },
      { year: 2011, count: 20, t: 3 },
      { year: 2012, count: 15, t: 5 },
      { year: 2013, count: 25, t: 3 },
      { year: 2014, count: 22, t: 3 },
      { year: 2015, count: 30, t: 5 },
      { year: 2016, count: 28, t: 3 },
    ];
  
    new Chart(
      document.getElementById('lineChartStandings'),
      {
        type: 'line',
        data: {
          labels: data.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: data.map(row => row.count)
            }
          ]
        }
      }
    );
  })();