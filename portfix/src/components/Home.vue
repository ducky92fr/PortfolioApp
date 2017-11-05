<template>
  <div>
    <navbar></navbar>
      <detect-network v-on:detected-condition="detected">
        <div slot="offline" class='notification is-warning offline'>You're Offline! App will update prices and Portfolio info when you get back online</div>
    </detect-network>
    <div class="homePage">
      <portfolio-widget v-on:gotStocks="displayNews" class="PFwidget"></portfolio-widget>
      <newswidget class="newsWidget" :stocks="allStocksArray" v-if='allStocksArray'></newswidget>
    </div>
  </div>
</template>

<script>
import { checkUser } from '@/api'
import NavBar from './tinyComponents/navbar'
import PortfolioWidget from './tinyComponents/PortfolioWidget'
import NewsWidget from './tinyComponents/NewsWidget'
export default {
  name: 'Home',
  data () {
    return {
      allStocksArray: null,
      state: null
    }
  },
  created () {
    checkUser(this.$root)
    if (!this.$root.user) this.$router.push('/sign-up')
  },
  components: {
    navbar: NavBar,
    portfolioWidget: PortfolioWidget,
    newswidget: NewsWidget
  },
  methods: {
    displayNews: function (array) {
      this.allStocksArray = array
    },
    detected: function (e) {
      this.state = e
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.homePage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: auto;
  height: calc(100vh - 55px);
}
.PFwidget {
  margin-top: 8vh; 
  padding-bottom: 1vh;
}
.offline {
  font-weight: 600;
  font-size: 1.5em;
}
</style>
