// Todo:
// - Dropdown list with the user PFs as options
// - Proper data verification rules

<template>
  <div>
    <navbar></navbar>
    <div class="sellStockPage">
      <h1>Sell a Stock position</h1>
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
            v-model="state.date"
            :rules="dateRules"
            required
            v-on:click="dateFieldClicked"
          ></v-text-field>
          <datepicker :value="state.date" v-bind:class="{ hide: hideCalendar}" :inline="true" v-on:selected="datePicked"></datepicker>
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
            Sell stock position
          </v-btn>
        </v-form>
      </template>
      <div id='error' v-if="errorMessage">
        <p> {{errorMessage}} </p>
      </div>
      <div id='success' v-if="success">
        <p> {{success}} </p>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { checkUser, sellStockFromPortfolio } from '@/api'
import NavBar from './tinyComponents/navbar'
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'SellStockPage',
  data () {
    return {
      errorMessage: null,
      success: null,
      ticker: '',
      portfolio: this.$route.params.id,
      valid: false,
      user: this.$root.user,
      price: null,
      quantity: 1,
      hideCalendar: true,
      state: {
        date: new Date()
      },
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
      sellStockFromPortfolio({
        ticker: this.ticker,
        portfolioID: this.portfolio,
        date: this.state.date,
        price: this.price,
        quantity: this.quantity
      }).then(response=> {
      if (response.errorMessage) {
          this.success = false
          this.errorMessage = "Couldn't sell stock"
        }
        if (response.success) {
          this.errorMessage = false
          this.success = 'Stock sold successfully, you will be redirected back to your portfolio'
          setTimeout( () => {this.$router.push('/portfolio/'+ this.portfolio)}, 1400)
        }
    })
    },
    dateFieldClicked () {
      this.hideCalendar = !this.hideCalendar 
    },
    datePicked (date) {
      this.hideCalendar = true
      this.state.date = date
    }
  },
  components: {
    navbar: NavBar,
    datepicker: Datepicker
  },
  created () {
    checkUser(this.$root)
    this.user = this.$root.user
  }
}
</script>

<style scoped>
  .sellStockPage {
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
  #success, #error {
    padding: 1vh 1vw;
    margin: 1vh 1vw;
    margin-top: 2vh;
    border-radius: 15px;
    height: 40px;
  }
  #success p, #error p {
    margin: 0px;
    font-size: 1.3em; 
  }
  #success {
    background-color: #88da8c;
  }
  #error {
    background-color: #fb6868;
  }
  .hide {
    display: none;
  }
</style>
