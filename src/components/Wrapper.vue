<template>
    <div class="wrapper">
    <my-header></my-header>
    <my-nav></my-nav>
   <my-contentwrapper>
       <div style="height:600px;"></div>
   </my-contentwrapper>
    <!--<router-view></router-view>-->
    <my-footer></my-footer>
      <div class="control-sidebar-bg"></div>
    </div>
</template>

<script>
    import myHeader from './Header'
    import myNav from './Nav'
    import myContentwrapper from './Content-wrapper'
    import myFooter from './Footer'
    // import myCostanalyse from './Costanalyse'
    // import myCostmonthly from './Costmonthly'

    export default {
        components: {
            myHeader,
            myNav,
            myContentwrapper,
            myFooter,
            // myCostanalyse,
            // myCostmonthly

        }
    }
</script>

<style>
    .main {
        position: relative
    }
</style>