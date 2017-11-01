<template>
  <div class="navbar">
    <router-link to="/">
    <h1>StockAwesome</h1>
    </router-link>
    <div class='dropdownmenu'>
      <button>Plus</button>
      <div class="dropdown-content">
        <router-link to="/addportfolio">
          <p>Create a new portfolio</p>
        </router-link>
        <router-link to="/">
          <p>Add a stock position</p>
        </router-link>
      </div>
    </div>
    <h2>
      Hello, {{user.name}}
    </h2>
  </div>
</template>

<script>
import { checkUser } from '@/api'
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navbar {
    width: 100vw;
    height: 10vh;
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
    margin: 0px 4vw 0px 3vw;
    font-weight: 400;
  }
  .dropdownmenu {
    margin: 0px 1vw 0px auto;
    position: relative;
    display: inline-block;
    width: 10vw;
    height: 10vh;
  }
  /* Dropdown Button */
  .dropdownmenu button {
    background-color: #f3f3f3;
    padding: 0px;
    margin: 0px;
    font-size: 1.8em;
    height: 10vh;
    width: 10vw;
    border: none;
    cursor: pointer;
    font-weight: 400;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  }
  .dropdown-content p {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  } 
  .dropdown-content p:hover {
    background-color: #efefef
  }
  .dropdownmenu:hover .dropdown-content {
    display: block;
  }
  .dropdownmenu:hover button {
    background-color: #efefef;
  }
</style>
