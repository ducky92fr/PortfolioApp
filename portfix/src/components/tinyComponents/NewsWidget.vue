<template>
  <div class='newsWidget'>
    <h1>NEWS</h1>
    <p v-if="stocks">{{stocks}}</p>
    <p>{{news}}</p>
  </div>
</template>

<script>
import { getNewsFromIEX } from '@/api'
export default {
  name: 'NewsWidget',
  data () {
    return {
      fakenews: []
    }
  },
  computed: {
    news: function () {
      return 1
    }
  },
  props: ['stocks']
}
</script>

<style scoped>
 h1 {
   font-size: 2em;
 }
</style>
