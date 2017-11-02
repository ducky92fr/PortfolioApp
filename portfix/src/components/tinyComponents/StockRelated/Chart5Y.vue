<template>
  <div class='market-stats'>
    <div class='chart'>
      <canvas id="myChart" width="700" height="400"></canvas>
    </div>
    <h1>Five years {{ticker}} closing price</h1>
  </div>
</template>

<script>
import { get5YChartFromIEX } from '@/api'
import Chart from 'chart.js';
export default {
  name: 'Chart5Y',
  props: ['ticker'],
  data () {
    return {
      history: null
    }
  },
  computed: {
  latestUpdate: function () {
    return new Date(parseInt(this.price.latestUpdate))
    }
  },
  created () {
    get5YChartFromIEX(this.ticker).then(response=> {
      this.history = response
      let prices = response.map(day => day.close)
      let dates = response.map(day => day.date)
      let ctx = document.getElementById("myChart")
      Chart.defaults.global.defaultFontColor = 'white'
      let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dates,
        datasets: [{
            label: 'closing price',
            data: prices,
            backgroundColor: [
                'rgba(210, 122, 60, 0.22)'
            ],
            borderColor: [
                '#d27a3c'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        tooltips: {
          enabled: true
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 3
          }
        }
    }})
    })
  }
}
</script>

<style scoped>
.market-stats {
  display: flex;
  flex-direction: column;
  text-align: start;
  justify-content: center;
  align-items: center;
}
.indicators {
  margin-top: 5vh;
  margin-left: 1vw;
  font-size: 1.4em;
}
.indicators p {
  margin-bottom: 12px;
}
.chart {
  width: 970px;
  height: 540px;
  background-color: #2d2d2d;
  padding: 20px 30px;
  border: 1px solid #2d2d2d;
  box-shadow: 2px 0px 7px 1px rgba(99, 99, 99, 0.8);
}
h1 {
  font-size: 1.7em;
  font-weight: 400;
  margin: 0px;
  margin-top: 15px;
  font-style: italic;
}
</style>
