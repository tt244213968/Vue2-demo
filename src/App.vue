<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
    import './assets/js/bootstrap.js'
    import './assets/js/app.js'
    import './assets/js/bootstrap-table.min.js'
    import './assets/js/bootstrap-table-zh-CN.min.js'
    import './assets/js/echarts.min.js'
    import myWrapper from './components/Wrapper'
    import myLogin from './components/Login'
    export default {
        name: 'app',
        components: {
            myWrapper,
            myLogin
        },

    }
</script>

<style>
    @import './assets/css/bootstrap.css';
    @import './assets/css/AdminLTE.css';
    @import './assets/css/font-awesome.css';
    @import './assets//css/bootstrap-table.min.css';
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }
</style>