<template>
  <div>
    <button @click="modalFlag=true">打开</button>
    <tip-modal :showTipFlag.sync="modalFlag" :title="'提示'">
      确定取消删除该学校吗?
    </tip-modal>
  </div>
</template>

<script>
  import TipModal from './index.vue';
  export default {
    name: '',
    data () {
      return {
        modalFlag:false
      }
    },
    components:{
      TipModal
    }
  }
</script>

<style scoped>

  
</style>
