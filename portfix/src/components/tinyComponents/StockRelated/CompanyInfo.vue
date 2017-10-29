<template>
  <div class='company-info'>
    <h1>Company</h1>
    <div class='row'>
      <h1>CEO</h1><h1>{{company.CEO}}</h1>
    </div>
    <p class='description-text'>{{company.description}}</p>
  </div>
</template>

<script>
export default {
  name: 'CompanyInfo',
  props: ['company'],
}
</script>

<style scoped>
.company-info {
  width: 80vw;
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.description-text {
  text-align: start;
}
.row {
  display: flex;
  flex-direction: row;
  margin: 2vh 0vw;
}
.row h1 {
  font-size: 2em;
}
.row h1:last-child {
  margin-left: 2vw;
}
h1 {
  font-size: 3em;
  margin: 0px;
}
h2 {
  font-size: 2em;
  font-size: 1.7em;
  margin: auto 0px 2px 12px;
  color: #797575;
}
</style>
