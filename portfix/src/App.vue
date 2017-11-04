<template>
  <div id="app">
    <v-app>
      <router-view :key="$route.fullPath"/>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #fafafa;
}
body {
  height: 100vh;
  width: 100vw;
  margin: 0px;
  padding: 0px;
}
html {
  height: 100vh;
  width: 100vw;
  margin: 0px;
  padding: 0px;
  font-size: 16px;
}
</style>
