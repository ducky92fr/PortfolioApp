<template>
  <div class='valuation-ratios'>
    <h1>Valuation Ratios</h1>
    <div class='ratios'>
      <p>Market Cap: <span>{{formatNumber(stats.marketcap)}}</span></p>
      <p>Revenue: <span>{{formatNumber(stats.revenue)}}</span></p>
      <p>EBITDA: <span>{{formatNumber(stats.EBITDA)}}</span></p>      
      <p>EPS: <span>{{'$' + formatRatio(stats.ttmEPS, 2)}}</span></p>
      <p>Price To Sales: <span>{{formatRatio(stats.priceToSales, 2)}}</span></p>
      <p>Price To Book: <span>{{formatRatio(stats.priceToBook, 2)}}</span></p>
    </div>
  </div>
</template>

<script>
import accounting from 'accounting'
export default {
  name: 'ValuationRatios',
  props: ['stats'],
  methods: {
    formatNumber: function (num, dec, sep = ' ') {
      return '$' + accounting.formatNumber(num/1000000, dec, sep) + 'M'
    },
    formatRatio: function (num, dec) {
      return accounting.formatNumber(num, dec, '')
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
  color: #363636
}
.ratios {
  margin-top: 15px;
  font-size: 1.3em;
}
.ratios p {
  margin-bottom: 4px;
  font-weight: 600;
}
.ratios p span {
  margin-bottom: 6px;
  font-weight: 600;
}
h1 {
  font-size: 2.1em;
  font-weight: 600;
  margin: 0px;
}
</style>
