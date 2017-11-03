<template>
  <div class="navbar">
    <router-link to="/">
    <h1>StockAwesome</h1>
    </router-link>
    <div class='dropdownmenu'>
      <router-link to="/addportfolio">      
        <button><img src="../../assets/icons/sign1.svg" alt="Add"></button>
      </router-link>
      <div class="dropdown-content">
        <router-link to="/addportfolio">
          <p>Create a new portfolio</p>
        </router-link>
      </div>
    </div>
    <button v-on:click='callLogout' class='button is-warning logout'>
      Logout
    </button>
    <h2>
      Hello, {{user.name}}
    </h2>
  </div>
</template>

<script>
import { checkUser, logout} from '@/api'
export default {
  name: 'NavBar',
  data () {
    return {
      user: this.$root.user
    }
  },
  created () {
    checkUser(this.$root)
    this.user = this.$root.user
  },
  methods: {
    callLogout: function () {
      logout(this.$root)
      this.$router.push('/sign-up')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navbar {
    width: 100vw;
    height: 55px;
    background-color: #f3f3f3;
    display: flex;
    align-items: center;
    box-shadow: 0px 2px 5px 0px rgba(95, 95, 95, 0.2);
  }
  a {
    text-decoration: none;
  }
  h1 {
    font-size: 2em;
    padding: 0px;
    margin: 0px;
    margin-left: 0.8vw;
    font-weight: 600;
    text-decoration: none;
    color: black;
  }
  h2 {
    font-size: 1.8em;
    padding: 0px;
    margin: 0px 5vw 0px 2vw;
    font-weight: 400;
  }
  .dropdownmenu {
    margin: 0px 20px 0px auto;
    position: relative;
    display: inline-block;
    height: 35px;
  }
  /* Dropdown Button */
  .dropdownmenu button {
    padding: 0px;
    margin: 0px;
    font-size: 1.8em;
    width: 35px;
    height: 35px;
    border: none;
    cursor: pointer;
    font-weight: 400;
  }
  .dropdownmenu button img {
    width: 100%;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding-top: 0px;    
  }
  .dropdown-content p {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    height: 50px;
    width: 150px;
  } 
  .dropdownmenu:hover .dropdown-content {
    display: block;
  }
  .logout {
    margin: 0px 10px 0px 5px;
    background-color: #2196f3;
    border-radius: 3px;
    color: white;
    font-weight: 900;
    font-size: 1.1em;
    height: 30px;
    width: 70px;
  }
</style>
