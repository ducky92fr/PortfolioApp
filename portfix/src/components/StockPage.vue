<template>
  <div class='main'>
    <navbar></navbar>
    <div v-if='stockInfo'>
      <article class='title'>
        <h1>{{stockInfo.companyName}}</h1>
        <h2>({{stockInfo.ticker}})</h2>
      </article>
      <marketstats v-if="stockInfo" :stats="stockInfo.stats" :price="stockInfo.price"></marketstats>
      <companyinfo v-if="stockInfo" :company="stockInfo.company"></companyinfo>
    </div>
  </div>
</template>

<script>
import { checkUser } from '@/api'
import { getStockInfoFromDB } from '@/api'
import NavBar from './tinyComponents/navbar'
import CompanyInfo from './tinyComponents/StockRelated/CompanyInfo'
import MarketStats from './tinyComponents/StockRelated/MarketStats'
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
      console.log(stockInfo)
      this.stockInfo = stockInfo
    })
  },
  components: {
    navbar: NavBar,
    companyinfo: CompanyInfo,
    marketstats: MarketStats
  }
}
</script>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;
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
