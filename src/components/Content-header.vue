<template>  
    <div class="content-header">
        <ol :class="{hidden:hidden}" class="breadcrumb">    
            <li>
                <router-link v-bind:to="{path:'/wrapper'}">首页</router-link>
            </li>
            <li>
                {{currentpath}}
            </li>
        </ol>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                hidden: this.$store.state.hidebreadcrumb,
                currentpath: this.$route.name
            }
        },
        watch: {
            '$route' (to, from) {
                this.currentpath = to.name
            }
        }
    }
</script>
<style>

</style>