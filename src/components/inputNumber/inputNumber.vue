<template>
  <div>
    <span :class="{red:isRed}">{{inputContent.length}}</span>
    <span>/</span>
    <span>{{maxLength}}</span>
  </div>
</template>

<script>
  export default {
    name: "inputNumber",
    props: {
      inputContent: {
        type: String,
        default: ''
      },
      maxLength: {
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