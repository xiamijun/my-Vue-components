<template>
  <div>
    <span :class="{red:isRed}">{{inputContent.length}}</span>
    <span>/</span>
    <span>{{maxLength}} (请填写{{minLength}}-{{maxLength}}字)</span>
  </div>
</template>

<script>
  export default {
    name: "inputNumber",
    props: {
      inputContent: {
        //输入内容
        type: String,
        default: ''
      },
      minLength:{
        //最小长度
        type: String,
        default: '1'
      },
      maxLength: {
        //最大长度
        type: String,
        default: '10'
      }
    },
    data() {
      return {
        isRed: false
      }
    },
    watch: {
      inputContent: {
        handler() {
          if (parseInt(this.inputContent.length) > parseInt(this.maxLength)) {
            this.isRed = true;
          } else {
            this.isRed = false;
          }
        },
        deep: true
      }
    }
  }
</script>

<style scoped>
  .red {
    color: red;
  }
</style>