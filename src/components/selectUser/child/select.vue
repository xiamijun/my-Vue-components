<!--
    by: xldai  2018/1/2  wlwang 2018/1/26
    name: 下拉框组件
    notes:
-->
<template>
    <div class="selectBox" :id="selectBoxId">
        <div class="selectChoice" @click="selectOperationFun" :class="isHide?'':'hover'">
            <!--支持搜索-->
            <input v-if="supportSearch" type="text" v-model="selectInputVal" :class="['selectInput',{choiceTextCss:(choiceText=='请选择') || (choiceText=='全部')}]" @focus="selectInputValFocus" :placeholder="placeholderText"/>
            <!--不支持搜索-->
            <p v-if="!supportSearch" :class="['selectText',{choiceTextCss:(choiceText=='请选择') || (choiceText=='全部')}]" >{{choiceText}}</p>
            <Icon type="arrow-up-b" class="iconStyle" :class="isHide?'selected':''"></Icon>
        </div>
        <!--支持搜索时下拉数据 infoList -->
        <div v-if="supportSearch" ref="selectList" class="selectList" :class="isFirst?'':(isHide?'heightZero':'heightOrigin')">
            <div
                v-show="infoList.length>0"
                v-for="option in infoList"
                class="selectOption"
                :class="option.isChoice?'selected':''"
                :key="option.id"
                :value="option.id"
                :title="option.name"
                @click="selectdItemEvent(option.id,option.name)"
            >{{option.name}}</div>
            <div class="selectOption" v-show="infoList.length==0" @click="isHide=true" v-text="this.noOptionData"></div>
        </div>
        <!--不支持搜索下拉数据 optionAllData -->
        <div  v-if="!supportSearch" ref="selectList" class="selectList" :class="isFirst?'':(isHide?'heightZero':'heightOrigin')">
            <div
                v-show="optionAllData.length>0"
                v-for="option in optionAllData"
                class="selectOption"
                :class="option.isChoice?'selected':''"
                :key="option.id"
                :value="option.id"
                :title="option.name"
                @click="selectdItemEvent(option.id,option.name)"
            >{{option.name}}</div>
            <div class="selectOption" v-show="optionAllData.length==0" @click="isHide=true" v-text="this.noOptionData"></div>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            id:{  //回显id
                type:String,
                default:''
            },
            options:{  //所有数据
                type:Array,
                default:()=>{
                    return [];
                }
            },
            supportSearch:{  //是否支持搜索
                type: Boolean,
                default: false
            },
            emptyData:{
                type: Boolean,
                default: false
            },
            noOptionData:{
                type:String,
                default:'暂无数据',
            },
            placeholderText:{
                type:String,
                default:'请选择'
            }

        },
        data() {
            return {
                selectBoxId:'',  //判断是否点击多个下拉框
                selectInputVal:'',  //选中元素
                selectedObj:{},  //选中下拉框中的id和name
                infoList:[],  //支持搜索时所有数据
                isFirst:true,  //下拉框点击事件
                isHide:true,  //下拉框元素选中
                isHover:false,
                choiceText:'请选择',  //选中元素的value
                optionAllData:[],  //不支持搜索时暂存的所有数据
            };
        },
        mounted() {
            this.handleArrFun(this.id);  //回显
            document.addEventListener('click',this.listenHideFun , false); //监听多下拉框点击
            this.$refs.selectList.addEventListener("mousewheel", this.stopScroll);
            this.$refs.selectList.addEventListener("DOMMouseScroll", this.stopScroll);
        },
        watch: {
            selectInputVal: {  //监听输入框中的值
                handler(curVal, oldVal) {
                    if(this.supportSearch){
                        this.infoList = this.options.filter((val) => val.name.includes(curVal));
                        if (this.selectInputVal===this.selectedObj.name) {
                            return;
                        }
                        // this.isFirst=false;
                        // this.isHide=false;
                    }else{
                        this.isHide=true;
                    }
                    // this.selectdItemEvent();
                },
                deep: true
            },
            options(curVal, oldVal) {  //所有数据
                if(curVal){
                    this.isFirst = true;
                }
                if(!this.isFirst){
                    return;
                }
                this.infoList=curVal;
                this.optionAllData=curVal;
                if(!curVal.length)this.selectInputVal = this.choiceText = '请选择';
                var newLength = curVal.length;
                var oldLength = oldVal.length;
                var currentItem = newLength>=oldLength?oldLength:newLength;
                if(oldVal.length){
                    for(var i=0;i<currentItem;i++){
                        if(curVal[i].id != oldVal[i].id){
                            this.selectInputVal = this.choiceText = '请选择';
                        }
                    }
                }
            },
            supportSearch(newValue,oldValue){  //可搜索
                this.supportSearch = newValue;
            },
            emptyData(newValue,oldValue) {  //清空数据
                if(newValue){
                    this.handleArrFun('')
                }else{
                    this.handleArrFun(this.id)
                }
            },
        },
        methods:{
            /**
             * 支持搜索状态下的聚焦操作-所有数据未加载
             * @param  {String} _value
             * @return {Void}
             */
            selectInputValFocus(event,_value){
                // this.selectInputVal = '';  //是否需要清空
                this.infoList = this.options;
                if ( event && event.stopPropagation ) {
                    event.stopPropagation();
                } else {
                    window.event.cancelBubble = true;
                }
            },
            /**
             * 处理选中状态
             * @param  {String} _id ID
             * @return {Void}
             */
            handleArrFun(_id){
                setTimeout(()=>{
                    this.optionAllData&&this.optionAllData.forEach((item,index)=>{
                        if(item.id==_id){
                            this.optionAllData[index].isChoice=true;
                            if(item.name=='全部')return;
                            this.setCurrentSelectedItem(item.id,item.name);
                        }else{
                            this.optionAllData[index].isChoice=false;
                        }
                        this.$set(this.optionAllData, index, this.optionAllData[index]);
                    })
                })
            },
            /**
             * 选中下拉框
             * @param _id {String} 当前选择元素的id
             * @param _val {String} 当前选择元素的value
             * @return {Void}
             */
            selectdItemEvent(_id,_val){
                if(!_id){
                    this.setCurrentSelectedItem(_id,_val);
                }
                this.handleArrFun(_id);
                if(this.supportSearch){
                    this.isHide = true;
                }else{
                    this.isHide = false;
                }
                this.$emit("emptyDataFalse");  //清空默认选中操作
            },
            /**
             * 处理当前选中元素 赋值
             * @param _id {String} 当前选择元素的id
             * @param _val {String} 当前选择元素的value
             * @return {Void}
             */
            setCurrentSelectedItem(_id,_val){
                this.selectInputVal=_val?_val:this.selectInputVal;
                this.choiceText = this.selectInputVal;
                this.selectedObj={id:_id,name:_val};
                if(_id!=undefined && _val!=undefined){
                    this.$emit('selected',this.selectedObj);  //选中元素
                }
            },
            //选中输入框 输入框点击
            selectOperationFun(event){
                this.isHide=!this.isHide;
                this.isFirst=false;
                if ( event && event.stopPropagation ) {
                    event.stopPropagation();
                } else {
                    window.event.cancelBubble = true;
                }
            },
            /**
             * 处理多个下拉框点击事(点击收起)
             * @param _event {Object} window事件对象
             * @return {Void}
             */
            listenHideFun(_event){
                if (this.isHide === false && ((~~_event.target.parentNode.id || ~~_event.target.parentNode.parentNode.id) !== ~~this.selectBoxId)) {
                    this.isHide=true;
                }
            },
            //停止滚动事件
            stopScroll(event){
                var selectList = this.$refs.selectList;
                var scrollTop = selectList.scrollTop,
                    scrollHeight = selectList.scrollHeight,
                    height = selectList.clientHeight;
                var delta = (event.wheelDelta) ? event.wheelDelta : -(event.detail || 0);
                if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
                    selectList.scrollTop = delta > 0? 0: scrollHeight;
                    if (event  && event.preventDefault) {
                        event.stopPropagation();
                        event.preventDefault();
                    }else{
                        event.canselBubble = true;
                        window.event.returnValue = false;
                    }
                }
            }
        },
        created () {
            this.infoList=this.options; //初始化缓存下拉框数据
            this.optionAllData=this.options;
            this.selectBoxId=parseInt(Math.random()*100000);  //多个下拉框点击处理
        },
        beforeDestroy() {
            document.removeEventListener('click',this.listenHideFun );  //销毁监听
            this.$refs.selectList.removeEventListener("mousewheel", this.stopScroll);
            this.$refs.selectList.removeEventListener("DOMMouseScroll", this.stopScroll);
        }
    };
