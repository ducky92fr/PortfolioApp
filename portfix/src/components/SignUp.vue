<template>
  <div class="signupPage">
    <p v-if='error'>
      {{error.message}}
    </p>
    <h1>Sign-up</h1>
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
        this.error = err
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
    justify-content: center;
    align-items: center;
  }

  .signupForm {
    width: 30%;
    margin-left:  
  }

  h1, h2 {
    font-weight: normal;
    font-size: 4em;
    margin: 5vh auto 5vh 10vw;
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
