<template>  
    <div class="box box-info col-md-6" v-if="show">
            <div class="box-header with-border">
              <h3 class="box-title">成本明细</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <!--<button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>-->
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body" >
               
                <div id="piechart" style="height:300px;width:100%">
                </div>
              <!-- /.table-responsive -->
            </div>
            <!-- /.box-body -->
            <!-- /.box-footer -->
          </div>
</template>
<script>
    import echarts from 'echarts'
    export default {
        data() {
            return {
                show: false,
            }
        },
        methods: {
            drawChart: function(data) {
                this.$nextTick(function() {

                    var series_p = []
                    var series_l = []
                    var legend = []

                    function Obj(value, name) {
                        this.value = value
                        this.name = name
                    }
                    for (var i = 0; i < data.length; i++) {
                        //legend.push(data[i].ItemNo) //物料编码
                        legend.push(data[i].ItemName) //物料名
                        var obj_l = new Obj()
                        var obj_p = new Obj()
                        obj_l.value = data[i].ListPrice * data[i].Quantity
                        obj_l.name = data[i].ItemName
                        obj_p.value = data[i].PurPrice * data[i].Quantity
                        obj_p.name = data[i].ItemName
                        series_l.push(obj_l)
                        series_p.push(obj_p)
                    }

                    var chart = echarts.init(document.getElementById('piechart'))
                    chart.clear()
                    window.addEventListener("resize", function() {

                        chart.resize();

                    });
                    chart.resize();

                    chart.setOption({
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'right',

                            data: legend
                        },
                        series: [{
                            name: '目录价',
                            type: 'pie',
                            selectedMode: 'single',
                            radius: [0, '30%'],
                            label: {
                                normal: {
                                    show: false,
                                    position: 'inner'
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: series_l
                        }, {
                            name: '采购价',
                            type: 'pie',

                            radius: ['40%', '55%'],
                            data: series_p,
                        }]
                    });
                })
            }
        },
        watch: {},
        props: {
            title: '',
        },
        components: {

        }
    }
</script>
<style>

</style>