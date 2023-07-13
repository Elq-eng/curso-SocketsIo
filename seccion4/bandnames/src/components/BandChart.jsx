import React,{ useEffect} from 'react'
import { Chart } from "chart.js"

const BandChart = () => {
  const ctx = document.getElementById('myChart');


  useEffect(() => {
    new Chart(ctx, {
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
          x: {
            stacked:true
          }
        }
      }
    });
  }, []);

  return (
    <div><canvas id="myChart"></canvas></div>
  )
}

export default BandChart