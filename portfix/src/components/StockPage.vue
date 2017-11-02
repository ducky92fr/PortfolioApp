<template>
  <div class='main'>
    <navbar></navbar>
    <div v-if='stockInfo' class='main-content'>
      <article class='title'>
        <h1>{{stockInfo.companyName}}</h1>
        <h2>({{stockInfo.ticker}})</h2>
      </article>
      <chart :ticker="ticker"></chart>
      <article class='row'>
        <marketstats v-if="stockInfo" :stats="stockInfo.stats" :price="stockInfo.price" class='marketstats'></marketstats>
        <valuationratios v-if="stockInfo" :stats="stockInfo.stats" class='valuationratios'></valuationratios>
      </article>
      <companyinfo v-if="stockInfo" :company="stockInfo.company" class='companyinfo'></companyinfo>
    </div>
  </div>
</template>

<script>
import { checkUser } from '@/api'
import { getStockInfoFromDB } from '@/api'
import NavBar from './tinyComponents/navbar'
import CompanyInfo from './tinyComponents/StockRelated/CompanyInfo'
import MarketStats from './tinyComponents/StockRelated/MarketStats'
import ValuationRatios from './tinyComponents/StockRelated/ValuationRatios'
import Chart5Y from './tinyComponents/StockRelated/Chart5Y'
export default {
  name: 'PFDetailPage',
  data () {
    return {
      ticker: this.$route.params.id.toUpperCase(),
      stockInfo: null
    }
  },
  created () {
    checkUser(this.$root)
    getStockInfoFromDB(this.ticker).then(stockInfo => {
      this.stockInfo = stockInfo
    })
  },
  components: {
    navbar: NavBar,
    companyinfo: CompanyInfo,
    marketstats: MarketStats,
    valuationratios: ValuationRatios,
    chart: Chart5Y
  }
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main-content {
  align-items: center;
  display: flex;
  flex-direction: column;
}
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #f3f3f3;
  width: 80vw;
  margin-top: 5vh;  
  padding: 5vh 5vw;
}
.marketstats, .valuationratios {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.valuationratios {
  margin-left: 10vw;
}
h1 {
  font-size: 3.5em;
  font-weight: 600;
  margin: 0px;
  margin-bottom: 0px;
}
h2 {
  font-size: 2em;
  font-size: 1.7em;
  margin: auto 0px 2px 12px;
  color: #797575;
}
</style>
