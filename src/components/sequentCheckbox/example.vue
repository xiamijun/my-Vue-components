<template>
  <div>
    <button @click="updateShowDialog(true)">选择节次</button>
    <sequentCheckbox
      :periodModal.sync="showPeriodFlag"
      @ok="ok"
      @error="error"
    ></sequentCheckbox>
  </div>
</template>

<script>
  import sequentCheckbox from './sequentCheckbox'
  export default {
    name: "example",
    components: {
      sequentCheckbox
    },
    data() {
      return {
        showPeriodFlag: false
      }
    },
    methods: {
      ok(data) {
        this.$alert(data, '成功', {
          confirmButtonText: '确定',
        });
      },
      error() {
        this.$alert('不是连续节次', '失败', {
          confirmButtonText: '确定',
        });
      },
      updateShowDialog(flag) {
        this.showPeriodFlag = flag;
      }
    }
  }
</script>

<style scoped>

</style>
