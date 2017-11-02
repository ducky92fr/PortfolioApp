<template>
  <div>
    <navbar></navbar>
    <div class="homePage">
      <portfolio-widget v-on:gotStocks="displayNews" class="PFwidget"></portfolio-widget>
      <newswidget class="newsWidget" :stocks="allStocksArray"></newswidget>
    </div>
  </div>
</template>

<script>
import NavBar from './tinyComponents/navbar'
import PortfolioWidget from './tinyComponents/PortfolioWidget'
import NewsWidget from './tinyComponents/NewsWidget'
export default {
  name: 'Home',
  data () {
    return {
      allStocksArray: null
    }
  },
  components: {
    navbar: NavBar,
    portfolioWidget: PortfolioWidget,
    newswidget: NewsWidget
  },
  methods: {
    displayNews: function (array) {
      this.allStocksArray = array
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
  height: 92vh;
}
.PFwidget {
  margin-top: 8vh; 
  padding-bottom: 1vh;
}
</style>
