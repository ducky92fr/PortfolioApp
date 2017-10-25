<template>
  <div class='main'>
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
  padding-top: 10vh;
}
h1 {
  font-size: 3em;
}
.currentDashboard {
  margin-top: 5vh;
}
.currentDashboard p {
  font-size: 1.5em;
}
</style>
