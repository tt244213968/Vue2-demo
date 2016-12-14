<template>
 <header class="main-header">
    <!-- Logo -->
    <router-link class="logo" v-bind:to="{path:'/wrapper'}">
        美嘉辅助系统
    </router-link>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a class="user" style="color:#fff" data-toggle="dropdown">
             <i class="fa fa-user"></i>
              <span>{{username}}</span>
            </a>
            <ul class="dropdown-menu">
                <li>
                    <a @click="showmodal">修改密码</a>
                </li>
            </ul>
          </li>
          <li>
            <a class="user" title="退出" @click="logout" style="color:#fff">
             <i class="fa fa-sign-out"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="modal fade" id="modal">
  <div class="modal-dialog model-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title">修改密码</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <label>请输入新密码</label>
            <input v-model="pass1" type="password" class="form-control">
        </div>
        <div class="form-group">
            <label>请重新输入密码</label>
            <input v-model="pass2" type="password" class="form-control">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click="changepass">提交</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

  </header>
</template>
<script>
    import myNav from './Nav'
    import myModal from './Modal'
    export default {
        data() {
            return {

                username: localStorage.username,
                pass1: '',
                pass2: ''
            }
        },
        methods: {
            logout: function() {
                this.$router.replace('/')
                localStorage.username = ''
                localStorage.userid = ''
                localStorage.token = ''
            },
            showmodal: function() {
                $('#modal').modal('show')
            },
            changepass: function() {

                if (this.pass1 != this.pass2) {
                    alert('两次输入的密码不一致')
                } else {
                    var _this = this
                    $.ajax({
                        url: 'http://192.168.1.66:808/api/user/update2',
                        dataType: 'json',
                        type: 'post',
                        crossDomain: true,
                        data: {
                            fidno: localStorage.userid,
                            token: localStorage.token,
                            userpassword: _this.pass1
                        },
                        success: function(res) {
                            if (res.Table1[0].message == 'ok') {
                                $('#modal').modal('hide')
                                alert('密码修改成功，请重新登录')
                                localStorage.userid = ''
                                localStorage.token = ''
                                localStorage.username = ''
                                _this.$router.replace('/')
                            } else {
                                alert('修改失败')
                            }
                        },
                        error: function() {
                            alert('连接错误')
                        }
                    })
                }
            }
        },
        components: {
            myNav,
            myModal
        }

    }
</script>
<style>
    @import '../assets/css/skins/_all-skins.min.css';
</style>