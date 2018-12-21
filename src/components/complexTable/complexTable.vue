<template>
  <div>
    <Table stripe :columns="columnsData" :data="tableData"></Table>
  </div>
</template>

<script>
  export default {
    props:{
      columnsData:{},
      tableData:{}
    },
    data () {
      return {

      }
    },
  }
</script>

<style>

  
</style>
