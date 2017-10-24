<template>
  <div class="hello">
  <pre>{{$data}}</pre>
    <p v-if='error'>
      {{error.message}}
    </p>
    <h1>Sign-up</h1>
    <form @submit.prevent="signup">
      <input v-model="name" required placeholder="name">
      <input v-model="username" required placeholder="username">
      <input v-model="password" required placeholder="password">
      <button>Create New Account</button>
    </form>
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
      error: null
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
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
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
