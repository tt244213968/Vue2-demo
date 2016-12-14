<template>  
    <div class="box box-info" v-show="show">
            <div class="box-header with-border">
              <h3 class="box-title">材料列表</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <!--<button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>-->
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table class="table"></table>
              <!-- /.table-responsive -->
            </div>
            <!-- /.box-body -->
            <!-- /.box-footer -->

          </div>
</template>
<script>
    // import myTable from './Table'

    import NProgress from 'nprogress'
    export default {
        data() {
            return {
                show: false,
            }
        },
        methods: {
            setTable: function() {
                var _this = this

                function operateFormatter(value, row, index) {
                    return [
                        '<a class="historyprice" href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="历史售价">',
                        '<i class="fa fa-line-chart"></i>',
                        '</a>      ',
                    ].join('');
                }
                window.operateEvents = {
                    'click .historyprice': function(e, value, row, index) {
                        // _this.showmodal(loading, 'show')
                        NProgress.start()
                        $.ajax({
                            url: 'http://192.168.1.66:5000/materialorderprice',
                            dataType: 'json',
                            type: 'POST',
                            crossDomain: true,
                            async: true,
                            timeout: 60000,
                            data: {
                                userid: localStorage.userid,
                                token: localStorage.token,
                                company: row.Company,
                                itemno: row.Itemno
                            },
                            success: function(res) {
                                if (res.code == 0) {
                                    // _this.$store.commit('hidecny')

                                    // _this.$store.commit('hideusd')
                                    alert('无历史售价') //这里要改成modal
                                    _this.setlinechart(res)
                                    NProgress.done()
                                } else {
                                    // if (res.datasingle[0] != '') {
                                    //     _this.$store.commit('showcny')
                                    // } else if (res.datasingle[0] == '') {
                                    //     _this.$store.commit('hidecny')
                                    // }
                                    // if (res.datasingle[1] != '') {
                                    //     _this.$store.commit('showusd')
                                    // } else if (res.datasingle[1] == '') {
                                    //     _this.$store.commit('hideusd')
                                    // }
                                    NProgress.done()
                                    _this.setlinechart(res)
                                }
                            },
                            error: function(res) {

                            }
                        })
                    },
                }

                $(".table").bootstrapTable('destroy');
                $('.table').bootstrapTable({
                    columns: [{
                        radio: true
                    }, {
                        field: 'Company',
                        title: '团队',
                        // align: 'center',
                        halign: 'center',
                    }, {
                        field: 'ItemName',
                        title: '材料名称',
                        halign: 'center',
                    }, {
                        field: 'Itemno',
                        title: '材料编码',
                        halign: 'center'
                    }, {
                        field: 'ListPrice',
                        title: '目录价格',
                        halign: 'center'
                    }, {
                        field: 'PurPrice',
                        title: '采购价格',
                        align: 'center'
                    }, {
                        field: 'operate',
                        title: '操作',
                        events: operateEvents,
                        formatter: operateFormatter,
                        halign: 'center',
                    }],

                    data: this.data,
                    striped: true,
                    pagination: true,
                    sidePagination: 'client',
                    pageNumber: 1,
                    pageSize: 5,
                    pageList: [10, 20, 50],
                    clickToSelect: true
                })
            },
            setlinechart: function(data) {
                this.$parent.drawlinechart(data)
            },
        },
        props: {
            data: ''
        },
        watch: {
            data: 'setTable'
        },
        components: {
            // myTable
        }
    }
</script>
<style>

</style>