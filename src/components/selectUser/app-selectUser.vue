<template>
  <div>
    <Modal v-scoped
           v-model="showModel"
           :mask-closable="false"
           :title="title"
           @on-cancel="cancel"
           :width="checkType?1000:790"
           class="vertical-center-modal selectUserFrame"
    >
      <div :class="['content',{'radioModel':checkType}]">
        <div class="tabContent">

          <!--选择教职工-->
          <div class="tabListContent">
            <!--筛选条件-->
            <div class="filterRequirementContent">
              <div class="filterRequirement" :style="{height:checkType?'423px':'385px'}">
                <div class="filterOrganization">
                  <h4 class="publicTitle">性别:</h4>
                  <Select
                    v-model="teacherFilter.filterRequirement.sex" class="cssPublicSelect" placeholder="全部">
                    <Option v-for="item in teacherFilter.sexList" :value="item.value" :key="item.value">{{ item.label
                      }}
                    </Option>
                  </Select>
                </div>

                <div class="filterOrganization">
                  <h4 class="publicTitle">姓名:</h4>
                  <Input style="left: 8px!important;" v-model="teacherFilter.filterRequirement.name" placeholder=""/>
                </div>
                <div class="filterOrganization">
                  <h4 class="publicTitle">工号:</h4>
                  <Input style="left: 8px!important;" v-model="teacherFilter.filterRequirement.jzgno" placeholder=""/>
                </div>
              </div>
              <!--查询-->
              <div>
                <Button class="selectionMchanism">查询</Button>
              </div>
            </div>
            <!--选择教职工table-->
            <div class="showTable">
              <div v-if="checkType"
                   :class="['tableCheckboxData',{select:teacherFilter.selectAllChecked}]"
                   @click="handleCheckedAllResult">
                选择全部查询结果
              </div>
              <div class="tableFrameBorderRight">
                <div
                  class="tableListContent tableFrameBorderLeft tableInfoBoxSet"
                  :class="{hasDataAndPage:!!teacherFilter.dataList.length}">
                  <div
                    :class="['tableSelectAllData',{tableSelectAllTrue:teacherFilter.selectAllTableChecked}]"
                    @click="teacherSelectAllClickFun">
                  </div>
                  <Table
                    border
                    :columns="teacherFilter.columns4"
                    :data="teacherFilter.dataList"
                    :stripe="stripe">
                  </Table>

                </div>
              </div>
            </div>

          </div>
          <!--固定-->
          <div class="rightChecked">
            <div class="selectionMechanismList">
              <h4 class="selectionNumber">已选<span>({{selected.length}})</span></h4>

              <span class="clearList" @click="handleClickClearList">清空列表</span>
            </div>
            <div class="rightCheckedUserList">
              <ul>
                <li v-for="(item,index) in selected" class="selectedList">
                  <Tooltip placement="top">
                    <span class="selectedListP">{{item.name}}</span>
                    <p slot="content">{{item.name}}</p>
                  </Tooltip>
                  <div class="listDel" @click="handleClickDelSelList(item,index)">
                    <Icon type="close"></Icon>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="ok">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import checkedItem from "./child/selectCheckBoxItem";

  export default {
    name: 'selectUser',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      //单选还是复选
      checkType: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: "批量添加人员"
      }
    },
    data() {
      return {
        showModel: false,  //model显隐
        stripe: true,  //table
        selected: [],   //右侧列表数据存储
        //选择教职工数据
        teacherFilter: {
          selectAllChecked: false,//复选框是否选中了
          selectAllTableChecked: false, //table全选
          selectData: [],//当前列表已经选中的数据
          sexList: [
            {
              value: '男',
              label: '男'
            },
            {
              value: '女',
              label: '女'
            }
          ],//性别数组
          //左侧边数据
          filterRequirement: {
            sex: '',    //性别
            name: '',   //姓名
            jzgno: ''   //教职工编号
          },
          dataList: [], //选择教职工数据
          //table标题
          columns4: [
            {
              title: ' ',
              width: 60,
              render: this.teacherRenderFun  //render 渲染
            },
            {
              title: '姓名',
              key: 'name',
              render: this.publicRenderEllipsisFun
            },
            {
              title: '工号',
              key: 'jzgno',
              render: this.publicRenderEllipsisFun
            },
            {
              title: '职务',
              key: 'zw',
              render: this.publicRenderEllipsisFun
            },
            {
              title: '职称',
              key: 'zc',
              render: this.publicRenderEllipsisFun
            },
            {
              title: '在职状态',
              key: 'zgqk',
              render: this.publicRenderEllipsisFun
            }
          ],
        },
      }
    },
    watch: {
      /**
       * 弹框显示加载数据
       * @param value {Boolean} 弹框显示状态
       * @param oldValue {Boolean}
       * @return {void} 无
       */
      value(value, oldValue) {
        this.showModel = value;
        if (value) {
          this.teacherFilter.filterRequirement = {};
        }
      },
      /**
       * 弹框显隐
       * @param value {Boolean} 弹框显示状态
       * @param oldValue {Boolean}
       * @return {void} 无
       */
      showModel(value, oldValue) {  //model显示时加载
        this.$emit("input", value);
        if (value) {
          this.handleDataClear(); //显示的时候清空数据
          this.handleClickClear();  //清空筛选
          this.handleClickClearList(); //清空列表
        }
        //model显示
        if (value) {
          this.handleClickClear();   //不保留搜索条件
          var index = -1;
          if (index < 0) index = 0;
        }
      },

    },
    methods: {
      //清空已经选择的数据
      handleDataClear() {
        this.handleClickClearList(); //清空列表
        this.selected = [];  //清空数据
      },

      //清空筛选所有条件
      handleClickClear() {
        for (var item in this.teacherFilter.filterRequirement) {
          this.teacherFilter.filterRequirement[item] = '';
        }

      },
      /**
       * 教师render函数渲染
       * @param createElement {Function} 创建节点函数
       * @param params {Object} 当前操作节点
       * @return {Object} h创建的节点
       */
      teacherRenderFun(createElement, params) {
        var element = createElement(checkedItem, {
          props: {
            checkModel: this.checkType,
            isChecked: (this.checkType && params.row.selected) || (!this.checkType && (this.selected.length && (this.selected[0].id === params.row.id)))
          },
          on: {
            selectCurrentTableItem: (event) => {
              params.row.selected = !params.row.selected;
              if (params.row.selected) {
                this.teacherFilter.selectData.push(params.row);
                this.selectUserFun(this.teacherFilter.selectData, params.row);
              } else {
                var index = this.teacherFilter.selectData.indexOf(params.row);
                if (index >= 0) {
                  this.teacherFilter.selectData.splice(index, 1);
                }
                this.cancelSelectTeacherUserFun(this.teacherFilter.selectData, params.row);
              }
            }
          }
        });
        return element;
      },

      /**
       * 实现省略号 -- 教师
       * @param createElement {Function} 创建节点函数
       * @param params {Object} 当前操作节点
       * @return {Object} h创建的节点
       */
      publicRenderEllipsisFun(createElement, params) {
        var ellipsis = '';
        if (params.column.key === 'name') {
          ellipsis = params.row.name
        } else if (params.column.key === 'jzgno') {
          ellipsis = params.row.jzgno
        }
        return this.publicEllipsisFun(createElement, params, ellipsis);
      },

      /**
       * 公用方法-实现省略号
       * @param createElement {Function} 创建节点函数
       * @param params {Object} 当前操作节点
       * @return {Object} h创建的节点
       */
      publicEllipsisFun(createElement, params, ellipsis) {
        var element = createElement('Tooltip', {
          props: {
            placement: (params.index > 15) ? "bottom-start" : "top-start",
            delay: 500
          }
        }, [
          createElement('div', {
            slot: "content",
            style: {
              whiteSpace: 'normal'
            },
            domProps: {
              innerHTML: ellipsis
            }
          }),
          createElement('div', {
            style: {
              wordBreak: 'keep-all',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            domProps: {
              innerHTML: ellipsis
            }
          })
        ])
        return element;
      },
      //清空列表--状态变为未选中的状态
      handleClickClearList() {
        var index = this.selected.length - 1;
        while (index >= 0) {
          this.handleClickDelSelList(this.selected[index], index, true);
          index = this.selected.length - 1;
        }
        this.teacherFilter.selectAllTableChecked = false;
      },
      //CheckBox选中所有
      handleCheckAll() {
        function checkItem(array, key, value) {
          var returnIndex = -1;
          array.forEach((_item, index) => {
            if (String(_item[key]) === String(value)) {
              returnIndex = index;
              return false
            }
          });
          return returnIndex;
        }
      },
      //教师选中所有查询结果  --check
      handleCheckedAllResult() {
        if (this.teacherFilter.dataList.length === 0) {
          this.$Message.warning('没有任何信息,无法选中');
        } else {
          //点击取消全选时 不进行请求数据
          if (this.teacherFilter.selectAllChecked) {
            this.handleClickClearList();
            return;
          }
          this.teacherFilter.selectAllChecked = !this.teacherFilter.selectAllChecked;  //全选状态
          this.selected = this.teacherFilter.dataList;
          this.teacherSelectAllClickFun();   //table中全选按钮
          if (!this.teacherFilter.selectAllChecked) {
            //清空列表
            this.handleClickClearList();
          }
          this.teacherFilter.dataList.forEach((item, index) => {
            var queryindex = this.checkArrayItem(this.selected, "id", item.id);
            item.selected = (queryindex >= 0);//默认不选中
          });
        }
      },

      /**
       * 组件已选择用户项 - 删除单个已选列表
       * @param item {Object} 当前删除项数据
       * @param seartchIndex {Number} 当前删除项下标
       * @param searchAll {Boolean} 当前项选中状态
       * @return {Boolean} 是否删除的状态
       */
      handleClickDelSelList(item, seartchIndex, searchAll) {
        var queryindex = -1;
        //清空列表
        this.teacherFilter.selectAllChecked = false;
        queryindex = this.checkArrayItem(this.teacherFilter.dataList, "id", item.id);
        if (queryindex >= 0) {
          queryindex = this.cancelSelectTeacherUserFun(this.teacherFilter.selectData, this.teacherFilter.dataList[queryindex]);
          return true;

        }
        this.selected.splice(seartchIndex, 1);
        return false;
      },
      /**
       * checkArrayItem函数 检测当前元素是否存在
       * @param array {Array} 数组中所有元素
       * @param key {String} 检测的字段key
       * @param value {String} 当前元素的key字段
       * @example var seartchIndex=this.checkArrayItem(this.selected,"id",row.id);
       * @return {number} 是否存在的状态
       */
      checkArrayItem(array, key, value) {
        var returnIndex = -1;
        array.forEach((_item, index) => {
          if (String(_item[key]) == String(value)) {
            returnIndex = index;
            return false
          }
        });
        return returnIndex;
      },
      /**
       * 取消已选用户--教师
       * @param selection {Array} 空
       * @param row {Object} 当前取消项
       * @param type {String} 常量
       * @return {void} 无
       */
      cancelSelectTeacherUserFun(selection, row) {
        row.selected = false;
        var seartchIndex = this.checkArrayItem(this.selected, "id", row.id);
        if (seartchIndex >= 0) {
          this.selected.splice(seartchIndex, 1);
        }
        seartchIndex = this.checkArrayItem(selection, "id", row.id);
        if (seartchIndex >= 0) {
          selection[seartchIndex].selected = false;
        }
        this.teacherFilter.selectAllChecked = false;
        this.teacherFilter.selectAllTableChecked = false;
      },

      /**
       * render选中状态--教师
       * @param selection {Array} 空
       * @param row {Object} 当前取消项
       * @param type {String} 常量
       * @return {void} 无
       */
      selectUserFun(selection, row) {
        row.selected = true;
        if (!this.checkType) {
          this.handleClickClearList();
          var item = JSON.parse(JSON.stringify(row));
          this.selected.unshift(item);
          return;
        }
        var item = JSON.parse(JSON.stringify(row));
        var seartchIndex = this.checkArrayItem(this.selected, "id", row.id);

        if (seartchIndex < 0) {
          this.selected.push(item);
        }
        var selectAll = this.selected.length != 0;
        this.teacherFilter.dataList.forEach((item, index) => {
          var seartchIndex = this.checkArrayItem(this.selected, "id", item.id);
          if (seartchIndex < 0) {
            selectAll = false;
            return false;
          }
        });
        this.teacherFilter.selectAllTableChecked = selectAll;
      },

      /**
       * table教师选中当前页所有数据
       * @param event {Object} window对象
       * @return {void} 无
       */
      teacherSelectAllClickFun(event) {
        var select = this.selectAllTeacherFun(event);
        if (select) {
          this.teacherFilter.selectData = this.teacherFilter.dataList;
        } else {
          this.teacherFilter.selectData = [];
        }
        this.teacherFilter.dataList.forEach((item, index) => {
          if (select) {
            this.selectUserFun(this.teacherFilter.selectData, item);
          } else {
            this.cancelSelectTeacherUserFun(this.teacherFilter.selectData, item);
          }
        });
      },

      /**
       * table 选中所有标识--教师
       * @param event {Object} window对象
       * @return {boolean} 选中所有状态
       */
      selectAllTeacherFun(event) {
        this.teacherFilter.selectAllTableChecked = !this.teacherFilter.selectAllTableChecked;
        return this.teacherFilter.selectAllTableChecked;  //选中所有标识
      },

      //确定回调事件
      ok() {
        var handler = {
          close: true,//是否允许关闭
          filterTeacherData: JSON.parse(JSON.stringify(this.teacherFilter.filterRequirement)),
        };
        //选择全部
        this.$emit("ok", JSON.parse(JSON.stringify(this.selected)), handler);

        if (handler.close) {
          this.$emit("input", false);
        }
      },
      //取消回调事件
      cancel() {
        this.handleClickClear();
        this.$emit("cancel");
        this.showModel = false;
      },

      /**
       * 循环子节点设置执行callback设置setAttribute
       * @param child {Object} 当前节点信息this
       * @param callback {Function} 子元素循环执行
       * @return {Void} 无
       */
      forEachChild(child, callback) {
        if (!(child.$children instanceof Array) || !child.$children.length) return;
        child.$children.forEach((item) => {
          callback(item);
          this.forEachChild(item, callback);
        })
      }
    },
    //获取当前节点的 data-v ，改变默认的scoped
    updated() {
      if (!this.$parent) return;
      var scoped = [];
      for (var name in this.$parent.$el.attributes) {
        var scopedText = this.$parent.$el.attributes[name].name;
        if (typeof scopedText === "string" && scopedText.substring(0, 6) === "data-v") {
          scoped.push(scopedText);
        }
      }
      scoped.push("data-v-0c1cc1e3");
      if (!scoped.length) return;
      //callback
      this.forEachChild(this, (item) => {
        scoped.forEach((scopedName) => {
          item.$el.setAttribute(scopedName, "");
        })
      })
    },
    created(){
      this.$get(this.ME.teacherList, {}, (data) => {
        this.teacherFilter.dataList=data.data.datalist;
      });
    }
  }
