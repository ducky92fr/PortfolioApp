<template>
  <div>
    <navbar></navbar>
    <div class="screener">
      <h1>Screener</h1>
      <form :action="screenStocks">
        <select v-model="sector" class='sector-input'>
          <option disabled value="">Please select one</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        <v-btn @click="screenStocks">
            Lookup Stocks
        </v-btn>
      </form>
    </div>
  </div>
</template>

<script>
import { checkUser } from '@/api'
import NavBar from './tinyComponents/navbar'
export default {
  name: 'Screener',
  data () {
    return {
      allStocksArray: null,
      sector: null
    }
  },
  created () {
    checkUser(this.$root)
    if (!this.$root.user) this.$router.push('/login')
  },
  components: {
    navbar: NavBar
  },
  methods: {
    screenStocks: function () {
      console.log('screen', this.sector)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.screener {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: auto;
  height: calc(100vh - 55px);
}
.sector-input {
  height: 30px;
  width: 240px;
  border: 1px solid grey;
}
</style>
