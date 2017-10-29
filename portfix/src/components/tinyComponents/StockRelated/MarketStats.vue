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
  width: 80vw;
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: start;
}
h1 {
  font-size: 3em;
  margin: 0px;
}
h2 {
  font-size: 2em;
  font-size: 1.7em;
  margin: auto 0px 2px 12px;
  color: #797575;
}
</style>
