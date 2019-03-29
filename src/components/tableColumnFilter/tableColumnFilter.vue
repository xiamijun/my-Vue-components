<template>
  <div>
    <Button type="primary" @click="showFilterPanelFlag = !showFilterPanelFlag">
      <span class="icon_filter"></span>
    </Button>
    <transition>
      <div v-show="showFilterPanelFlag" class="filter-panel">
        <CheckboxGroup v-model="selected" @on-change="checkAllGroupChange">
          <div v-for="item in filterFiled" :key="item">
            <Checkbox :label="item" style="margin: 2px 5px"></Checkbox>
          </div>
        </CheckboxGroup>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "tableColumnFilter",
    props: {
      filterFiled: {
        type: Array,
        default: function () {
          return ['标题', '年度', '版本', '创建人', '创建时间', '使用状态']
        }
      },
      defaultCheck: {
        type: Array
      }
    },
    data() {
      return {
        showFilterPanelFlag: false,
        //已选中的数据
        selected: [...this.defaultCheck],
      }
    },
    methods: {
      checkAllGroupChange() {
        this.$emit('filter-field-change', this.selected);
      }
    }
  }
</script>

<style scoped lang="less">
  .filter-panel {
    width: 166px;
    min-height: 120px;
    height: 500px;
    position: absolute;
    background-color: white;
    z-index: 9999;
    margin-left: -113px;
    overflow-y: scroll;
  }

  .icon_filter {
    display: inline-block;
    width: 14px;
    height: 14px;
    position: relative;
    top: 5px;
    background: url("filter.png") no-repeat center center;
  }

</style>