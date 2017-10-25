<template>
  <div>
    <navbar></navbar>
    <div class="homePage">
      <h1>{{ msg }}</h1>
      <portfolio-widget class='PFwidget'></portfolio-widget>
    </div>
  </div>
</template>

<script>
import NavBar from './tinyComponents/navbar'
import PortfolioWidget from './tinyComponents/PortfolioWidget'
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Home'
    }
  },
  components: {
    navbar: NavBar,
    portfolioWidget: PortfolioWidget
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
}
.PFwidget {
  margin-top: 10vh; 
}
</style>
