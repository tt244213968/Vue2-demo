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
            <a class="dropdown-toggle" data-toggle="dropdown" style="color:#fff">
             <i class="fa fa-user"></i>
              <span>{{username}}</span>
            </a>
            <ul class="dropdown-menu">
            
              <!-- Menu Footer-->
              <li class="user-footer">
               
                <div class="pull-right">
                  <a @click="logout" class="btn btn-default btn-flat">退出</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
    import myNav from './Nav'
    import myModal from './Modal'
    export default {
        data() {
            return {
                username: localStorage.username,
                modal: [{
                    title: '退出登录',
                    body: '确定退出系统？',
                    show: false
                }]
            }
        },
        methods: {
            logout: function() {
                this.$router.replace('/')
                localStorage.username = ''
                    // this.modal[0].show = true
                    // console.log(this.modal[0].show)
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