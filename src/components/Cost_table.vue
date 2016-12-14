<template>  
    <div class="box box-info" v-show="show">
            <div class="box-header with-border">
              <h3 class="box-title">{{title}}</h3>

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
                columns: '',
                datas: '',
            }
        },
        methods: {
            // showTable: function() {
            //     // this.$refs.table.datas = ''
            //     this.$refs.table.datas = this.datas
            //     this.$refs.table.columns = this.columns
            //     this.$refs.table.setTable()
            // },


            setTable: function() {
                var _this = this

                function operateFormatter(value, row, index) {
                    return [
                        '<a class="historyprice" href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="历史售价">',
                        '<i class="fa fa-line-chart"></i>',
                        '</a>      ',
                        '<a class="costanalysis" href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="成本明细">',
                        '<i class="fa fa-pie-chart"></i>',
                        '</a>'
                    ].join('');
                }
                window.operateEvents = {
                    'click .historyprice': function(e, value, row, index) {
                        // _this.showmodal(loading, 'show')
                        NProgress.start()
                        $.ajax({
                            url: 'http://192.168.1.66:5000/historyprice',
                            dataType: 'json',
                            type: 'POST',
                            crossDomain: true,
                            async: true,
                            timeout: 60000,
                            data: {
                                userid: localStorage.userid,
                                token: localStorage.token,
                                company: row.Company,
                                itemno: row.ItemNo
                            },
                            success: function(res) {
                                if (res.code == 0) {
                                    $('#error').modal('show')
                                    NProgress.done()
                                } else {
                                    NProgress.done()
                                    _this.setlinechart(res.data)
                                }

                            },
                            error: function(res) {

                            }
                        })
                    },
                    'click .costanalysis': function(e, value, row, index) {
                        // _this.showmodal(loading, 'show')
                        NProgress.start()
                        NProgress.set(0.6)
                            // $('#loading').modal('show')
                        $.ajax({
                            url: 'http://192.168.1.66:5000/costanalysis',
                            dataType: 'json',
                            type: 'POST',
                            crossDomain: true,
                            async: true,
                            timeout: 60000,
                            data: {
                                userid: localStorage.userid,
                                token: localStorage.token,
                                company: row.Company,
                                bomno: row.BomNo
                            },
                            success: function(res) {
                                if (res.code == 0) {
                                    $('#error').modal('show')
                                    NProgress.done()
                                } else {
                                    NProgress.done()
                                    _this.setpiechart(res.data)
                                    _this.showcalculator(res.data)
                                }
                                // $('#loading').modal('hide')
                            },
                            error: function(res) {

                            }
                        })
                    }
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
                        field: 'CustomerShortName',
                        title: '中文简称',
                        halign: 'center',
                    }, {
                        field: 'CustomerFullname',
                        title: '中文全称',
                        visible: false
                    }, {
                        field: 'CustomerEngName',
                        title: '客户英文简称',
                        visible: false
                    }, {
                        field: 'CustomerID',
                        title: '客户ID',
                        visible: false
                    }, {
                        field: 'ProductName',
                        title: '物料名',
                        halign: 'center',
                    }, {
                        field: 'ItemNo',
                        title: '物料编码',
                        visible: false
                    }, {
                        field: 'BomNo',
                        title: 'bom单号',
                        visible: false
                    }, {
                        field: 'PurCost',
                        title: '采购价',
                        halign: 'center',
                    }, {
                        field: 'ListCost',
                        title: '目录价',
                        halign: 'center',
                    }, {
                        field: 'operate',
                        title: '操作',
                        events: operateEvents,
                        formatter: operateFormatter,
                        halign: 'center',
                    }],

                    data: this.datas,
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
                this.$store.commit('changehistoryprice', data)
                this.$parent.drawlinechart(data)
            },
            setpiechart: function(data) {
                // this.$store.commit('changehistoryprice', data)
                this.$parent.drawpiechart(data)
            },
            showcalculator: function(data) {
                this.$parent.showcalculator(data)
            }
        },
        props: {
            title: '',
            historyprice: ''
        },
        components: {
            // myTable
        }
    }
</script>
<style>

</style>