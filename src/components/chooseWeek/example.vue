<template>
  <div>
    <button @click="updateShowWeek(true)">选择周次</button>
    <chooseWeek
      :weekModalFlag.sync="showWeekFlag"
      @ok="okWeek"
    ></chooseWeek>
  </div>
</template>

<script>
  import chooseWeek from './chooseWeek'
  export default {
    name: "example",
    components: {
      chooseWeek
    },
    data() {
      return {
        showWeekFlag: false
      }
    },
    methods: {
      okWeek(data) {
        this.$alert(data, '选择周次', {
          confirmButtonText: '确定',
        });
      },
      updateShowWeek(flag) {
        this.showWeekFlag = flag;
      }
    }
  }
</script>

<style scoped>

</style>
