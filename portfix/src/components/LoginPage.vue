<template>
  <div class="LoginPage">
    <h1>Log-in</h1>
    <h2 v-if='error'>
      {{error}}
    </h2>
    <template>
      <v-form class='LoginForm' v-model="valid" ref="form" lazy-validation>
        <v-text-field
          label="Username"
          v-model="username"
          :rules="usernameRules"
          required
        ></v-text-field>
        <v-text-field
          label="Password"
          type="password"
          v-model="password"
          :rules="passwordRules"
          required

        ></v-text-field>

        <v-btn
          @click="login"
          :disabled="!valid"
        >
          Login
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
    </template>
  </div>
</template>

<script>
import { logIn } from '@/api'
export default {
  name: 'LoginPage',
  data () {
    return {
      username: '',
      password: '',
      error: null,
      valid: false,
      usernameRules: [
        (v) => !!v || 'Username is required',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
      ]
    }
  },
  methods: {
    login () {
      this.error = null
      logIn({
        username: this.username,
        password: this.password
      }, this.$root).then( data => {
        if (data) this.$router.push('/')
        else {
          this.error = 'Seems like you entered a wrong username/password. Try again.'
        }
      }).catch( err => {
        this.error = 'Error happened during Log-in'
        console.error('Login error ', err)
      })
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
  .LoginPage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    margin-bottom: 20vh;
  }

  .LoginForm {
    width: 30%;
    margin: 2vh 10vw;
  }

  h1 {
    font-weight: normal;
    font-size: 4em;
    margin: 5vh 10vw;
  }

  h2 {
    font-weight: normal;
    font-size: 2em;
    color: #e64444;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
