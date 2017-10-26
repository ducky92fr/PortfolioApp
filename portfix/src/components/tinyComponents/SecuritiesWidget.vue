<template>
  <div class='securitiesWidget'>
    <pre>{{$data}}</pre>
    <h1>Stocks</h1>
    <div class='securities'>
      <div class='singleSEC' v-for="stock in stocks" :key="stock">
        {{stock}}
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
  height: 30px;
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
.singleSEC {
  margin-left: auto;
  margin-right: 1vw;
}
</style>
