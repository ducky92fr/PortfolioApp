<template>
  <div>
    <navbar></navbar>
    <div class="addPortfolioPage">
      <h1>{{ msg }}</h1>
    </div>
  </div>
</template>

<script>
import NavBar from './tinyComponents/navbar'
export default {
  name: 'AddPortfolioPage',
  data () {
    return {
      msg: ''
    }
  },
  components: {
    navbar: NavBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
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
