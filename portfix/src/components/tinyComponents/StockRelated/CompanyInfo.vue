<template>
  <div class='company-info'>
    <h1>Company</h1>
    <h2>CEO<span>{{company.CEO}}</span></h2>
    <p class='description-text'>
      <span>Description</span>
      {{company.description}}
      </p>
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #363636
}
.description-text {
  text-align: start;
  font-size: 1.5em;
  color: #797575;
  font-weight: 600;
}
.description-text span {
  margin-right: 5px;
  color: #363636  
}
h1 {
  font-size: 2.1em;
  font-weight: 600;
  margin: 0px;
}
h2 {
  font-size: 1.5em;
  font-weight: 600;
  margin: 25px 0px 5px 0px;
  }
h2 span {
  color: #797575;
  margin-left: 20px;
}
</style>
