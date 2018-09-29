<template>
  <div class="myRange-container">
    <div class="base_range_div"></div>
    <div class="now_range_div" id="nowRange"></div>
    <div class="base_text_div left_text_div "
         :class="{check_text_div:leftClick}"
         id="leftText"
         @touchstart.stop.prevent="leftTextTouchStart"
         @touchmove.stop.prevent="leftTextTouchMove"
         @touchend.stop.prevent="leftTextTouchEnd"
    >
      {{leftText}}
    </div>
    <div class="base_text_div right_text_div"
         :class="{check_text_div:rightClick}"
         id="rightText"
         @touchstart.stop.prevent="rightTextTouchStart"
         @touchmove.stop.prevent="rightTextTouchMove"
         @touchend.stop.prevent="rightTextTouchEnd"
    >
      {{rightText}}
    </div>
    <div class="base_text_div left_bottom_div" id="leftImg">
      <img src="./img/range.png"
           @touchstart.stop.prevent="leftTextTouchStart"
           @touchmove.stop.prevent="leftTextTouchMove"
           @touchend.stop.prevent="leftTextTouchEnd"
      >
    </div>
    <div class="base_text_div right_bottom_div" id="rightImg">
      <img src="./img/range.png"
           @touchstart.stop.prevent="rightTextTouchStart"
           @touchmove.stop.prevent="rightTextTouchMove"
           @touchend.stop.prevent="rightTextTouchEnd"
      >
    </div>
  </div>
</template>

<script>
  export default {
    name: 'range',
    props: {
      max: {
        type: String
      },
      min: {
        type: String
      }
    },
    data() {
      return {
        leftClick: false,
        rightClick: false,
        rangeWidth: '',
        leftWidth: 0,
        rightWidth: 0,
        leftText: '',
        rightText: '',
      }
    },
    mounted() {
      this.rangeWidth = document.body.clientWidth * 0.9;  //总宽度
      this.leftText = this.min;
      this.rightText = this.max;
    },
    methods: {
      leftTextTouchStart() {
        this.leftClick = true;
      },
      leftTextTouchMove(e) {
        let touch = e.changedTouches[0];  // 取触摸点Touch对象
        let clientX = touch.clientX;  // 取触点相对于屏幕左边沿的的X坐标
        if (clientX >= 0) {
          if (this.left + this.right <= this.rangeWidth) {
            //若左右两浮标没重叠
            this.leftWidth = clientX; // 左边长度
            $('#nowRange').css({'left': this.left, 'width': this.width}); //设置绿条位置和宽度
            $('#leftText').css({'left': this.left});  //设置左文字和左浮标位置
            $('#leftImg').css({'left': this.left});
          }
        }
      },
      leftTextTouchEnd() {
        this.leftClick = false;
      },
      rightTextTouchStart() {
        this.rightClick = true;
      },
      rightTextTouchMove(e) {
        let touch = e.changedTouches[0];
        let clientX = touch.clientX;
        if (clientX <= this.rangeWidth) {
          this.rightWidth = this.rangeWidth - clientX;
          if (this.left + this.right <= this.rangeWidth) {
            $('#nowRange').css({'width': this.width});
            $('#rightText').css({'right': this.right});
            $('#rightImg').css({'right': this.right});
          }
        }
      },
      rightTextTouchEnd() {
        this.rightClick = false;
      },
    },
    watch: {
      left(val) {
        let num = parseInt(val / this.rangeWidth * 100);
        if (!isNaN(num)) {
          this.leftText = num;
        }
      },
      right(val) {
        let num = parseInt((this.rangeWidth - val) / this.rangeWidth * 100);
        if (!isNaN(num)) {
          this.rightText = num;
        }
      }
    },
    computed: {
      width() {
        //中间绿色长度
        return Math.min(Math.max(0, this.rangeWidth - this.leftWidth - this.rightWidth), this.rangeWidth)
      },
      left() {
        //左边浮标至左顶点距离
        return Math.max(this.leftWidth, 0)
      },
      right() {
        //右边浮标至右顶点距离
        if (this.left + this.rightWidth <= this.rangeWidth) {
          return Math.max(this.rightWidth - 0.5, 0)
        }
      },
      // leftText() {
      //   let num = parseInt(this.left / this.rangeWidth * 100);
      //   return num;
      // },
      // rightText() {
      //   let num = parseInt((this.rangeWidth - this.right) / this.rangeWidth * 100);
      //   if (num >= 0) {
      //     return num;
      //   }
      // }
    }
  }
</script>
<style scoped lang="scss">
  $themeColor: #11A983;
  .myRange-container {
    width: 90%;
    margin: 1rem auto;
    position: relative;
    .base_range_div {
      width: 100%;
      height: 0.15rem;
      background: #dedede;
    }
    .now_range_div {
      position: absolute;
      height: 0.15rem;
      background: $themeColor;
      width: 100%;
      left: 0;
      top: 0;
    }
    .base_text_div {
      position: absolute;
      color: white;
      padding: 0.05rem 0.1rem;
      font-size: 0.3rem;
      img {
        width: 0.5rem;
      }
    }

    .left_text_div {
      left: 0;
      top: -0.8rem;
      transform: translateX(-50%);
      background: $themeColor;
    }
    .check_text_div {
      background: #e0620d !important;
      padding: 0.08rem 0.2rem;
    }
    .right_text_div {
      right: 0;
      top: -0.8rem;
      transform: translateX(50%);
      background: $themeColor;
    }
    .left_bottom_div {
      top: 0.2rem;
      left: 0;
      transform: translateX(-50%);
    }
    .right_bottom_div {
      top: 0.2rem;
      transform: translateX(50%);
      right: 0;
    }
  }
</style>
