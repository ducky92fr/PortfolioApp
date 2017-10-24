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
          <v-btn
            @click="submit"
            :disabled="!valid"
          >
            Create Portfolio
          </v-btn>
        </v-form>
      </template>
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
      valid: false,
      user: this.$root.user,
      nameRules: [
        (v) => !!v || 'Portfolio name is required',
      ]
    }
  },
  methods: {
    submit () {
      createNewPortfolio(this.name)
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
</style>
