<template>
  <div class='transactionWidget'>
    <h1>Transactions</h1>
    <div class='transactions'>
    <template>
      <v-data-table
          v-bind:headers="headers"
          :items="transactions"
          hide-actions
          class="elevation-1"
        >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.affectedStocks[0].ticker }}</td>
          <td class="text-xs-right">{{ props.item.date }}</td>
          <td class="text-xs-right">{{ props.item.affectedStocks[0].change }}</td>
          <td class="text-xs-right">{{ props.item.affectedStocks[0].atPrice }}</td>
        </template>
      </v-data-table>
    </template>
    </div>
  </div>
</template>

<script>
import { checkUser, getPortfolioTransactions } from '@/api'
export default {
  name: 'TransactionWidget',
  data () {
    return {
      headers: [
        { text: 'Ticker', value: 'ticker', align: 'left', sortable: false },
        { text: 'Date', value:'date' },
        { text: 'Change', value:'change' },
        { text: 'At Price', value:'atPrice' },
      ],
      transactions: []
    }
  },
  props: ['portfolioID'],
  computed: {
    pfID: function () {
      return this.portfolioID
    }
  },
  created () {
    checkUser(this.$root)
    getPortfolioTransactions(this.pfID).then(transactions => {
      this.transactions = transactions
    })
  }
}
</script>

<style scoped>
.transactionWidget h1 {
  font-size: 3em;
  margin: 1vh 2vw;
}
.singleTR {
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
.singleTR h2 {
  font-size: 1.6em;
  font-weight: 400;
  margin: 0px;
}
.singleTR {
  margin-left: auto;
  margin-right: 1vw;
}
</style>
