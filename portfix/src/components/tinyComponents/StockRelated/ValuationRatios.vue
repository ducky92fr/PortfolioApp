<template>
  <div class='valuation-ratios'>
    <h1>Valuation Ratios</h1>
    <div class='ratios'>
      <p>Market Cap: <span>{{stats.marketcap}}</span></p>
      <p>Revenue: <span>{{formatNumber(stats.revenue)}}</span></p>
      <p>EBITDA: <span>{{stats.EBITDA}}</span></p>      
      <p>EPS (Earnings per Share): <span>{{stats.ttmEPS}}</span></p>
      <p>Price To Sales: <span>{{stats.priceToSales}}</span></p>
      <p>Price To Book: <span>{{stats.priceToBook}}</span></p>
    </div>
  </div>
</template>

<script>
import accounting from 'accounting'
export default {
  name: 'ValuationRatios',
  props: ['stats'],
  methods: {
    formatNumber: function (num, dec, sep = '') {
      return '$' + accounting.formatNumber(num/1000000, dec, sep) + 'M'
    }
  }
}
</script>

<style scoped>
.valuation-ratios {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: start;
}
.ratios {
  margin-top: 5vh;
  margin-left: 1vw;
  font-size: 1.4em;
}
.ratios p {
  margin-bottom: 12px;
  font-weight: 600;
}
.ratios p span {
  margin-bottom: 12px;
  font-weight: 600;
}
h1 {
  font-size: 3em;
  margin: 0px;
}
</style>
