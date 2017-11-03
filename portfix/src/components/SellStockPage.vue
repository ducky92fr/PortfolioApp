<template>
  <div>
    <navbar></navbar>
    <div class="sellStockPage">
      <h1>Sell Stock</h1>
      <template>
        <v-form class='form' v-model="valid" ref="form" lazy-validation>
          <autocomplete id="auto" :items="items" v-model="item" :get-label="getLabel" :component-item='template' @update-items="updateItems" :min-len="0"
          placeholder="Ticker" :wait="50">
          </autocomplete>
          <v-text-field
            label="At Date"
            v-model="state.date"
            :rules="dateRules"
            required
            v-on:click="dateFieldClicked"
          ></v-text-field>
          <datepicker :value="state.date" v-bind:class="{ hide: hideCalendar}" :inline="true" v-on:selected="datePicked" class='calendar'></datepicker>
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
import Sifter from 'sifter'
import Autocomplete from 'v-autocomplete'
import AutocompleteTemplate from './tinyComponents/AutocompleteTemplate'
import { checkUser, sellStockFromPortfolio, getAllListedStocksOnIEX, getLastPriceFromIEX } from '@/api'
import NavBar from './tinyComponents/navbar'
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'SellStockPage',
  data () {
    return {
      errorMessage: null,
      success: null,
      ticker: '',
      tickerList: null,
      item: {name: '', symbol:''},
      items: null,
      template: AutocompleteTemplate,
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
    },
    getLabel (item) {
      this.ticker = item.symbol
       getLastPriceFromIEX([item.symbol]).then(response => {
         this.price = response[0].price
       })
      if (item.symbol) return item.symbol + ' (' + item.name + ')'
    },
    updateItems (text) {
      let tickerList = this.tickerList
      let sifter = new Sifter(tickerList)
      var result = sifter.search(text, {
        fields: ['symbol', 'name'],
        sort: [{field: 'symbol', direction: 'asc'}],
        limit: 5
      })
      this.items = result.items.map(item => {
        return {
          symbol: tickerList[item.id].symbol,
          name: tickerList[item.id].name
          }
        })
    }
  },
  components: {
    navbar: NavBar,
    datepicker: Datepicker,
    autocomplete: Autocomplete
},
  created () {
    checkUser(this.$root)
    this.user = this.$root.user
    getAllListedStocksOnIEX().then(result => {
      this.tickerList = result.tickerList
      this.items = result.tickerList.map(item => {
        return {
          symbol: item.symbol,
          name: item.name
          }
        })
    }).catch((error) => {
    console.error(error)
  })
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
  .calendar {
    position: absolute;
    z-index: 2;
  }
   /* Autocomplete stylings */
  #auto {
    font-size: 1.5em;
    box-shadow: none;
    border-bottom: 1px solid #919191;
    margin-bottom: 30px;
    width: 320px;
    outline: none;
  }
  .v-autocomplete-list {
    width: 100%;
    text-align: left;
    border: none;
    border-top: none;
    max-height: 400px;
    overflow-y: auto;
    border-bottom: 1px solid #157977;
  }
  #auto > div > .v-autocomplete-input {
    width: 320px;    
  }
</style>
