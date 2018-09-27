<template>
  <div>
    <button @click="openDateSelect">选择日期</button>
    <dateSelect :showFlag.sync="showDateFlag" :tableData="dateList" @clearList="clearList"
                @newList="newList"></dateSelect>
  </div>
</template>

<script>
  import dateSelect from './dateSelect'

  export default {
    name: "example",
    data() {
      return {
        showDateFlag: false,
        dateList: []
      }
    },
    methods: {
      openDateSelect() {
        this.showDateFlag = true;
      },
      clearList() {
        this.dateList = [];
      },
      newList(data) {
        this.dateList = data;
      }
    },
    components: {
      dateSelect
    }
  }
</script>

<style scoped>

</style>