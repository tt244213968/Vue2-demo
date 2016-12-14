<template>  
    <div class="box box-info col-md-6" v-show="show">
            <div class="box-header with-border">
              <h3 class="box-title">历史售价(美元)</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <!--<button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>-->
              </div>
            </div>
            <!-- /.box-header -->
            <div v-if="show" class="box-body" >
                <div class="row">
                    <!--<h3>无美元历史售价</h3>-->
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
                shownull: false
            }
        },
        methods: {
            drawChart: function() {
                if (this.data == '') {
                    this.shownull = true
                    this.$store.commit('hideusd')
                } else {

                    this.$nextTick(function() {

                        var data = this.data
                        var xAxis = [],
                            series = [],
                            legend = []
                        for (var i = 0; i < data.length; i++) {
                            xAxis.push(data[i].Date.slice(0, 10))
                            series.push(data[i].Price)

                        }
                        legend.push(data[0].Itemno)

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
                                // axisLabel: {
                                //     interval: 0,
                                //     rotate: 50
                                // }
                            },
                            yAxis: {
                                type: 'value',
                                name: '价格：元'
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
            }
        },
        watch: {
            // index: 'drawChart',
            data: 'drawChart'
                // data: 'drawChart'
        },
        props: {
            title: '',
            data: ''
        },
        components: {

        }
    }
</script>
<style>

</style>