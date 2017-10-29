<template>
  <div class='companyInfo'>
    {{company.CEO}}
  </div>
</template>

<script>
export default {
  name: 'CompanyInfo',
  props: ['company'],
}
</script>

<style scoped>
.companyInfo {

}
</style>
