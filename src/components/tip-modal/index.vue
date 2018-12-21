<!-- @format -->

<template>
    <Modal
            v-scoped
            :width="width"
            v-model="showModal"
            :title="title"
            :mask-closable="false"
            @on-cancel="cancel"
            class-name="vertical-center-modal">
        <div class="cnt">
            <slot name="main-content"></slot>
            <slot></slot>
        </div>

        <div v-if="showFooter" slot="footer">
            <Button type="primary" @click.native="ok">确定</Button>
            <Button @click.native="cancel">取消</Button>
        </div>
        <div v-else slot="footer"></div>
    </Modal>
</template>

<script>
export default {
  name: 'TipModal',
  data() {
    return {
      showModal: false
    };
  },
  props: {
    title: {
      type: String,
      default: '提示信息'
    },
    width: {
      type: Number,
      default: 535
    },
    showTipFlag: {
      required: true,
      type: Boolean
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    _updateVisible(flag) {
      this.showModal = flag;
      this.$emit('update:showTipFlag', this.showModal); //更新对话框的显示状态
    },
    ok() {
      this.$emit('click-ok');
      this._updateVisible(false);
    },
    cancel() {
      this.$emit('click-cancel');
      this._updateVisible(false);
    }
  },
  watch: {
    showTipFlag: {
      handler: function(val) {
        this.showModal = val;
      },
      immediate: true
    }
  }
};
</script>

<style scoped lang="less">
.cnt {
  max-height: 500px;
  overflow: auto;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
  }
}

.ivu-modal-header-inner {
  font-size: 20px;
  font-weight: normal;
}

.tip-text {
  font-weight: bolder;
  color: #2d8cf0;
  font-size: 18px;
  line-height: 1.5;
}

.tip-text-assist {
  color: #a6a4a6;
  font-size: 15px;
}
</style>
