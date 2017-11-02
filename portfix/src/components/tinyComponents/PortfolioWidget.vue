<template>
  <div class='portfolioWidget'>
    <h1>Your Portfolios</h1>
    <div class='portfolios'>
      <div class='singlePF' v-for="portfolio in portfolios" :key="portfolio._id">
        <h2>{{portfolio.name}}</h2>
        <h2 class='PFdata'>{{portfolio.current.stocks.PFAPPCASH}}</h2>
        <router-link :to="'/portfolio/' + portfolio._id">
          <img src="../../assets/icons/eye1.svg" alt="See details">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { checkUser } from '@/api'
import { getUserPortfolios } from '@/api'
export default {
  name: 'PortfolioWidget',
  data () {
    return {
      portfolios: []
    }
  },
  created () {
    checkUser(this.$root)
    getUserPortfolios().then(portfolios => {
      this.portfolios = portfolios
      let allStocksArray = []
      portfolios.forEach(portfolio => {
        allStocksArray = allStocksArray.concat(Object.keys(portfolio.current.stocks))
      })
      this.$emit('gotStocks', allStocksArray)
    }).catch((error) => {
    console.error(error)
  })
  }
}
</script>

<style scoped>
#test {
  font-size: 4em;
}
.portfolioWidget h1 {
  font-size: 3em;
  font-weight: 600;
  margin: 1vh 2vw 5vh 2vw;
}
.singlePF {
  width: 60vw;
  max-width: 600px;
  background-color: #dcdcdc8c;
  height: 40px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1vh 4vw;
  margin: 2vh 2vw;
}
.singlePF h2 {
  font-size: 1.6em;
  font-weight: 400;
  margin: 0px;
}
.singlePF .PFdata {
  margin-left: auto;
  margin-right: 1vw;
}
.singlePF img {
  width: 30px;
}
.singlePF a {
  width: 30px;
  height: 30px;
  margin-left: 1vw;
}
</style>
