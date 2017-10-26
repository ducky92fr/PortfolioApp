// Todo:
// - Dropdown list with the user PFs as options

<template>
  <div>
    <navbar></navbar>
    <div class="addStockPage">
      <h1>Add a new Stock position</h1>
      <template>
        <v-form class='form' v-model="valid" ref="form" lazy-validation>
          <v-text-field
            label="Ticker"
            v-model="ticker"
            :rules="tickerRules"
            required
          ></v-text-field>
          <v-text-field
            label="Portfolio"
            v-model="portfolio"
            :rules="portfolioRules"
            required
          ></v-text-field>
          <v-btn
            @click="submit"
            :disabled="!valid"
          >
            Add stock position
          </v-btn>
        </v-form>
      </template>
    </div>
  </div>
</template>

<script>
import { checkUser, addStockToPortfolio } from '@/api'
import NavBar from './tinyComponents/navbar'
export default {
  name: 'AddStockPage',
  data () {
    return {
      msg: '',
      ticker: '',
      portfolio: this.$route.params.id,
      valid: false,
      user: this.$root.user,
      tickerRules: [
        (v) => !!v || 'Stock ticker is required',
      ],
      portfolioRules: [
        (v) => !!v || 'Portfolio is required',
      ]
    }
  },
  methods: {
    submit () {
      addStockToPortfolio({ticker: this.ticker, portfolioID: this.portfolio})
    }
  },
  components: {
    navbar: NavBar
  },
  created () {
    checkUser(this.$root)
    this.user = this.$root.user
  }
}
</script>

<style scoped>
  .addStockPage {
    margin: 5vh 10vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  form {
    margin-top: 5vh;
    width: 30%;
  }
  h1 {
    font-weight: normal;
    font-size: 3em;
  }
  button {
    margin-top: 3vh;
  }
</style>
