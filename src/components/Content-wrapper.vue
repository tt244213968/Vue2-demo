<template>
    <section class="content-wrapper">
        <my-contentheader></my-contentheader>
        <my-content></my-content>
        
    </section>
</template>
<script>
    import myContentheader from './Content-header'
    import myContent from './Content'
    export default {
        components: {
            myContentheader,
            myContent
        }
    }
</script>
<style>

</style>