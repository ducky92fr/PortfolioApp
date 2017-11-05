<template>
  <div class='main'>
    <navbar></navbar>
    <!-- <p v-if='lastUpdate'> Portfolio last changed on {{lastUpdate}}</p> -->
    <div class='currentDashboard' v-if="portfolio">
      <h1 v-if="portfolio">{{portfolio.name}}</h1>
      <section class='notification is-info PFvalue'>
        <p>Current value <span v-if="portfolioValue">{{formatNumber(portfolioValue, 2, ' ', '$')}}</span></p>
        <p>Change <span v-if="portfolioPL">{{portfolioPL}}</span></p>
      </section>
      <section class='PFactions'>
        <button @click="redirectToAddStock()" class='buy'>ADD STOCK</button>
        <button @click="redirectToSellStock()" class='sell'>REMOVE STOCK</button>
      </section>
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
import { formatPL } from './tinyComponents/helperFunctions'
import NavBar from './tinyComponents/navbar'
import TransactionWidget from './tinyComponents/TransactionWidget'
import securitiesWidget from './tinyComponents/securitiesWidget'
import accounting from 'accounting'
export default {
  name: 'PFDetailPage',
  data () {
    return {
      PFid: this.$route.params.id,
      portfolio: null,
      portfolioPL: null,
      portfolioValue: null,
      lastUpdate: null
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
      this.portfolioPL = formatPL(event.PL)
      this.portfolioValue = event.value
      this.lastUpdate = event.lastUpdate
    },
    formatNumber: function (num, dec, sep = ' ', pre = '', post = '') {
      return pre + accounting.formatNumber(num, dec, sep) + post
    },
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
  margin: 30px 0px 50px 0px;
  padding: 0px 50px;
  min-height: 100px;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.currentDashboard p {
  font-size: 1.5em;
}
.currentDashboard h1 {
  font-size: 4em;
  font-weight: 600;
  margin-bottom: 0px;  
  margin-right: 12px;
}
.PFvalue, .PFactions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
  margin-left: 1vw;
  padding: 1vh 1vw;
}
.PFvalue {
  align-items: flex-start;
  min-height: 65px;
  margin-bottom: 0px;
  background-color: #f3f3f3;
  color: #525252;
}
.PFvalue  p {
  margin: 0px;
  font-weight: 600;
  font-size: 1.3em;
}
.PFactions {
  flex-direction: row;
  padding: 0px;
  margin-left: auto;
  margin-right: 50px;
}
.PFactions button {
  font-size: 1.3em;
  font-weight: 600;
  width: 178px;
  margin: 0px 7px;
  padding: 6px 15px;
  border-radius: 3px;
  color: #FFFFFF;
}
.PFactions .buy, .PFactions .sell {
  background-color: #3a7aef;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 8vw;
  margin-right: 8vw;
  width: 84vw;
}
.securitiesWidget {
  margin-right: 4%;
}
.transactionWidget, .securitiesWidget {
  height: 70vh;
  width: 48%;
}
</style>
