<template>
<div class="login-box">
    <div class="panel panel-default">
        <p class="panel-heading no-collapse">用户登录</p>
        <div class="panel-body">
            <form>
                <div class="form-group">
                    <label>登录名</label>
                    <input v-model="username" type="text" class="form-control span12">
                </div>
                <div class="form-group">
                <label>密码</label>
                    <input v-model="password" type="password" class="form-control span12 form-control">
                </div>
                
                <a class="btn btn-success pull-right" @click="login">登录</a>
                <label class="remember-me"><input type="checkbox"> 记住密码</label>
                <div class="clearfix"></div>
            </form>
        </div>
    </div>
</div>
</template>
<script>
    import myHeader from './Header'
    export default {
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login: function() {

                var _this = this
                $.ajax({
                        url: 'http://192.168.1.66:808/api/user/login',
                        dataType: 'json',
                        type: 'POST',
                        data: {
                            loginname: _this.username,
                            password: _this.password
                        },
                        crossDomain: true,
                        success: function(response) {
                            if (response.Table1[0].status == true) {
                                localStorage.username = response.Table2[0].username
                                _this.$router.replace('/wrapper')

                            } else {
                                alert(response.Table1[0].message)
                            }
                        },
                        error: function(response) {
                            alert(response)
                        }
                    })
                    // this.$router.replace('/main')

            }
        }
    }
</script>
<style>
    #line-chart {
        height: 300px;
        width: 800px;
        margin: 0px auto;
        margin-top: 1em;
    }
    
    .navbar-default .navbar-brand,
    .navbar-default .navbar-brand:hover {
        color: #fff;
    }
</style>