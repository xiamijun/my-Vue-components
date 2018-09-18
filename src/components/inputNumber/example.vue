<template>
  <div>
    <textarea name="" id="" cols="30" rows="10" v-model="inputText"></textarea>
    <inputNumber
      :inputContent="inputText"
      :maxLength="10">
    </inputNumber>
  </div>
</template>

<script>
  import inputNumber from './inputNumber'

  export default {
    name: "example",
    data() {
      return {
        inputText: '输入框回显长度'
      }
    },
    components: {
      inputNumber: inputNumber
    }
  }
</script>

<style scoped>

</style>