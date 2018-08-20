<template>
  <div class="container">
    <button @click="goChooseWeek">全选、单周、双周</button>
  </div>
</template>

<script>
  export default {
    components:{
    },
    data() {
      return {
      };
    },
    methods: {
      goChooseWeek(){
        this.$router.push('chooseWeek')
      }
    }
  }
</script>

<style scoped>
  .container{
    margin: 20px 20px;
  }
</style>