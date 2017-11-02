<template>
  <div class='transactionWidget'>
    <h1>Transactions</h1>
    <div class='transactions' id='transactionstable'>
      <table class="table transactions-table">
        <thead>
          <tr>
            <th>Ticked</th>
            <th>Date</th>
            <th>Qt Change</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in transactions" :key="item.date">
            <td><router-link :to="'/stock/' + item.affectedStocks[0].ticker">{{ item.affectedStocks[0].ticker }}</router-link></td>
            <td>{{ item.date }}</td>
            <td>{{ item.affectedStocks[0].change }}</td>
            <td>{{ item.affectedStocks[0].atPrice }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { checkUser, getPortfolioTransactions } from '@/api'
import { formatDates } from './helperFunctions'
export default {
  name: 'TransactionWidget',
  data () {
    return {
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
      transactions.forEach(transaction => {
        transaction.date = formatDates(transaction.date)
      })
    }).catch((error) => {
    console.error(error)
  })
  }
}
</script>

<style scoped>
.transactionWidget h1 {
  font-size: 2.5em;
  font-weight: 600;
  margin: 1vh 2vw 0vh 2vw;
  height: 30%;
  box-sizing: border-box;
}
.transactions {
  height: 70%;
}
#transactionstable table {
  table-layout: fixed;
  overflow-y: auto;
  width: 100%;
}
#transactionstable table td, #transactionstable table th {
  text-align: center;
  font-size: 1.2em;
  font-weight: 400;
  width: 70px;
  height: auto;
  margin: 15px 0px;
  border: none;
}

</style>
