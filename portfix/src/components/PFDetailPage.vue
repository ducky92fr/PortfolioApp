<template>
  <div>
    <pre>{{$data}}</pre>
    <h1 id="test">{{ msg }}</h1>
    {{$route.params.id}}
  </div>
</template>

<script>
import { checkUser } from '@/api'
import { getUserPortfolio } from '@/api'
export default {
  name: 'PFDetailPage',
  data () {
    return {
      msg: 'PFDetailPage',
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
#test {
  font-size: 4em;
}
h1 {
  font-size: 3em;
}
</style>
