<template>
  <div class='valuation-ratios'>
    <h1>Valuation Ratios</h1>
    <div class='ratios'>
      <p>Market Cap: {{stats.marketcap}}</p>
      <p>Revenue: {{stats.revenue}}</p>
      <p>EBITDA: {{stats.EBITDA}}</p>      
      <p>EPS (Earnings per Share): {{stats.ttmEPS}}</p>
      <p>Price To Sales: {{stats.priceToSales}}</p>
      <p>Price To Book: {{stats.priceToBook}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ValuationRatios',
  props: ['stats']
}
</script>

<style scoped>
.valuation-ratios {
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
</style>
