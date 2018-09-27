<!--
    by: wlwang 2018/1/2
    name: choiceUser 选择用户
    notes:
-->
<template>
  <!--
      组件说明：
      更新日期：2018年1月2日
      show-控制显示隐藏
      title-自定义窗口显示的标题
      defaultData-默认选中的数据【回显】
      choiceTeacher-显示教师筛选
      choiceStudent-显示学生筛选
      choiceParent-显示家长筛选
      choiceEnterprise-显示企业筛选
      showEmptyData-显示的时候情空历史数据
      checkType-是否复选模式
      baseUrl-高级属性，一般人请勿使用
      v-model-绑定返回的数据
      筛选条件可控设置-选择教职工
      sideDepartmentShow-侧边筛选条件（组织机构）控制显隐 默认显示
      sidegwflShow-侧边筛选条件（岗位分类）控制显隐 默认显示
      sideSexShow-侧边筛选条件（性别）控制显隐 默认显示
      sideZWShow-侧边筛选条件（职务）控制显隐 默认显示
      sideZCShow-侧边筛选条件(职称)
      sidezgqkdmShow-侧边筛选条件(在职状态)
      sideIsOrderShow-侧边筛选条件(是否在编)
      sidegwflShowOne-办学层次的筛选条件设置，0表示 全部显示
      sideSexShowOne-专业分类的筛选条件设置，同上
      sideZWShowOne-年级
      sideZCShowOne-招生类型
      sidezgqkdmShowOne-在职状态
      sideIsOrderShowOne-是否在编
      @ok-点击保存事件（参数：选中的数据列表Array）
      @cancel-点击取消事件
      handler.close=true;  //修改此值可以拦截窗口关闭
      handler.filterTeacherData  //教师搜索参数获取
      handler.filterStudentData //学生搜索参数获取
      handler.filterParentData //家长搜索参数获取
      handler.filterEnterpriseData //企业搜索参数获取
  -->
  <div style="margin:10px">
    <Button type="primary" @click="handleClickModalAll">查询教师</Button>
    <selectUser
      ref="child"
      v-model="showModel"
      :checkType="true"
      :title="modelTitle"
      @ok="ok"
      @cancel="cancel">
    </selectUser>
    <div v-if="selectedUser.length" class="selectDateFrame">
      <div class="selectDate" v-for="item in selectedUser">
        {{item}}
      </div>
    </div>
  </div>
</template>
<script>
  import selectUser from "./app-selectUser.vue";

  export default {
    data() {
      return {
        modelTitle: "查询教师",
        showModel: false,
        selectedUser: [],  //已选用户
      }
    },
    //注册组件
    components: {
      selectUser
    },
    methods: {
      //tablist 显示
      handleClickModalAll() {
        this.showModel = !this.showModel;
      },
      /**
       * 确定回调事件
       * @param selectList {Object} 选中的数据
       * @param handler {Boolean} 自定义关闭弹框
       * @return {void} 无
       */
      ok(selectList, handler) {
        if (!selectList.length) {
          handler.close = false;
          this.$Message.info("请选择数据！");
          return;
        }
        this.selectedUser = selectList;
      },
      cancel() {
      }
    }
  }
</script>
<style scoped lang="scss">
  .selectDateFrame {
    margin-top: 20px;
    border-bottom: 1px solid #ccc;
    .selectDate {
      border-top: 1px solid #ccc;
      padding: 10px;
    }
  }
</style>
