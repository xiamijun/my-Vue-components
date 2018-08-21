<template>
  <div class="container">
    <el-form :model="ruleForm" :rules="rule" ref="ruleForm" label-width="110px" class="demo-ruleForm">
      <el-form-item label="输入密码:" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" auto-complete="off" class="pass"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" class="pass"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button @click="clearRules">清空</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'passwordConfirm',
    data() {
      var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
        regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length<8) {
          //小于8位
          callback(new Error('密码须大于等于8位，请确认后输入'));
        } else if (/^([A-Z]{8})$/.test(value)) {
          //8位且纯大写
          callback(new Error('密码须包含大写、小写、数字、符号，请确认后输入'));
        }else if (/^([a-z]{8})$/.test(value)) {
          //8位且纯小写
          callback(new Error('密码须包含大写、小写、数字、符号，请确认后输入'));
        }else if (/^([`~!@#$%^&*()_+<>?:"{},.\/;'[\]·！#￥（——）：；“”‘、，|《。》？、【】[\]]{8})$/.test(value)) {
          //8位且纯字符
          callback(new Error('密码须包含大写、小写、数字、符号，请确认后输入'));
        }else if (value.length===8 && !regEn.test(value) && !regCn.test(value)) {
          //8位且无字符
          callback(new Error('密码须包含大写、小写、数字、符号，请确认后输入'));
        }else if (/^(\d{8})$/.test(value)) {
          //8位且纯数字
          callback(new Error('密码须包含大写、小写、数字、符号，请确认后输入'));
        }else if (/iflytek/.test(value)) {
          //包含iflytek
          callback(new Error('密码不能含有iflytek关键字，请确认后输入'));
        }else if (value.length>=8&&!/[a-z]/.test(value)) {
          //没有小写
          callback(new Error('密码须包含大写、小写、数字、符号，请确认后输入'));
        }else if (value.length>=8&&!/[A-Z]/.test(value)) {
          //没有大写
          callback(new Error('密码须包含大写、小写、数字、符号，请确认后输入'));
        }else if (value.length>=8&&!/[0-9]/.test(value)) {
          //没有数字
          callback(new Error('密码须包含大写、小写、数字、符号，请确认后输入'));
        }else if (value.length>=8&&!/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]·！#￥（——）：；“”‘、，|《。》？、【】[\]]/.test(value)) {
          //没有字符
          callback(new Error('密码须包含大写、小写、数字、符号，请确认后输入'));
        }else if (value.indexOf(' ')!==-1) {
          //有空格
          callback(new Error('密码不能包含空格，请确认后输入'));
        }else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
        },
        rule: {
          pass: [
            { required: true,validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true,validator: validatePass2, trigger: 'blur' }
          ]
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('saveLoginPwd',this.ruleForm.pass)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      clearRules() {
        this.$refs.ruleForm.resetFields();
      }
    }
  }
</script>

<style scoped>
  .btn{
    float: right;
  }
  .pass{
    width: 300px;
  }
</style>
