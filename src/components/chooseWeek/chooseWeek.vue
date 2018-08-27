<template>
  <Modal
    v-model="weekModalFlag"
    title="上课周次"
    @on-ok="ok"
    @on-cancel="cancel"
    :mask-closable="false"
    @on-visible-change="changeVisible"
  >
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
    <CheckboxGroup
      v-model="checkAllGroup"
      @on-change="checkAllGroupChange"
      class="checkboxGroup"
    >
      <Checkbox
        v-for="(item, index) in weekList"
        :label="item"
        class="checkboxItem"
        :key="index"
      ></Checkbox>
    </CheckboxGroup>
  </Modal>
</template>

<script>
  export default {
    name: "chooseWeek",
    data(){
      return{
        indeterminate: false,
        checkAll: false,
        checkAllGroup: [],
        checkDouble: false,
        checkSingle: false,
        weekList:['第1周','第2周','第3周','第4周','第5周','第6周','第7周','第8周','第9周','第10周','第11周','第12周',]
      }
    },
    props:{
      weekModalFlag:{
        required: true,
        type: Boolean
      }
    },
    methods: {
      _updateVisible(flag) {
        this.weekModalFlag = flag;
        this.$emit('update:weekModalFlag', this.weekModalFlag); //更新对话框的显示状态
      },
      //对话框显示隐藏
      changeVisible(){
        if (this.weekModalFlag){

        } else {
          this.checkAllGroup=[];
          this.checkAll=false;
          this.checkSingle = false;
          this.checkDouble = false;
          this.indeterminate=false;
        }
      },
      //点击全选事件
      handleCheckAll () {
        this.checkSingle = false;
        this.checkDouble = false;
        if (this.indeterminate) {
          this.checkAll = true;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        if (this.checkAll) {
          this.weekList.forEach(item=>{
            this.checkAllGroup.push(item);
          });
        } else {
          this.checkAllGroup = [];
        }
      },
      //点击每一周事件
      checkAllGroupChange (data) {
        this.checkDouble = false;
        this.checkSingle = false;
        if (data.length === this.weekList.length) {
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
          this.weekList.forEach(item=>{
            if (this.getNumFormStr(item) % 2 === 0){
              this.checkAllGroup.push(item);
            }
          });
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
          this.weekList.forEach(item=>{
            if (this.getNumFormStr(item) % 2 === 1){
              this.checkAllGroup.push(item);
            }
          });
        }
      },
      //确定回调事件
      ok(){
        if (this.checkAllGroup.length===0){
          this.$emit('ok', '选择周次');
          this._updateVisible(false);
        } else {
          this.$emit('ok', this.checkAllGroup.join(',')); // 显示选中周次
          this._updateVisible(false);
        }
      },
      //取消回调事件
      cancel(){
        this._updateVisible(false);
      },
      //字符串里提取数字
      getNumFormStr(str){
        return str.replace(/[^0-9]/ig,"");
      },
    }
  }
</script>

<style scoped>
  .checkboxGroup{
    display: flex;
    height: 200px;
    width: 100%;
    flex-wrap: wrap;
  }
  .checkboxItem{
    flex-basis: 20%;
  }
</style>
