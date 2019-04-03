<template>
  <div class="login-wrap">
    <div class="ms-title">后台管理系统</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <p style="font-size:12px;line-height:30px;color:#999;">忘记密码ddd...</p>
      </el-form>
    </div>
  </div>
</template>

<script>
  import VueResource from 'vue-resource'
  export default {
    data: function(){
      return {
        ruleForm: {
          //记住用户
          username: localStorage.getItem('cmq_username'),
          password: localStorage.getItem('cmq_password')
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        const self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            localStorage.setItem('cmq_username',self.ruleForm.username);
            localStorage.setItem('cmq_password',self.ruleForm.password);

            //axios.post('http://47.110.137.26:8080/login','username='+ self.ruleForm.username + '&password=' + self.ruleForm.password)
            //self.$router.push('/readme');

            //post请求，若后端未用bean接收，则直接以 ?xx=xx&形式拼接，若以bean接受，则以json拼接
            //前者用request.getParameter?后者在请求body中找json匹配json中的字段
            this.$http.post('/api/login?username=' + self.ruleForm.username + '&password=' + self.ruleForm.password
              //, {'username':self.ruleForm.username, 'password':self.ruleForm.password}
            ).then(response =>{
              //console.log(response.body);
              if(response.body.code === '500'){
                alert(response.body.message);
                return false;
              }
              //login success
              localStorage.setItem('cmq_token', response.body.data.token);
              self.$router.push('/doctorform');
            }, response =>{
              //error callback
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .login-wrap{
    position: relative;
    width:100%;
    height:100%;
  }
  .ms-title{
    position: absolute;
    top:50%;
    width:100%;
    margin-top: -230px;
    text-align: center;
    font-size:30px;
    color: #fff;

  }
  .ms-login{
    position: absolute;
    left:50%;
    top:50%;
    width:300px;
    height:160px;
    margin:-150px 0 0 -190px;
    padding:40px;
    border-radius: 5px;
    background: #fff;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:100%;
    height:36px;
  }
</style>
