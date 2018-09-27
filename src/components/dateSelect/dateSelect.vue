<!--
@author:yanxu6
@note:去除节假日，按降序排列日期
-->
<template>
  <Modal
    width=700
    v-model="showFlag"
    title="去除节假日"
    :mask-closable="false"
    @on-cancel="cancelHandler"
  >
    <div class="date-container">
      <Row :gutter="16">
        <Col span="12">
          <DatePicker
            :open="true"
            size="large"
            type="date"
            @on-change="dateChangeHandler">
            <a href="javascript:void(0)">
              <!--去掉DataPicker选择器的默认输入框-->
            </a>
          </DatePicker>
        </Col>
        <Col span="12">
          <Table
            height="400"
            border
            :columns="columnsData"
            :data="tableData">
          </Table>
        </Col>
      </Row>
    </div>
    <div slot="footer">
      <Button type="primary" @click="newList">确定</Button>
    </div>
  </Modal>

</template>

<script>

  export default {
    name: "dateSelect",
    props: {
      showFlag: {
        required: true,
        type: Boolean
      },
      tableData: {
        type: Array
      }
    },
    data() {
      return {
        columnsData: [
          {
            type: 'index',
            width: 60,
            align: "center",
            title: "序号"
          },
          {
            key: "date",
            width: 160,
            align: "center",
            title: "日期"
          },
          {
            align: "center",
            title: "操作",
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.tableData.splice(params.index, 1)
                  }
                }
              }, '删除')
            }
          }],
        // tableData:[]
      }
    },
    methods: {
      updateVisible(flag) {
        this.showFlag = flag;
        this.$emit('update:showFlag', this.showFlag);
      },
      dateChangeHandler(date) {
        if (!this.hasDate(date)) {
          this.tableData.push({
            date: date
          });
        } else {
          this.$Message.error('该日期已存在');
        }
      },
      hasDate(date) {
        //判断数组对象中是否有某个值
        let index = this.tableData.findIndex((item) => {
          return item.date === date;
        });
        return index !== -1;
      },
      changeVisible() {
        if (this.showFlag) {

        } else {

        }
      },
      newList() {
        this.$emit('newList', this.tableData);
        this.updateVisible(false);
      },
      cancelHandler() {
        this.updateVisible(false);
        this.$emit('clearList');
      }
    }
  }
</script>

<style scoped lang="less">
  .date-container {
    min-height: 350px;
  }
</style>