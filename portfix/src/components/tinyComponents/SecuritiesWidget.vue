<template>
  <div class='securitiesWidget'>
    <h1>Stocks</h1>
    <div v-if='portfolio' class='securities' id='securitiestable'>
      <table class="table securities-table">
        <tr>
          <th class='col-1'>Ticker</th>
          <th class='col-2'>Quantity</th>
          <th class='col-3'>Price</th>
          <th class='col-4'>Break-Even</th>
          <th class='col-5'>Profit/Loss</th>
        </tr>
        <tr v-for="item in securities" :key="item.ticker">
          <td v-if="item.ticker != 'PFAPPCASH'"><router-link :to="'/stock/' + item.ticker">{{ item.ticker }}</router-link></td>
          <td v-if="item.ticker === 'PFAPPCASH'" class='cash'>
            <p>Cash</p>
            <img src="../../assets/icons/notes.svg" alt="Cash">
          </td>
          <td v-if="item.ticker != 'PFAPPCASH'">{{ item.quantity }}</td>
          <td v-if="item.ticker === 'PFAPPCASH'">$ {{ item.quantity }}</td>
          <td>{{ item.IEXprice }}</td>
          <td>{{ item.breakEven }}</td>
          <td>{{ item.formattedPL }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import dateFormat from 'dateformat'
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
    },
    date: function () {
      return dateFormat(this.portfolio.current.date, 'mmmm dS, yyyy')
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
        this.securities.push({
          ticker: 'PFAPPCASH',
          quantity: portfolio.current.stocks.PFAPPCASH,
            IEXprice : '-',
            breakEven: '-',
            formattedPL: '-',
            PL: '-'
        })
        this.$emit('PLcalculated', {
          PL: calculatePortfolioPnL(this.securities),
          lastUpdate: this.date
        })
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
  font-size: 35px;
  font-weight: 600;
  margin: 1vh 2vw;
  height: 20%;
  max-height: 60px;
  box-sizing: border-box;
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
  vertical-align: center;
  font-size: 1.2em;
  font-weight: 400;
  width: 70px;
  height: 35px;
  margin: 0px 0px;
  padding: 0px;
  border: none;
}
#securitiestable .cash {
  width: 116px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
#securitiestable .cash img {
  width: 27px;
  margin-left: 5px;
}
#securitiestable .cash p {
  margin: 0px;
}
</style>
