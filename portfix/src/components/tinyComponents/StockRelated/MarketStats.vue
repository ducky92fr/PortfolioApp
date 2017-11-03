<template>
  <div class='market-stats'>
    <h1>Market Stats</h1>
    <div class='indicators'>
      <p>Last: {{formatNumber(price.latestPrice, 2, '', '$')}}</p>
      <!-- <p>Updated on: {{latestUpdate}}</p> -->
      <p>YTD High: {{formatNumber(stats.week52high, 2, '', '$')}}</p>
      <p>YTD Low: {{formatNumber(stats.week52low, 2, '', '$')}}</p>
      <p>YTD Change: {{formatPercentage(stats.ytdChangePercent)}}</p>
      <p>Beta: {{formatNumber(stats.beta, 2)}}</p>
    </div>
  </div>
</template>

<script>
import dateFormat from 'dateformat'
import accounting from 'accounting'
export default {
  name: 'MarketStats',
  props: ['stats', 'price'],
  computed: {
  latestUpdate: function () {
    return new Date(parseInt(this.price.latestUpdate))
    }
  },
  methods: {
    formatNumber: function (num, dec, sep = '', curr = '') {
      return curr + accounting.formatNumber(num, dec, sep)
    },
    formatPercentage: function (num) {
      return  accounting.formatNumber(num * 100, 2, '') + '%'
    }
  }
}
</script>

<style scoped>
.market-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: start;
  color: #363636
}
.indicators {
  margin-top: 15px;
  font-size: 1.3em;
}
.indicators p {
  margin-bottom: 4px;
  font-weight: 600;
}
h1 {
  font-size: 2.1em;
  font-weight: 600;
  margin: 0px;
}
</style>
