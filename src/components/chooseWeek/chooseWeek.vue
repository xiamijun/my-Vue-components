<template>
  <div>
    <Modal v-model="showModal" title="上课周次" @on-ok="ok" @on-cancel="cancel">
      <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
        <span style="font-weight: bold">请选择上课周次</span>
        <Checkbox
          :indeterminate="indeterminate"
          :value="checkAll"
          @click.prevent.native="handleCheckAll" style="float: right">全选</Checkbox>
        <Checkbox
          v-model="checkDouble"
          @click.native="handleCheckDouble"
          style="float: right">双周</Checkbox>
        <Checkbox
          v-model="checkSingle"
          @click.native="handleCheckSingle"
          style="float: right">单周</Checkbox>
      </div>
      <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange" class="checkboxGroup">
        <div class="col">

          <Checkbox label="第1周"></Checkbox>
          <Checkbox label="第4周"></Checkbox>
          <Checkbox label="第7周"></Checkbox>
          <Checkbox label="第10周"></Checkbox>
          <Checkbox label="第13周"></Checkbox>
          <Checkbox label="第16周"></Checkbox>
        </div>
        <div class="col">
          <Checkbox label="第2周"></Checkbox>
          <Checkbox label="第5周"></Checkbox>
          <Checkbox label="第8周"></Checkbox>
          <Checkbox label="第11周"></Checkbox>
          <Checkbox label="第14周"></Checkbox>
          <Checkbox label="第17周"></Checkbox>
        </div>
        <div class="col">
          <Checkbox label="第3周"></Checkbox>
          <Checkbox label="第6周"></Checkbox>
          <Checkbox label="第9周"></Checkbox>
          <Checkbox label="第12周"></Checkbox>
          <Checkbox label="第15周"></Checkbox>
          <Checkbox label="第18周"></Checkbox>
        </div>
      </CheckboxGroup>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "chooseWeek",
    data(){
      return{
        showModal:true,
        indeterminate: true,
        checkAll: false,
        checkAllGroup: [],
        checkDouble:false,
        checkSingle:false,
      }
    },
    methods: {
      //点击全选事件
      handleCheckAll () {
        this.checkSingle = false;
        this.checkDouble = false;
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        if (this.checkAll) {
          for (let i = 1; i <= 18;i ++) {
            this.checkAllGroup.push('第' + i + '周');
          }
        } else {
          this.checkAllGroup = [];
        }
      },
      //点击每一周事件
      checkAllGroupChange (data) {
        this.checkDouble = false;
        this.checkSingle = false;
        if (data.length === 18) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
      },
      //点击双周事件
      handleCheckDouble () {
        this.checkAllGroup = [];
        this.checkSingle=false;
        this.indeterminate = true;
        if (this.checkDouble) {
          this.checkAllGroup = [];
          this.indeterminate = false;
        } else {
          for (let i = 2; i <= 18;i += 2) {
            this.checkAllGroup.push('第' + i + '周');
          }
        }
      },
      //点击单周事件
      handleCheckSingle () {
        this.checkAllGroup = [];
        this.checkDouble=false;
        this.indeterminate = true;
        if (this.checkSingle) {
          this.checkAllGroup = [];
          this.indeterminate = false;
        } else {
          for (let i = 1; i <= 18; i += 2) {
            this.checkAllGroup.push('第' + i + '周');
          }
        }
      },
      //确定回调事件
      ok(){
        this.$emit('ok', this.checkAllGroup.join(','));
      },
      //取消回调事件
      cancel(){
        this.$emit('cancel');
      }
    }
  }
</script>

<style scoped>
  .col{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
  .checkboxGroup{
    display: flex;
    height: 200px;
    width: 300px;
    justify-content: space-between;
  }
</style>