<template>
  <div class='peers'>
    <h1>Peers</h1>
    <section class='peer-tags' id='tags'>
      <div v-for='peer in peers' :key='peer' class='tag is-info is-large peer'>
        <router-link :to="peer">
            {{peer}}  
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Peers',
  props: ['peers'],
}
</script>

<style scoped>
.peers {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #363636
}
.peer-tags {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 15px;
}
h1 {
  font-size: 2.1em;
  font-weight: 600;
  margin: 0px;
}
#tags .peer {
  margin: 5px 10px;
}
#tags .peer a {
  text-decoration: none;
  font-weight: 600;
  color: white;
}
</style>
