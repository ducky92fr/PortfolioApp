<template>
  <div class='securitiesWidget'>
    <h1>Stocks</h1>
    <p v-if='portfolio'> Portfolio last changed on {{portfolio.current.date}}</p>
    <div class='securities'>
      <div class='singleSEC' v-for="stock in stocks" :key="stock">
        <h2 v-if="stock != 'PFAPPCASH'">{{stock}}</h2>
        <h2 v-else>Cash</h2>
        <h2 class="SECdata">Quantity: {{portfolio.current.stocks[stock]}}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { checkUser, getUserPortfolio } from '@/api'
export default {
  name: 'SecuritiesWidget',
  data () {
    return {
      portfolio: null
    }
  },
  props: ['portfolioID'],
  computed: {
    pfID: function () {
      return this.portfolioID
    },
    stocks: function () {
      if (this.portfolio) return Object.keys(this.portfolio.current.stocks)
    }
  },
  created () {
    checkUser(this.$root)
    getUserPortfolio(this.pfID).then(portfolio => {
      this.portfolio = portfolio
    })
  }
}
</script>

<style scoped>
.securitiesWidget h1 {
  font-size: 3em;
  margin: 1vh 2vw;
}
.singleSEC {
  width: 50vw;
  background-color: #e8e8e8;
  height: 40px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1vh 1vw;
  margin: 2vh 2vw;
}
.singleSEC h2 {
  font-size: 1.6em;
  font-weight: 400;
  margin: 0px;
}
.singleSEC .SECdata {
  margin-left: auto;
  margin-right: 1vw;
}
.singleSEC {
  margin-left: auto;
  margin-right: 1vw;
}
</style>
