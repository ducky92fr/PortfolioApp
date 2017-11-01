<template>
  <div class='main'>
    <navbar></navbar>
    <div class='currentDashboard' v-if="portfolio">
      <h1 v-if="portfolio">{{portfolio.name}}</h1>
      <p>Current value: {{portfolio.current.stocks.PFAPPCASH}}</p>
      <p v-if="portfolioPL">P&L: {{portfolioPL}}</p>
    </div>
    <div class='row'>
      <button @click="redirectToAddStock()">Add a Stock position</button>
      <button @click="redirectToSellStock()">Sell a Stock</button>
    </div>
    <div class='row'>
      <securitieswidget :portfolioID='PFid' class='securitiesWidget' v-on:PLcalculated='updatePL($event)'></securitieswidget>
      <transactionwidget :portfolioID='PFid' class='transactionWidget'></transactionwidget>
    </div>
  </div>
</template>

<script>
import { checkUser } from '@/api'
import { getUserPortfolio } from '@/api'
import NavBar from './tinyComponents/navbar'
import TransactionWidget from './tinyComponents/TransactionWidget'
import securitiesWidget from './tinyComponents/securitiesWidget'
export default {
  name: 'PFDetailPage',
  data () {
    return {
      PFid: this.$route.params.id,
      portfolio: null,
      portfolioPL: null
    }
  },
  // When component is created:
  created () { 
    // Check if the user is logged in
    checkUser(this.$root)
    // Get the user's Portfolio info from the server
    getUserPortfolio(this.PFid).then(portfolio => {
      this.portfolio = portfolio
    }).catch((error) => {
    console.error(error)
  })
  },
  methods: {
    redirectToAddStock: function () {
      this.$router.push('/portfolio/addStock/' + this.PFid)
    },
    redirectToSellStock: function () {
      this.$router.push('/portfolio/sellStock/' + this.PFid)
    },
    updatePL: function (event) {
      this.portfolioPL = event
    }
  },
  components: {
    navbar: NavBar,
    transactionwidget: TransactionWidget,
    securitieswidget: securitiesWidget
  }
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.currentDashboard {
  margin-top: 5vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.currentDashboard p {
  font-size: 1.5em;
}
.currentDashboard h1 {
  font-size: 3em;
}
.row {
  display: flex;
  flex-direction: row;
  margin-left: 8vw;
  margin-right: 8vw;
  
}
.securitiesWidget {
  margin-right: 4vw;
}
.transactionWidget, .securitiesWidget {
  height: 70vh;
  /* width: 40vw; */
  overflow-y: auto;
}
button {
  font-size: 1.5em;
  font-weight: 400;
  background-color: #4296EC;
  width: 230px;
  height: 50px;
  min-height: 50px;
  margin: 1vh 0px;
  padding: 5px 10px;
  border-radius: 5px;
  font-family: Roboto;
  color: #FFFFFF;
}
</style>
