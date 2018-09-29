<template>
  <range :min="min" :max="max"></range>
</template>

<script>
  import range from './range'
  export default {
    name: "example",
    data(){
      return{
        min:'0',  // 左侧值
        max:'100' // 右侧值
      }
    },
    components:{
      range
    }
  }
</script>

<style scoped>

</style>