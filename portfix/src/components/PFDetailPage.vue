<template>
  <div>
    <h1 id="test">{{ msg }}</h1>
    {{$route.params.id}}
  </div>
</template>

<script>
import { checkUser } from '@/api'
export default {
  name: 'PFDetailPage',
  data () {
    return {
      msg: 'PFDetailPage',
      portfolios: []
    }
  },
  created () {
    checkUser(this.$root)
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
