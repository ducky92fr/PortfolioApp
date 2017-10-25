<template>
  <div>
    <h1 id="test">{{ msg }}</h1>
    <div class='portfolioWidget'>
      <h1>Portfolios</h1>
      <div class='portfolios'>
        <div class='singlePF' v-for="portfolio in portfolios" :key="portfolio._id">
          <h2>{{portfolio.name}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkUser } from '@/api'
import { getUserPortfolios } from '@/api'
export default {
  name: 'Test',
  data () {
    return {
      msg: 'Test',
      portfolios: []
    }
  },
  created () {
    checkUser(this.$root)
    getUserPortfolios().then(portfolios => {
      this.portfolios = portfolios
    })
  }
}
</script>

<style scoped>
#test {
  font-size: 4em;
}
h1 {
  font-size: 3em;
}
.singlePF h2 {
  font-size: 2em;
  font-weight: 400;
}
</style>
