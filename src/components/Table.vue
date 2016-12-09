<template>  
<table class="table">
    <!--<button @click="setTable"></button>-->
</table>
</template>
<script>
    export default {
        data() {
            return {
                columns: '',
                datas: ''
            }
        },
        methods: {
            setTable: function() {
                $(".table").bootstrapTable('destroy');
                $('.table').bootstrapTable({
                    columns: this.columns,
                    data: this.datas,
                    striped: true,
                    pagination: true,
                    sidePagination: 'client',
                    pageNumber: 1,
                    pageSize: 10,
                    pageList: [10, 20, 50],
                    // events: ,


                })
            }
        },

        events: {

        }
    }
</script>
<style>

</style>