</script>

<style scoped lang="less">
  @white: #fff;
  @baseThemeColor: #007bd9;
  /*选中背景样式设置*/
  .checkOkImg() {
    background-position: center;
    background-repeat: no-repeat;
    background-size: 10px 10px;
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTEyODg5MjYwNjEzIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwNTMgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE4NjkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIuOTA2MjUiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTI4Ni4zMzcwNDkgNDU5LjEyNzQ1NCA0MjUuMTczOTE1IDcyNy42OTY2NzVDNDI1LjE3MzkxNSA3MjcuNjk2Njc1IDY1MC43OTQxOTkgMTgxLjkyNDE2OSAxMDA2LjU2MTkzNyAwIDk5Ny44NzI1MjYgMTI5Ljk1Mzc0MSA5NjMuMTcwMjI4IDI0Mi41NTYzMzQgMTAyMy45MTMwODYgMzgxLjE3MTgxMyA4NjcuNzI1MDcyIDQxNS44MTg3NjUgNTQ2LjY1OTYzMSA4MDUuNjUyMzE2IDQ0Mi41NTI3MzcgOTk2LjIzODIyMiAyOTUuMDI2NDYgODE0LjMxNDA1NCAxMjEuNDg3Mjk3IDY3NS42OTg1NzQgMC4wMDE1OCA2MzIuMzg5ODg1TDI4Ni4zMzcwNDkgNDU5LjEyNzQ1NFoiIHAtaWQ9IjE4NzAiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L3N2Zz4=");
  }

  /*table中选中一条样式*/
  .ivu-table-cell {
    .tableCheckBox {
      width: 14px;
      height: 14px;
      margin: 0 auto;
      &.tableSingleCheckedBgFalse {
        border-radius: 3px;
        border: 1px solid #aaa;
        background-color: #fff;
      }
      &.tableSingleCheckedBgTrue {
        background-color: @baseThemeColor;
        border: none;
        .checkOkImg();
        border-radius: 3px;
      }
      &.tableSingleAudioBgFalse {
        border-radius: 8px;
        background-color: #fff;
        border: 1px solid #aaa;
      }
      &.tableSingleAudioBgTrue {
        border: none;
        border-radius: 8px;
        background-color: @baseThemeColor;
        .checkOkImg();
        background-size: 8px 8px;;
      }
    }
  }

  /*table 中选中当前页按钮样式*/
  .tableSelectAllData {
    position: absolute;
    left: 23px;
    top: 12px;
    z-index: 1;
    width: 14px;
    height: 14px;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkNBNzM3NjA5NDMyMTFFN0ExODJBOUQ0MkExQkI1NjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkNBNzM3NjE5NDMyMTFFN0ExODJBOUQ0MkExQkI1NjMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyQ0E3Mzc1RTk0MzIxMUU3QTE4MkE5RDQyQTFCQjU2MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyQ0E3Mzc1Rjk0MzIxMUU3QTE4MkE5RDQyQTFCQjU2MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnP4QvQAAAAYUExURf///6qqqs/Pz7CwsPn5+f39/dHR0dLS0orV80AAAAA1SURBVHjaYmBlYmaEAmYmVgYmJhYGKGBhYmdghvOAfGYGRgYkwEg/LpozUBzJxoDqBYAAAwA6vwCOfHCmEAAAAABJRU5ErkJggg==");
    &.tableSelectAllTrue {
      background-color: @baseThemeColor;
      border: none;
      .checkOkImg();
      border-radius: 3px;
    }
  }

  .filterRequirementContent {
    .ivu-select-dropdown {
      position: relative !important;
      top: 0px !important;
    }
    .ivu-input-group {
      width: 177px !important;
      background: #fff;
    }
    .ivu-select-selection {
      margin-right: 12px;
    }
    .ivu-input-group-prepend {
      background: #fff;
    }
    .ivu-input-wrapper {
      width: 168px !important;
      left: 8px !important;
    }
    .ivu-icon-close-circled {
      color: @baseThemeColor;
      font-size: 18px;
      position: absolute;
      left: 154px;
      top: 29px;
      cursor: pointer;
    }
  }

  .selectUserFrame {
    .ivu-modal {
      top: 20px !important;
    }
    .ivu-select-single,
    .ivu-select-visible {
      position: relative;
    }
    .ivu-table-tip table {
      height: 434px;
    }
    .ivu-table {
      height: 436px;
    }
    .ivu-table-wrapper {
      overflow: hidden;
      height: 388px !important;
    }
  }

  .tableFrameBorderRight,
  .tableFrameBorderLeft {
    width: 100%;
    height: 437px;
    background-repeat: repeat-y;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkNCN0E5N0I5NzU4MTFFNzlCQkI4NkI1OEU5QUFCRDEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkNCN0E5N0M5NzU4MTFFNzlCQkI4NkI1OEU5QUFCRDEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGQ0I3QTk3OTk3NTgxMUU3OUJCQjg2QjU4RTlBQUJEMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGQ0I3QTk3QTk3NTgxMUU3OUJCQjg2QjU4RTlBQUJEMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt13LPMAAAAGUExUReDh4gAAANrhxZEAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=");

  }

  .tableFrameBorderRight {
    background-position: right;
  }

  .vertical-center-modal {
    width: 900px;
    /*display: flex;
    align-items: center;
    justify-content: center;*/
    .ivu-modal {
      top: 80px !important;
    }
    .ivu-table-cell {
      text-overflow: ellipsis;
      word-break: break-all;
      overflow: hidden;
      box-sizing: border-box;
      white-space: nowrap !important;
    }
  }

  .content {
    min-height: 463px;
    background: #f4f4f4;
    margin: -16px;
    overflow: hidden;
  }

  .tabContent {
    min-height: 444px;
    background: #f4f4f4;
    margin: 10px;
    overflow: hidden;
    .tabListContent {
      width: 770px;
      height: auto;
      background: #f4f4f4;
      margin-top: 8px;
      .filterRequirementContent {
        float: left;
        border: 1px solid #e0e1e2;
        background: @white;
        width: 200px;
        .filterRequirement {
          width: 198px;
          height: 423px;
          padding-bottom: 10px;
          overflow-y: auto;
          overflow-x: hidden;
          .filterOrganization {
            position: relative;
            .enterprise-css {
              margin-left: 5px;
              width: 174px;
            }
            .publicTitle {
              font-size: 12px;
              margin: 4px 0 4px 10px;
            }
            .organizationButton {
              width: 166px;
              font-size: 12px;
              font-weight: bold;
              text-align: center;
              margin-left: 9px;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .cssPublicSelect {
              width: 178px;
              color: #444444;
              font-size: 12px;
              font-weight: bold;
              line-height: 26px;
              margin-left: 9px;
            }
            .css_select_mock {
              cursor: pointer;
              appearance: none;
              -moz-appearance: none;
              -webkit-appearance: none;
              width: 166px;
              height: 30px;
              line-height: 30px;
              border: 1px solid #e0e1e2;
              border-radius: 5px;
              margin-left: 9px;
              padding-left: 8px;
              font-weight: bold;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              .css_select_mock_data {
                width: 140px;
                height: 30px;
                line-height: 30px;
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .css_select_item_style {
              width: 178px;
              height: 200px;
              overflow-y: scroll;
              border: 1px solid #e0e1e2;
              border-radius: 5px;
              margin: -1px 0 0 4px;
              padding-top: 3px;
              box-shadow: 1px 1px 1px 1px #eaeaea;
              .css_select_item {
                width: 166px;
                height: 30px;
                line-height: 30px;
                cursor: pointer;
                overflow: hidden;
                font-weight: bold;
                margin-left: 0px;
                padding-left: 10px;
              }
              /*.css_select_item:hover{*/
              /*z-index:1;*/
              /*background-color: #f3f3f3;*/
              /*}*/
              .choiceClassActive {
                z-index: 2;
                background-color: @baseThemeColor;
              }
            }
            .hideAnimation {
              transition: all .1s;
              opacity: 1;
            }
            .showAnimation {
              transition: all .1s;
              opacity: 0;
            }
            .cssSelectArror {
              position: absolute;
              z-index: 10;
              top: 30px;
              right: 22px;
              font-size: 14px;
              color: #80848f;
              transition: all 0.2s ease-in-out;
            }
          }
        }
      }
      .selectionMchanism {
        width: 178px;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        margin: 9px 9px;
        background: @baseThemeColor;
        color: #fff;
      }
      .showTable {
        width: 559px;
        min-height: 392px;
        background: #f4f4f4;
        float: left;
        margin: 0 0 0 10px;
        .tableCheckboxData {
          width: 145px;
          height: 28px;
          border-radius: 5px;
          border: 1px solid #e0e1e2;
          background: @white;
          margin-bottom: 10px;
          cursor: pointer;
          line-height: 26px;
          font-size: 12px;
          overflow: hidden;
          padding-left: 35px;
          background-repeat: no-repeat;
          background-position: 10px center;
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkNBNzM3NjA5NDMyMTFFN0ExODJBOUQ0MkExQkI1NjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkNBNzM3NjE5NDMyMTFFN0ExODJBOUQ0MkExQkI1NjMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyQ0E3Mzc1RTk0MzIxMUU3QTE4MkE5RDQyQTFCQjU2MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyQ0E3Mzc1Rjk0MzIxMUU3QTE4MkE5RDQyQTFCQjU2MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnP4QvQAAAAYUExURf///6qqqs/Pz7CwsPn5+f39/dHR0dLS0orV80AAAAA1SURBVHjaYmBlYmaEAmYmVgYmJhYGKGBhYmdghvOAfGYGRgYkwEg/LpozUBzJxoDqBYAAAwA6vwCOfHCmEAAAAABJRU5ErkJggg==");
          &.select {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTUzMDY2MDcwNDlFMTFFODhGQ0JFQ0I0RjM5NDVCRkEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTUzMDY2MDgwNDlFMTFFODhGQ0JFQ0I0RjM5NDVCRkEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NTMwNjYwNTA0OUUxMUU4OEZDQkVDQjRGMzk0NUJGQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NTMwNjYwNjA0OUUxMUU4OEZDQkVDQjRGMzk0NUJGQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhmlsEAAAADeUExURRaa/wCG/wCK/wCE/269/ROW/zSl/wCN/xOU/7zj/4LJ/w2W/xic/waQ/waT/43M/0Gs/3TE/yyj/+Pz/yee/zOm/yuj/4TH/zOj/6fZ/3HA/xWX/wB8/+/4/wiS/26+/QCB/wCM/w+W/7bg/73i/wSS/77i/wCF/+Dy/63c/y+l/7Ld/3bB/97w/w2T/zan/1C0/9Hr/+r2/xOP/xOQ/xqb//D5/wCH/xOV/1y2/xOZ/7fg//b7/wCI/wCJ/xia/2q8/fD1+g+V/wCP/wCR/xOY/wCO/w+X/////wCQ/5898ooAAAChSURBVHjaNI/lDsNADINTHjMzMzOV77L0/V9ot3bzD0ufIsU2uI7tvUN5tuOCavlBJCZLXYA/oKIXbqD90JAaz/MJeEQorWgYxEJEZKZ+ocPiCJyh2UnJzT29Eklx9ce5eLWVJ9pd8QHcqhRpVJ7RfYoBB46Z7bK9pqzZDwRqDHvpOU02pviphTWUUr2mfOMgKunLBhNuqRBOGHi/CR8BBgDbZSgTEgVLqwAAAABJRU5ErkJggg==");
          }
        }
      }
      .tableListContent {
        width: 559px;
        min-height: 358px;
        border-bottom: 1px solid #e0e1e2;
        position: relative;
        text-align: center;
        .pageChange {
          position: absolute;
          bottom: 0;
          margin: 10px 0;
          width: 100%
        }
      }
    }
    .rightChecked {
      float: left;
      top: 68px;
      z-index: 10;
      width: 198px;
      height: 474px;
      background: @white;
      margin-left: 10px;
      border: 1px solid #e0e1e2;
      .selectionMechanismList {
        width: 198px;
        height: 30px;
        border-bottom: 1px solid #e0e1e2;
        padding: 0 9px;
        font-size: 12px;
        font-weight: bold;
        line-height: 30px;
        .selectionNumber {
          float: left;
        }
        .clearList {
          float: right;
          cursor: pointer;
        }
      }
      .rightCheckedUserList {
        overflow-y: auto;
        overflow-x: hidden;
        height: 443px;
      }
      .selectUserData {
        width: 198px;
        height: 30px;
        border-bottom: 1px solid #e0e1e2;
        line-height: 30px;
        padding: 0 10px;
      }
      #selectedListData > li {
        width: 198px;
        height: 30px;
        border-bottom: 1px solid #e0e1e2;
        line-height: 30px;
        padding: 0 10px;
      }
      .selectedList {
        width: 198px;
        height: 30px;
        border-bottom: 1px solid #e0e1e2;
        line-height: 30px;
        padding: 0 10px;
        .selectedListP {
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 144px;
          float: left;
        }
        .listDel {
          display: none;
          width: 14px;
          height: 14px;
          background: @baseThemeColor;
          border-radius: 50px;
          line-height: 14px;
          text-align: center;
          color: @white;
          font-weight: bolder;
          margin-top: 7px;
          cursor: pointer;
          float: right;
          margin-right: 8px;
        }
        &:hover {
          .listDel {
            display: block;
          }
        }
      }
    }
  }

  .radioModel {
    .filterRequirement {
      height: 385px;
    }
  }

  .tableInfoBoxSet .ivu-table-tip table td span {
    background-size: contain;
  }
</style>