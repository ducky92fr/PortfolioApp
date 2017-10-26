// Todo:
// - Dropdown list with the user PFs as options
// - Proper data verification rules

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
          <v-text-field
            label="At Date"
            v-model="date"
            :rules="dateRules"
            required
          ></v-text-field>
          <v-text-field
            label="Quantity"
            v-model="quantity"
            :rules="quantityRules"
            required
          ></v-text-field>
          <v-text-field
            label="And Price"
            v-model="price"
            :rules="priceRules"
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
      date: Date.now(),
      valid: false,
      user: this.$root.user,
      price: null,
      quantity: 1,
      tickerRules: [
        (v) => !!v || 'Stock ticker is required',
      ],
      portfolioRules: [
        (v) => !!v || 'Portfolio is required',
      ],
      dateRules: [
        (v) => !!v || 'Date is required',
      ],
      priceRules: [
        (v) => !!v || 'Price is required',
      ],
      quantityRules: [
        (v) => !!v || 'Quantity is required',
      ]
    }
  },
  methods: {
    submit () {
      addStockToPortfolio({
        ticker: this.ticker,
        portfolioID: this.portfolio,
        date: this.date,
        price: this.price,
        quantity: this.quantity
      })
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
