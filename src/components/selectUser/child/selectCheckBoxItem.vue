<!--
    by: wlwang 2018/1/20
    name: checkedBox 公共组件选择人员、选择教室.......复选框组件
    notes:
-->
<template>
    <div :class="{
        checkBox:true,
        isRadio:!checkModel,
        checked:checkedStatus}"
        @click="selectTableCurrent"
    >
    </div>
</template>
<script>
    export default {
        name:'checkBoxItem',
        props:{
            checkModel:{
                type:Boolean,
                default:true
            },
            isChecked:{
                type:Boolean,
                default:false
            }
        },
        data () {
            return {

            }
        },
        computed:{
          checkedStatus(){
              return this.isChecked;
          }
        },
        methods: {
            selectTableCurrent(){
                this.$emit("selectCurrentTableItem")
            }
        }
    }
</script>
<style scoped lang="less">
  @baseThemeColor: #007bd9;
/*选中背景样式设置*/
.checkOkImg(){
    background-position: center;
    background-repeat: no-repeat;
    background-size: 10px 10px;
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTEyODg5MjYwNjEzIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwNTMgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE4NjkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIuOTA2MjUiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTI4Ni4zMzcwNDkgNDU5LjEyNzQ1NCA0MjUuMTczOTE1IDcyNy42OTY2NzVDNDI1LjE3MzkxNSA3MjcuNjk2Njc1IDY1MC43OTQxOTkgMTgxLjkyNDE2OSAxMDA2LjU2MTkzNyAwIDk5Ny44NzI1MjYgMTI5Ljk1Mzc0MSA5NjMuMTcwMjI4IDI0Mi41NTYzMzQgMTAyMy45MTMwODYgMzgxLjE3MTgxMyA4NjcuNzI1MDcyIDQxNS44MTg3NjUgNTQ2LjY1OTYzMSA4MDUuNjUyMzE2IDQ0Mi41NTI3MzcgOTk2LjIzODIyMiAyOTUuMDI2NDYgODE0LjMxNDA1NCAxMjEuNDg3Mjk3IDY3NS42OTg1NzQgMC4wMDE1OCA2MzIuMzg5ODg1TDI4Ni4zMzcwNDkgNDU5LjEyNzQ1NFoiIHAtaWQ9IjE4NzAiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L3N2Zz4=");
}
.checkBox{
    width: 14px;
    height: 14px;
    margin: 0 auto;
    border-radius: 3px;
    border: 1px solid #aaa;
    background-color: #fff;
    &.isRadio{
        border-radius: 10px;
    }
    &.checked{
        background-color: @baseThemeColor;
        border: none;
        .checkOkImg();
    }
}
</style>
