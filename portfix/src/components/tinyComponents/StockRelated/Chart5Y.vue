<template>
  <div class='market-stats'>
    <h1>5Y Chart</h1>
    <div class='chart'>
      <canvas id="myChart" width="800" height="500"></canvas>
    </div>
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
  align-items: flex-start;
  text-align: start;
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
  width: 900px;
  height: 600px;
  background-color: #272626;
}
h1 {
  font-size: 3em;
  margin: 0px;
}
</style>
