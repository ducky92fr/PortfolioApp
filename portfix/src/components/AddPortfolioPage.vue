// Todo: check that cash is a number, add rule
<template>
  <div>
    <navbar></navbar>
    <div class="addPortfolioPage">
      <h1>Create a new Portfolio</h1>
      <template>
        <v-form class='form' v-model="valid" ref="form" lazy-validation>
          <v-text-field
            label="Portfolio Name"
            v-model="name"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            label="Starting Cash Position"
            v-model="cash"
            :rules="cashRules"
            required
          ></v-text-field>
          <v-btn
            @click="submit"
            :disabled="!valid"
          >
            Create Portfolio
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
</template>

<script>
import { checkUser } from '@/api'
import { createNewPortfolio } from '@/api'
import NavBar from './tinyComponents/navbar'
export default {
  name: 'AddPortfolioPage',
  data () {
    return {
      msg: '',
      name: '',
      cash: 0,
      valid: false,
      user: this.$root.user,
      nameRules: [
        (v) => !!v || 'Portfolio name is required',
      ],
      cashRules: [
        (v) => !!v || 'Cash position is required',
      ],
      success: false,
      errorMessage: false
    }
  },
  methods: {
    submit () {
      createNewPortfolio({name: this.name, cash: this.cash}).then(response => {
        if (response.errorMessage) {
          this.success = false
          this.errorMessage = response.errorMessage
        }
        if (response.success) {
          this.errorMessage = false
          this.success = 'Portfolio added successfully, you will be redirected home'
          setTimeout( () => {this.$router.push('/home')}, 1500)
        }
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
  .addPortfolioPage {
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
</style>
