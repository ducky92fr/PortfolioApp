<template>
  <div class="signupPage">
    <h1>Sign-up</h1>
    <h2 v-if='error'>
      {{error}}
    </h2>
    <template>
      <v-form class='signupForm' v-model="valid" ref="form" lazy-validation>
        <v-text-field
          label="Name"
          v-model="name"
          :rules="nameRules"
          required
        ></v-text-field>
        <v-text-field
          label="Username"
          v-model="username"
          :rules="usernameRules"
          required
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          :rules="passwordRules"
          required
        ></v-text-field>

        <v-btn
          @click="signup"
          :disabled="!valid"
        >
          Create New Account
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
    </template>
  </div>
</template>

<script>
import { signUp } from '@/api'
export default {
  name: 'SignUp',
  data () {
    return {
      name: '',
      username: '',
      password: '',
      error: null,
      valid: false,
      nameRules: [
        (v) => !!v || 'Name is required',
      ],
      usernameRules: [
        (v) => !!v || 'Username is required',
        (v) => v && v.length > 4 || 'Username must be longer than 4 characters'
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v && v.length > 6 || 'Password must be longer than 6 characters'
      ]
    }
  },
  methods: {
    signup () {
      this.error = null
      signUp({
        name: this.name,
        username: this.username,
        password: this.password
      }).then( () => {
        this.$router.push('/login')
      }).catch( err => {
        this.error = 'Error happened during sign-up'
        console.error('Signup error ', err)
      })
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
  .signupPage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    margin-bottom: 20vh;
  }

  .signupForm {
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
