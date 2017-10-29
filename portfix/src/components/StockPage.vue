<template>
  <div class='main'>
    <navbar></navbar>
    <div v-if='stockInfo'>
      <article class='title'>
        <h1>{{stockInfo.companyName}}</h1>
        <h2>({{stockInfo.ticker}})</h2>
      </article>
      <companyinfo v-if="stockInfo" :company="stockInfo.company"></companyinfo>
      <article class='company-info'>
        <h1>Company</h1>
        <div class='row'>
          <h1>CEO</h1><h1>{{stockInfo.company.CEO}}</h1>
        </div>
        <p class='description-text'>{{stockInfo.company.description}}</p>
      </article>
    </div>
  </div>
</template>

<script>
import { checkUser } from '@/api'
import { getStockInfoFromDB } from '@/api'
import NavBar from './tinyComponents/navbar'
import CompanyInfo from './tinyComponents/StockRelated/CompanyInfo'
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
    companyinfo: CompanyInfo
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
.row {
  display: flex;
  flex-direction: row;
  margin: 2vh 0vw;
}
.row h1 {
  font-size: 2em;
}
.row h1:last-child {
  margin-left: 2vw;
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
.company-info {
  width: 80vw;
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.description-text {
  text-align: start;
}
</style>
