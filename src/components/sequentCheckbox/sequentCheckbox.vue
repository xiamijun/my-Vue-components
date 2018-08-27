<template>
  <Modal
    v-model="periodModal"
    title="上课节次"
    @on-ok="ok"
    @on-cancel="cancel"
    :mask-closable="false"
    @on-visible-change="changeVisible"
  >
    <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
      <span style="font-weight: bold">请选择上课节次</span>
      <Checkbox
        :indeterminate="indeterminate"
        :value="checkAll"
        @click.prevent.native="handleCheckAll"
        style="float: right"
      >全选</Checkbox>
    </div>
    <CheckboxGroup
      v-model="checkAllGroup"
      @on-change="checkAllGroupChange"
      class="checkboxGroup"
    >
      <Checkbox
        v-for="(item,index) in AllPeriod"
        :label="item"
        :disabled="enableArr.indexOf(index+1)===-1"
        class="checkboxItem"
        :key="index"
      ></Checkbox>
    </CheckboxGroup>
  </Modal>
</template>

<script>
  export default {
    name: "sequentCheckbox",
    data(){
      return{
        indeterminate: false,
        checkAll: false,
        checkAllGroup: [],
        MAX_LENGTH: 10,
        enableArr:[1,2,3,4,5,6,7,8,9,10],
        AllPeriod: ['第1节','第2节','第3节','第4节','第5节','第6节','第7节','第8节','第9节','第10节']
      }
    },
    props:{
      periodModal:{
        required: true,
        type: Boolean
      }
    },
    methods: {
      _updateVisible(flag) {
        this.periodModal = flag;
        this.$emit('update:periodModal', this.periodModal); //更新对话框的显示状态
      },
      changeVisible(){
        if (this.periodModal) {
          this.enableArr=this.setEnableArrForAll();
        } else{
          this.checkAllGroup=[];
          this.checkAll=false;
          this.indeterminate=false;
        }
      },
      //点击全选事件
      handleCheckAll () {
        if (this.indeterminate) {
          this.indeterminate = true;
          this.checkAll = true;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        if (this.checkAll) {
          for (let i = 1; i <= this.MAX_LENGTH;i ++) {
            this.checkAllGroup.push('第' + i + '节');
          }
        } else {
          this.checkAllGroup = [];
        }
        this.enableArr=this.setEnableArrForAll();
      },
      //点击每一节事件
      checkAllGroupChange (data) {
        if (data.length === this.MAX_LENGTH) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
        //只能点击连续
        this.setDisabled(data);
      },
      //只能点击连续,根据已选中设置不可点击的
      setDisabled(data){
        this.enableArr=[];
        data.forEach(item=>{
          for (let i=1;i<=this.MAX_LENGTH;i++){
            if (item.indexOf(i)!==-1){
              if (i>=10){
                // this.enableArr.push(this.MAX_LENGTH);
                this.enableArr.splice(this.enableArr.indexOf(1),1)
                this.enableArr.splice(this.enableArr.indexOf(2),1)
              }
              this.enableArr.push(i,i-1,i+1);
            }
          }
        })
      },
      //确定回调事件
      ok(){
        let numArr=[];
        this.checkAllGroup.forEach(item=>{
          numArr.push(this.getNumFormStr(item));
        });
        this.sortArr(numArr);
        let resultArr=[];
        numArr.forEach(item=>{
          resultArr.push(`第${item}节`);
        });

        if (this.isSequent(resultArr)||resultArr.length===1) {
          this.$emit('ok', resultArr.join(',')); // 显示选中节次
          this._updateVisible(false);
        }else {
          this.$emit('error');
          this._updateVisible(false);
        }

      },
      //取消回调事件
      cancel(){
        this._updateVisible(false);
      },
      //选择的节次按顺序排列
      sortArr(arr){
        return arr.sort((a,b)=>{
          return a-b;
        });
      },
      //字符串里提取数字
      getNumFormStr(str){
        return str.replace(/[^0-9]/ig,"");
      },
      //判断顺序排列的节次是否连续
      isSequent(arr){
        let numArr=[];
        arr.forEach(item=>{
          numArr.push(this.getNumFormStr(item));
        });
        return this.maxArray(numArr) - this.minArray(numArr) === arr.length-1;
      },
      //求数组最大最小值
      maxArray(arr) {
        return Math.max(...arr);
      },
      minArray(arr) {
        return Math.min(...arr);
      },
      //设置全部可点击
      setEnableArrForAll(){
        let arr=[];
        for (let i=1;i<=this.MAX_LENGTH;i++){
          arr.push(i);
        }
        return arr;
      },
    }
  }
</script>

<style scoped>
  .checkboxGroup{
    display: flex;
    height: 100px;
    width: 100%;
    flex-wrap: wrap;
  }
  .checkboxItem{
    flex-basis: 20%;
  }
</style>
