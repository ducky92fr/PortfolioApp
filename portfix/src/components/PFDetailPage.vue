<template>
  <div class='main'>
    <navbar></navbar>
    <!-- <pre>{{$data}}</pre> -->
    <h1 v-if="portfolio">{{portfolio.name}}</h1>
    <div class='currentDashboard' v-if="portfolio">
      <p>Current value: {{portfolio.value}}</p>
    </div>
  </div>
</template>

<script>
import { checkUser } from '@/api'
import { getUserPortfolio } from '@/api'
import NavBar from './tinyComponents/navbar'
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
  components: {
    navbar: NavBar
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
</style>
