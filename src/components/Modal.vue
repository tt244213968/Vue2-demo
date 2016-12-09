<template>
    <div class="modal fade" v-bind:id="params.id">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header" v-show="params.header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel">{{params.title}}</h4>
                </div>
                <div class="modal-body" v-html="params.html">
                  
                </div>
                <div class="modal-footer" v-show="params.footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary">确定</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>
</template>
<script>
    export default {
        name: 'modal',
        data() {
            return {

            }
        },
        methods: {
            handle: function() {

            }
        },
        props: {
            params: ''
        }
    }
</script>
<style>

</style>