<template>
  <div>
    <b>{{item.symbol}}</b>
    <abbr>{{item.name}}</abbr>
  </div>
</template>

<script>
export default {
  props: { item: { required: true } }
}
</script>