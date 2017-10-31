<template>
  <div class='securitiesWidget'>
    <h1>Stocks</h1>
    <p v-if='portfolio'> Portfolio last changed on {{portfolio.current.date}}</p>
    <div class='securities'>
        <template>
          <v-data-table
              v-bind:headers="headers"
              :items="securities"
              hide-actions
              class="elevation-1"
            >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.ticker }}</td>
            <td class="text-xs-right">{{ props.item.quantity }}</td>            
            <td class="text-xs-right">{{ props.item.IEXprice }}</td>
            <td class="text-xs-right">{{ props.item.breakEven }}</td>
            <td class="text-xs-right">{{ props.item.PL }}</td>
          </template>
        </v-data-table>
      </template>
    </div>
  </div>
</template>

<script>
import { checkUser, getUserPortfolio, getLastPriceFromIEX } from '@/api'
import { calculatePortfolioPnL, calculateSecurityPnL } from './helperFunctions'
export default {
  name: 'SecuritiesWidget',
  data () {
    return {
      portfolio: null,
      stockPrices: null,
      headers: [
        { text: 'Ticker', value: 'ticker', align: 'left' },
        { text: 'Quantity', value: 'quantity'},
        { text: 'IEX Price', value: 'IEXprice' },
        { text: 'Break-Even', value: 'breakEven' },
        { text: 'P&L', value: 'PL' },
      ],
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
              IEXprice : stockObject.price,
              breakEven: portfolio.current.BEPs[stockObject.symbol],
              PL: (stockObject.price - portfolio.current.BEPs[stockObject.symbol]) * portfolio.current.stocks[stockObject.symbol]
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
