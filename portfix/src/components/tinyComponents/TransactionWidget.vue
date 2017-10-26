<template>
  <div class='transactionWidget'>
    <h1>Transactions</h1>
    <pre>{{$data}}</pre>
    <div class='transactions'>
      <div class='singleTR' v-for="transaction in transactions" :key="transaction._id">
      </div>
    </div>
  </div>
</template>

<script>
import { checkUser, getPortfolioTransactions } from '@/api'
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
