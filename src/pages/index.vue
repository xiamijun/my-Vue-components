<template>
  <div class="container">
    <button @click="goChooseWeek">全选、单周、双周</button>
    <button @click="goPasswordConfirm">密码强校验</button>
    <button @click="goSequentCheckbox">选择连续checkbox</button>
    <button @click="goInputNumber">输入框回显长度</button>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {};
    },
    methods: {
      goChooseWeek() {
        this.$router.push('chooseWeek');
      },
      goPasswordConfirm() {
        this.$router.push('passwordConfirm');
      },
      goSequentCheckbox() {
        this.$router.push('sequentCheckbox');
      },
      goInputNumber() {
        this.$router.push('inputNumber');
      }
    }
  }
</script>

<style scoped>
  .container {
    margin: 20px 20px;
  }
</style>