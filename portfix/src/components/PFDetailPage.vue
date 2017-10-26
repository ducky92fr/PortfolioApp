<template>
  <div class='main'>
    <navbar></navbar>
    <pre>{{$data}}</pre>
    <h1 v-if="portfolio">{{portfolio.name}}</h1>
    <button @click="redirectToAddStock()">Add a Stock position</button>
    <div class='currentDashboard' v-if="portfolio">
      <p>Current value: {{portfolio.current.stocks.PFAPPCASH}}</p>
    </div>
    <securitieswidget :portfolioID='PFid' class='securitiesWidget'></securitieswidget>
    <transactionwidget :portfolioID='PFid' class='transactionWidget'></transactionwidget>
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
    }
  },
  created () {
    checkUser(this.$root)
    getUserPortfolio(this.PFid).then(portfolio => {
      this.portfolio = portfolio
    })
  },
  methods: {
    redirectToAddStock: function () {
      this.$router.push('/portfolio/addStock/' + this.PFid)
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
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  padding-top: 10vh;
  font-size: 3em;
}
.currentDashboard {
  margin-top: 5vh;
}
.currentDashboard p {
  font-size: 1.5em;
}
button {
  font-size: 1.5em;
  font-weight: 400;
  background-color: #4296EC;
  width: 230px;
  height: 45px;
  margin: 0px;
  padding: 5px 10px;
  border-radius: 5px;
  font-family: Roboto;
  color: #FFFFFF;
}
.transactionWidget {
  height: 40vh;
}
</style>
