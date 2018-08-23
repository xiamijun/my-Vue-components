<template>
  <div>
    <Modal v-model="periodModal" title="上课节次" @on-ok="ok" @on-cancel="cancel">
      <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
        <span style="font-weight: bold">请选择上课节次</span>
        <Checkbox
          :indeterminate="indeterminate"
          :value="checkAll"
          @click.prevent.native="handleCheckAll" style="float: right">全选</Checkbox>
      </div>
      <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange" class="checkboxGroup">
        <div class="col">
          <Checkbox label="第1节" :disabled="enableArr.indexOf(1)===-1"></Checkbox>
          <Checkbox label="第4节" class="sep" :disabled="enableArr.indexOf(4)===-1"></Checkbox>
          <Checkbox label="第7节" class="sep" :disabled="enableArr.indexOf(7)===-1"></Checkbox>
          <Checkbox label="第10节" class="sep" :disabled="enableArr.indexOf(10)===-1"></Checkbox>
        </div>
        <div class="col">
          <Checkbox label="第2节" :disabled="enableArr.indexOf(2)===-1"></Checkbox>
          <Checkbox label="第5节" class="sep" :disabled="enableArr.indexOf(5)===-1"></Checkbox>
          <Checkbox label="第8节" class="sep" :disabled="enableArr.indexOf(8)===-1"></Checkbox>
        </div>
        <div class="col">
          <Checkbox label="第3节" :disabled="enableArr.indexOf(3)===-1"></Checkbox>
          <Checkbox label="第6节" class="sep" :disabled="enableArr.indexOf(6)===-1"></Checkbox>
          <Checkbox label="第9节" class="sep" :disabled="enableArr.indexOf(9)===-1"></Checkbox>
        </div>
      </CheckboxGroup>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "sequentCheckbox",
    data(){
      return{
        periodModal:true,
        indeterminate: false,
        checkAll: false,
        checkAllGroup: [],
        MAX_LENGTH: 10,
        enableArr:[1,2,3,4,5,6,7,8,9,10],
      }
    },
    methods: {
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
        this.enableArr=[1,2,3,4,5,6,7,8,9,10];
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
        this.enableArr=[];
        data.forEach(item=>{
          for (let i=1;i<=this.MAX_LENGTH;i++){
            if (item.indexOf(i)!==-1){
              if (i===10){
                this.enableArr.push(10);
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
          //连续节次
          this.$alert(resultArr.join(','), '成功', {
            confirmButtonText: '确定',
          });
        }else {
          this.$alert('不是连续节次', '失败', {
            confirmButtonText: '确定',
          });
        }

      },
      //取消回调事件
      cancel(){
        this.$emit('cancel');
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
        this.sortArr(numArr);
        let length=numArr.length;
        for (let i=0;i<=length-2;i++){
          if (parseInt(numArr[i])+1===parseInt(numArr[i+1])){
            return true;
          } else {
            return false;
          }
        }
      }
    }
  }
</script>

<style scoped>
  .col{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /*justify-content: space-between;*/
  }
  .checkboxGroup{
    display: flex;
    height: 100px;
    width: 300px;
    justify-content: space-between;
  }
  .sep{
    margin-top: 10px
  }
</style>