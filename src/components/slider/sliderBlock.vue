<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="timeStrategyArea clearfix">
    <div class="setChooseArea">
      <el-radio :disabled='!setChecked' class="radioBtn greenBlock" v-model="radio" label="1">选中</el-radio>
      <el-radio :disabled='!setChecked' class="radioBtn" v-model="radio" label="2">清除选中</el-radio>
      <div class="radioArea" v-if="!setChecked"></div>
    </div>
    <div class="sliderTimeArea clearfix">
      <ul class="weekDay">
        <li>时间段</li>
        <li>周一</li>
        <li>周二</li>
        <li>周三</li>
        <li>周四</li>
        <li>周五</li>
        <li>周六</li>
        <li>周日</li>
      </ul>
      <ul class="dayTime">
        <li v-for="(dayTime,index) in dataObj.dayTimeCount" :key=index>
          {{dayTime - 1}}
        </li>
      </ul>
      <ul class="chooseTimeArea">
        <li v-for="(chooseBlock,index) in dataObj.chooseCount" :key="index" :class="{ green: chooseBlock.isGreenClass }"
          :id="chooseBlock.id" @mousedown="clickBlock(chooseBlock.id)" @mouseup="clickUpBlock(chooseBlock.id)"
          ondragstart="return false">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  const dataObj = {};
  const chooseArr = [];
  const numChooseObj = {};
  const weeklyName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let currentLiId = '';
  let index = 0;
  let clickInitId = '';
  for (let i = 1; i < 8; i++) {
    for (let j = 1; j < 25; j++) {
      let objStr = '' + i + j;
      let chooseObj = {};
      chooseObj.id = 'chooseBlockId' + i + j;
      chooseObj.isGreenClass = false;
      chooseArr.push(chooseObj);
      numChooseObj[objStr] = index;
      index++;
    }
  }
  export default {
    name: 'sliderTime',
    data() {
      return {
        dataObj,
        setChecked: true,
        radio: '1',
        ischecked: true
      }
    },
    created: function () {
      Vue.set(this.dataObj, 'dayTimeCount', 24)
      Vue.set(this.dataObj, 'chooseCount', chooseArr)
      Vue.set(this.dataObj, 'isChooseData', chooseArr)
    },
    watch: {
      setChecked(curVal, oldVal) {
        this.ischecked = curVal;
        if (curVal) {
          this.radio = '1';
        }
        this.ischecked = true;
      }
    },
    methods: {
      clickBlock: function (data) {
        let drawFalg = '';
        if (this.radio == 1) {
          drawFalg = true;
        } else if (this.radio == 2) {
          drawFalg = false;
        }
        let currentIndex = numChooseObj[data.slice(13)];
        let _this = this;
        currentLiId = data;
        clickInitId = data.slice(13);
        chooseArr[currentIndex].isGreenClass = drawFalg;
        let targetClassDom = document.getElementsByClassName('chooseTimeArea')[0];
        targetClassDom.onmousemove = function (e) {
          if (e.which == 1) {
            if (currentLiId != (e.target).getAttribute("id")) {
              _this.drawBlocks(clickInitId, (e.target).getAttribute("id").slice(13))
              currentLiId = (e.target).getAttribute("id")
            }
          }
        }
        targetClassDom.onmouseleave = function (e) {
          targetClassDom.removeEventListener("mousemove", null, false);
        }

      },
      clickUpBlock: function (data) {
        let targetClassDom = document.getElementsByClassName('chooseTimeArea')[0];
        targetClassDom.removeEventListener("mousemove", null, false);
      },
      /**
       * 绘制蓝色区域
       * @param start 鼠标按下的开始地方
       * @param end 滑动时鼠标所在区域
       */
      drawBlocks: function (start, end) {
        if (!this.ischecked) {
          return
        }
        let drawFalg = '';
        if (this.radio == 1) {
          drawFalg = true;
        } else if (this.radio == 1) {
          drawFalg = false;
        }
        let startX = '',
          startY = '',
          endX = '',
          endY = '';
        let smallX = '',
          smallY = '',
          bigX = '',
          bigY = '';

        startX = start.slice(0, 1) - 0;
        startY = start.slice(1) - 0;
        endX = end.slice(0, 1) - 0;
        endY = end.slice(1) - 0;
        if (startX < endX) {
          smallX = startX;
          bigX = endX;
        } else {
          smallX = endX;
          bigX = startX;
        }
        if (startY < endY) {
          smallY = startY;
          bigY = endY;
        } else {
          smallY = endY;
          bigY = startY;
        }
        for (let i = smallX; i <= bigX; i++) {
          for (let j = smallY; j <= bigY; j++) {
            let drawIndex = numChooseObj['' + i + j];
            chooseArr[drawIndex].isGreenClass = drawFalg;
          }
        }
      },
      drawDataBlock(data) {
        console.log(data)
        $.each(data, function (i, v) {
          let rowIndex = weeklyName.indexOf(i) + 1;
          $.each(v, function (i, v) {
            let start = v.slice(0, 2) - 0;
            let end = v.slice(6, 8) - 0;
            for (let i = (start + 1); i <= end; i++) {
              let drawIndex = numChooseObj[rowIndex + '' + i]
              chooseArr[drawIndex].isGreenClass = true;
            }
          })
        });
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .timeStrategyArea {
    background-color: #F9FBFF;
    margin-top: .2rem;
    height: 500px;
    width: 100%;
    position: relative;
    padding-left: 1.5rem;
    padding-top: .44rem;
    box-sizing: border-box;
    border: 0.01rem solid #DCE5F1;
  }

  .sliderTimeArea {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .title {
    position: absolute;
    top: 1.4rem;
    left: 0.54rem;
    height: 0.96rem;
    width: 0.31rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0.05rem;
    background-color: #1FBF85;
    color: #ffffff;
    font-size: 0.14rem;
    z-index: 99;
  }

  .title:after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    left: 0.27rem;
    top: 0.39rem;
    border-top: solid 0.1rem transparent;
    border-left: solid 0.1rem #1FBF85;
    border-bottom: solid 0.1rem transparent;
  }

  .timeStrategyTitle:before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0rem;
    left: .7rem;
    height: 100%;
    width: 1px;
    background-color: #DCE5F1;
    z-index: 50;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .weekDay {
    position: absolute;
    text-align: center;
  }

  .weekDay li {
    height: .3rem;
    width: .6rem;
    line-height: .3rem;
    border: 0.01rem solid #DBDBDB;
    border-top: none;
    color: #333333;
    box-sizing: border-box;
  }

  .weekDay li:first-of-type {
    border-top: 1px solid #DBDBDB;
    background: #F5F5F5;
  }

  .dayTime {
    position: absolute;
    left: .6rem;
  }

  .dayTime li {
    float: left;
    width: .3rem;
    height: .3rem;
    line-height: .3rem;
    border: 1px solid #DBDBDB;
    background-color: #F5F5F5;
    border-left: none;
    color: #666666;
    box-sizing: border-box;
    text-align: center;
  }

  .chooseTimeArea {
    position: absolute;
    width: 7.2rem;
    height: 2.1rem;
    left: .6rem;
    top: .3rem;
  }

  .chooseTimeArea li {
    width: .3rem;
    height: .3rem;
    box-sizing: border-box;
    border: 1px solid #DBDBDB;
    float: left;
    border-left: none;
    border-top: none;
  }

  .chooseTimeArea li.green {
    background-color: #41b883;
  }

  button {
    position: absolute;
    bottom: -.2rem;
  }

  .setChooseArea {
    position: absolute;
    top: .2rem;
  }

  .radioBtn {
    margin-left: .2rem;
    position: relative;
  }

  .radioBtn:after {
    content: '';
    width: .12rem;
    height: .05rem;
    position: absolute;
    top: 0.02rem;
    right: -.15rem;
    border: 0.01rem solid #DCE5F1;
    background-color: #fff;
  }

  .greenBlock:after {
    background-color: #41b883;
  }

  .setChooseArea span {
    display: inline-block;
    position: relative;
    color: #fff;
    width: .44rem;
    height: .18rem;
    line-height: .18rem;
    border-radius: 0.09rem;
    text-align: center;
  }

  .starChoose {
    color: #ff9933;
    font-size: 0.14rem;
  }

  .mess {
    color: #9f9fa0;
    margin: .2rem 0;
    margin-right: .2rem;
  }

  .radioArea {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0.55rem;
    z-index: 400;
  }
</style>