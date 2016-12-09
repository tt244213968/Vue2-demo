<template>
    <div>
        <div class="row">
        
           <div class="form-group col-md-3">
                <div class="input-group">
                <div class="input-group-addon">客户名称</div>
                <input class="form-control" id="customer_name" v-model="form_info.customer_name">

                </div>
            </div>
            <div class="form-group col-md-3">
                <div class="input-group">
                <div class="input-group-addon">物料名称</div>
                <input class="form-control" id="material_name" v-model="form_info.material_name">
                </div>
            </div>
            <div class="col-md-3">
            <button @click="showTable" type="submit" :class="{disabled :btndisabled}" class="btn btn-info btn-block">查询</button>
           </div>
        </div>
      
        <my-boxtable :title="boxtable.title" :showTable="showTable" ref="boxtable">
        </my-boxtable>
       
              
           
  <my-boxlinechart ref="boxlinechart">
                </my-boxlinechart>
        <div class="row">
            
            <div class="col-md-6">
                <my-boxpiechart ref="boxpiechart">

                </my-boxpiechart>
            </div>
            <div class="col-md-6">
                <my-boxcalculator ref="calculator">

                </my-boxcalculator>
            </div>
        </div>
                <my-boxbarchart :title="boxbarchart.title"  ref="boxbarchart">
                    
                </my-boxbarchart>

        <my-modal v-for="(modal,index) in modals" :params="modal"></my-modal>
    </div>
</template>
<script>
    import NProgress from 'nprogress'
    import myBoxtable from './Box_table'
    import myBoxbarchart from './Box_barchart'
    import myBoxlinechart from './Box_linechart'
    import myBoxpiechart from './Box_piechart'
    import myBoxcalculator from './Box_calculator'
    import myModal from './Modal'
    import '../assets/loading.gif'
    export default {
        data() {
            return {
                btndisabled: false,
                modals: [{
                    id: 'loading',
                    title: '提示',
                    html: '<p>正在加载中...</p>',
                    header: false,
                    footer: false
                }, {
                    id: 'tip',
                    title: '提示',
                    html: '<p>输入框不能为空</p>',
                    header: true,
                    footer: false
                }],
                showTable: true,
                form_info: {
                    customer_name: '',
                    material_name: ''
                },
                boxtable: {
                    title: 'BOM列表',
                    columns: [{
                        field: 'Company',
                        title: '团队',

                    }, {
                        field: 'CustomerShortName',
                        title: '中文简称'
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
                        title: '物料名'
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
                    }, {
                        field: 'ListCost',
                        title: '目录价'
                    }],
                    datas: ''
                },
                boxbarchart: {
                    id: 'barchart',
                    title: '价格柱状图',
                    params: {
                        showselect: true,
                        title1: {
                            text: ''
                        },
                        tooltip: {
                            // trigger: 'axis'
                        },
                        legend: {
                            data: ['采购价', '目录价']
                        },
                        xAxis: {
                            data: [
                                    [],
                                    [],
                                    []
                                ] //对返回数据进行筛选，讲每个对象中的产品名放入数组中
                        },
                        yAxis: {
                            type: 'value',
                            name: '价格'
                        },
                        series: [{
                            name: '采购价',
                            type: 'bar',
                            data: [
                                [],
                                [],
                                []
                            ]
                        }, {
                            name: '目录价',
                            type: 'bar',
                            data: [
                                [],
                                [],
                                []
                            ]
                        }]
                    }

                },
                historyprice: this.$store.state.historyprice
            }
        },
        methods: {
            showTable: function() {
                console.log(this.$router.currentRoute.name)
                if (this.form_info.customer_name == '' || this.form_info.material_name == '') {
                    // this.showmodal('tip', 'show')
                    $('#tip').modal('show')
                } else {
                    // this.showmodal('loading', 'show')
                    this.btndisabled = true
                    NProgress.start()
                    NProgress.set(0.5)
                        // $('#loading').modal('show', {
                        //     backdrop: false
                        // })
                    var _this = this;
                    $.ajax({
                        url: 'http://192.168.1.66:5000/cost',
                        dataType: 'json',
                        type: 'POST',
                        timeout: 60000,
                        data: {
                            customerkey: _this.form_info.customer_name,
                            itemkey: _this.form_info.material_name
                        },
                        crossDomain: true,
                        async: true,
                        success: function(response) {
                            _this.btndisabled = false
                            _this.reset()
                            NProgress.done()
                                // $('#loading').modal('hide')
                                // _this.showmodal('loading', 'hide')
                            for (var i = 0; i < response.datasingle.length; i++) {
                                for (var j = 0; j < response.datasingle[i].length; j++) {
                                    _this.boxbarchart.params.xAxis.data[i].push(response.datasingle[i][j].ProductName)
                                    _this.boxbarchart.params.series[0].data[i].push(response.datasingle[i][j].PurCost)
                                    _this.boxbarchart.params.series[1].data[i].push(response.datasingle[i][j].ListCost)
                                }
                            }
                            var params = _this.boxbarchart.params

                            _this.$refs.boxbarchart.show = true
                            _this.$refs.boxbarchart.params = params
                            _this.$refs.boxbarchart.drawChart()

                            _this.$refs.boxtable.datas = response.data
                            _this.$refs.boxtable.show = true
                            _this.$refs.boxtable.setTable()
                        },
                        error: function(response) {
                            alert(response)
                        }
                    })
                }
            },
            drawlinechart: function(data) {

                this.$refs.boxlinechart.show = true
                this.$refs.boxlinechart.drawChart(data)
            },
            drawpiechart: function(data) {

                this.$refs.boxpiechart.show = true
                this.$refs.boxpiechart.drawChart(data)
            },
            showcalculator: function(data) {
                this.$refs.calculator.show = true
                this.$refs.calculator.calculate(data)
            },
            reset: function() {
                this.boxbarchart.params.xAxis.data = [
                    [],
                    [],
                    []
                ]
                this.boxbarchart.params.series[0].data = [
                    [],
                    [],
                    []
                ]
                this.boxbarchart.params.series[1].data = [
                    [],
                    [],
                    []
                ]
            }
        },
        components: {
            myBoxtable,
            myBoxbarchart,
            myBoxlinechart,
            myBoxpiechart,
            myBoxcalculator,
            myModal
        },
    }
</script>
<style>

</style>