</script>
<style lang="less" scoped>
    @baseThemeColor: #007bd9;
    @baseBorderColor: #e0e3e9; //边框颜色
    @selected-boder-color: fade(@baseThemeColor, 10%);
    @selected-list-border-color: fade(@baseBorderColor, 90%);
    *{
        box-sizing: border-box;
    }
    .selectBox{
        background: #ffffff;
        width:100%;
        height: 100%;
        position: relative;
        cursor: pointer;
        font-size:12px;
        input::-webkit-input-placeholder {
            font-size:12px;
            color: #bbbec4;
        }
        input::-webkit-input-placeholder{
            color:#bbbec4;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#bbbec4;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#bbbec4;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
            color:#bbbec4;
        }
        div::-webkit-scrollbar-track{
            border-radius: 10px;
            background-color: rgba(221,221,221,0.1);
        }
        .selectChoice{
            background: #ffffff;
            width:100%;
            height: 100%;
            border-radius: 5px;
            transition:all 0.3s;
            position: relative;
            overflow: hidden;

            .selectInput{
                width:100%;
                height: 100%;
                border: none;
                padding:0px 20px 0px 10px;
                font-weight: bold;
            }
            .choiceTextCss{
                width:100%;
                height: 100%;
                border: none;
                line-height:30px;
                color: #bbbec4;
                font-size:12px;
                font-weight:bold;
            }
            .selectText{
                width:82%;
                height: 100%;
                border: none;
                line-height:30px;
                font-size:12px;
                font-weight:bold;
                padding-left: 10px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .iconStyle{
                position: absolute;
                top:50%;
                right:10px;
                margin-top:-7px;
                transition:all 0.4s;
            }
            .iconStyle.selected{
                transform: rotate(180deg);
            }
        }
        .selectChoice:hover{
            border-color:@baseThemeColor;
        }
        .selectChoice.hover{
            border-color:@baseThemeColor;
            box-shadow: 1px 1px 1px 1px @selected-boder-color,-1px -1px 1px 1px @selected-boder-color;
        }
        .selectList{
            background: #ffffff;
            z-index: 99999;
            opacity: 0;
            width: 100%;
            max-height: 0px;
            overflow-y:auto;
            margin-top:2px;
            padding:5px 0;
            border-radius: 5px;
            border:solid 1px @baseBorderColor;
            position: absolute;
            box-shadow: 0 1px 2px @selected-list-border-color, 0 1px 2px @selected-list-border-color;
            .selectOption{
                height: 30px;
                line-height: 30px;
                padding: 0 15px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                cursor: pointer;
                /*font-weight:bold;*/
            }
            .selectOption:hover{
                background: #ededed;
            }
            .selectOption.selected{
                background: @baseThemeColor;
                color: #ffffff;
            }
        }
        .selectList.heightZero{
            animation:hideHeight 0.4s forwards;
            height:0;
        }
        .selectList.heightOrigin{
            animation:showHeight 0.4s forwards;
            /*opacity:1\9\0;*/
            /*max-height:200px\9\0;*/
            /*overflow-y:scroll\9\0;*/
        }
        @keyframes showHeight
        {
            from {max-height:0px;opacity: 0}
            to {max-height:200px;opacity: 1}
        }
        @keyframes hideHeight
        {
            from {max-height:200px;opacity: 1}
            to {max-height:0px;opacity: 0}
        }
    }
</style>
