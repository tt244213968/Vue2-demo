<template>  
    <div class="box box-info col-md-6" v-if="show">
            <div class="box-header with-border">
              <h3 class="box-title">历史售价</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <!--<button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>-->
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body" >
                <div class="row">

            <div id="linechart" style="height:300px;width:100%">
                </div>
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
                // historyprice: this.$store.state.historyprice
            }
        },
        methods: {
            drawChart: function(data) {
                this.$nextTick(function() {

                    var xAxis = [],
                        series = [],
                        legend = []
                    for (var i = data.length - 1; i >= 0; i--) {
                        xAxis.push(data[i].OrderDate)
                        series.push(data[i].HisPrice)
                    }
                    legend.push(data[0].Company)
                    
                    var chart = echarts.init(document.getElementById('linechart'))
                    chart.clear()
                    window.addEventListener("resize", function() {

                        chart.resize();

                    });
                    chart.resize();
                    
                    chart.setOption({
                        title: '',
                        tooltip: {},
                        legend: {
                            data: legend
                        },
                        xAxis: {
                            data: xAxis,
                            axisLabel: {
                                interval: 0,
                                rotate: 50
                            }
                        },
                        yAxis: {
                            type: 'value',
                            name: '价格'
                        },
                        dataZoom: [{
                            type: 'slider',
                            xAxisIndex: 0,
                            start: 0,
                            end: 100
                        }, {
                            type: 'inside',
                            xAxisIndex: 0,
                            start: 0,
                            end: 60
                        }, {
                            type: 'slider',
                            yAxisIndex: 0,
                            start: 0,
                            end: 100
                        }, {
                            type: 'inside',
                            yAxisIndex: 0,
                            start: 0,
                            end: 80
                        }],
                        series: [{
                            name: legend,
                            type: 'line',
                            data: series,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                        }]
                    });
                })

                
            }
        },
        watch: {
            index: 'drawChart',
            historyprice: 'drawChart'
        },
        props: {
            title: '',
        },
        components: {

        }
    }
</script>
<style>

</style>