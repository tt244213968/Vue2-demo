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
      
        <my-costtable :title="costtable.title" :showTable="showTable" ref="costtable">
        </my-costtable>
       
              
           
  <my-costlinechart ref="costlinechart">
                </my-costlinechart>
        <div class="row">
            
            <div class="col-md-6">
                <my-costpiechart ref="costpiechart">

                </my-costpiechart>
            </div>
            <div class="col-md-6">
                <my-costcalculator ref="calculator">

                </my-costcalculator>
            </div>
        </div>
                <my-costbarchart :title="costbarchart.title"  ref="costbarchart">
                    
                </my-costbarchart>

        <my-modal v-for="(modal,index) in modals" :params="modal"></my-modal>
    </div>
</template>
<script>
    import NProgress from 'nprogress'
    import myCosttable from './Cost_table'
    import myCostbarchart from './Cost_barchart'
    import myCostlinechart from './Cost_linechart'
    import myCostpiechart from './Cost_piechart'
    import myCostcalculator from './Cost_calculator'
    import myModal from './Modal'

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
                }, {
                    id: 'error',
                    title: '提示',
                    html: '<p>无权限</p>',
                    header: true,
                    footer: false
                }],
                showTable: true,
                form_info: {
                    customer_name: '',
                    material_name: ''
                },
                costtable: {
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
                costbarchart: {
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
                // console.log(this.$router.currentRoute.name)
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
                            itemkey: _this.form_info.material_name,
                            userid: localStorage.userid,
                            token: localStorage.token
                        },
                        crossDomain: true,
                        async: true,
                        success: function(response) {
                            if (response.code == 0) {
                                $('#error').modal('show')
                                NProgress.done()
                                _this.btndisabled = false
                            } else {

                                _this.btndisabled = false
                                _this.reset()
                                NProgress.done()
                                    // $('#loading').modal('hide')
                                    // _this.showmodal('loading', 'hide')
                                for (var i = 0; i < response.datasingle.length; i++) {
                                    for (var j = 0; j < response.datasingle[i].length; j++) {
                                        _this.costbarchart.params.xAxis.data[i].push(response.datasingle[i][j].ProductName)
                                        _this.costbarchart.params.series[0].data[i].push(response.datasingle[i][j].PurCost)
                                        _this.costbarchart.params.series[1].data[i].push(response.datasingle[i][j].ListCost)
                                    }
                                }
                                var params = _this.costbarchart.params

                                _this.$refs.costbarchart.show = true
                                _this.$refs.costbarchart.params = params
                                _this.$refs.costbarchart.drawChart()

                                _this.$refs.costtable.datas = response.data
                                _this.$refs.costtable.show = true
                                _this.$refs.costtable.setTable()
                            }
                        },
                        error: function(response) {
                            alert(response)
                        }
                    })
                }
            },
            drawlinechart: function(data) {

                this.$refs.costlinechart.show = true
                this.$refs.costlinechart.drawChart(data)
            },
            drawpiechart: function(data) {

                this.$refs.costpiechart.show = true
                this.$refs.costpiechart.drawChart(data)
            },
            showcalculator: function(data) {
                this.$refs.calculator.show = true
                this.$refs.calculator.calculate(data)
            },
            reset: function() {
                this.costbarchart.params.xAxis.data = [
                    [],
                    [],
                    []
                ]
                this.costbarchart.params.series[0].data = [
                    [],
                    [],
                    []
                ]
                this.costbarchart.params.series[1].data = [
                    [],
                    [],
                    []
                ]
            }
        },
        components: {
            myCosttable,
            myCostbarchart,
            myCostlinechart,
            myCostpiechart,
            myCostcalculator,
            myModal
        },
    }
</script>
<style>

</style>