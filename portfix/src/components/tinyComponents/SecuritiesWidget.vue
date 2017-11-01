<template>
  <div class='securitiesWidget'>
    <article class='title'>
      <h1>Stocks</h1>
      <p v-if='portfolio'> Portfolio last changed on {{portfolio.current.date}}</p>
    </article>
    <div v-if='portfolio' class='securities' id='securitiestable'>
      <table class="table securities-table">
        <thead>
          <tr>
            <th class='col-1'>Ticker</th>
            <th class='col-2'>Quantity</th>
            <th class='col-3'>Price</th>
            <th class='col-4'>Break-Even</th>
            <th class='col-5'>Profit/Loss</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in securities" :key="item.ticker">
            <td>{{ item.ticker }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.IEXprice }}</td>
            <td>{{ item.breakEven }}</td>
            <td>{{ item.formattedPL }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { checkUser, getUserPortfolio, getLastPriceFromIEX } from '@/api'
import { calculatePortfolioPnL, calculateSecurityPnL, formatPL } from './helperFunctions'
export default {
  name: 'SecuritiesWidget',
  data () {
    return {
      portfolio: null,
      stockPrices: null,
      securities: []
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

      // Then get the prices from IEX, for all the stocks in the user's portfolio
      getLastPriceFromIEX(this.stocks).then(responseArray => {
        responseArray.forEach(stockObject => {
          if (stockObject) {
            let stock_display_info = {
              ticker: stockObject.symbol,
              quantity: portfolio.current.stocks[stockObject.symbol],
              IEXprice : stockObject.price.toFixed(2),
              breakEven: portfolio.current.BEPs[stockObject.symbol].toFixed(2),
              formattedPL: formatPL((stockObject.price - portfolio.current.BEPs[stockObject.symbol]) / stockObject.price),
              PL: (stockObject.price - portfolio.current.BEPs[stockObject.symbol]) / stockObject.price
            }
          this.securities.push(stock_display_info)
          }
        })
        this.$emit('PLcalculated', calculatePortfolioPnL(this.securities))
      }).catch((error) => {
    console.error(error)
  })
    }).catch((error) => {
    console.error(error)
  })
  }
}
</script>

<style scoped>
.securitiesWidget h1 {
  font-size: 3em;
  margin: 1vh 2vw;
}
.title {
  height: 30%;
  box-sizing: border-box;
}
.title p {
  font-size: 1em;
  font-weight: 400;
}
.securities {
  height: 70%;
}
#securitiestable table {
  table-layout: fixed;
  overflow-y: auto;
  width: 100%;
}
#securitiestable table td, #securitiestable table th {
  text-align: center;
  font-size: 1.2em;
  font-weight: 400;
  width: 70px;
  height: auto;
  margin: 15px 0px;
  border: none;
}

#securitiestable table .col-1,
#securitiestable table .col-2,
#securitiestable table .col-3,
#securitiestable table .col-4,
#securitiestable table .col-5,
 {
  /* width: 50px; */
}
</style>
