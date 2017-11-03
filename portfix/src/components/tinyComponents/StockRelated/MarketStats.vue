<template>
  <div class='market-stats'>
    <h1>Market Stats</h1>
    <div class='indicators'>
      <p>Last: {{price.latestPrice}}</p>
      <p>Updated on: {{latestUpdate}}</p>
      <p>YTD High: {{stats.week52high}}</p>
      <p>YTD Low: {{stats.week52low}}</p>
      <p>YTD Change: {{stats.ytdChangePercent}}</p>
      <p>Beta: {{stats.beta}}</p>
    </div>
  </div>
</template>

<script>
import accounting from 'accounting'
export default {
  name: 'MarketStats',
  props: ['stats', 'price'],
  computed: {
  latestUpdate: function () {
    return new Date(parseInt(this.price.latestUpdate))
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
}
.indicators {
  margin-top: 15px;
  font-size: 1.3em;
}
.indicators p {
  margin-bottom: 6px;
  font-weight: 600;
}
h1 {
  font-size: 2.2em;
  font-weight: 600;
  margin: 0px;
}
</style>
