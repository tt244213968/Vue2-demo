<template>  
    <div class="box box-info" v-if="show">
            <div class="box-header with-border">
              <h3 class="box-title">{{title}}</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <!--<button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>-->
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body" >
                <div class="team-select"  v-if="params.showselect">
                    <label>选择团队</label>
                    <select v-model="index">
                        <option value="0">美嘉</option>
                        <option value="1">美冠</option>
                        <option value="2">医疗</option>
                    </select>         
                </div>
            <div id="barchart" style="height:300px;width:100%">
        </div>
    </div>
</div>
</template>
<script>
    import echarts from 'echarts'
    export default {
        data() {
            return {
                show: false,
                index: '0',
                params: ''
            }
        },
        methods: {
            drawChart: function() {
                this.$nextTick(function() {

                    var chart = echarts.init(document.getElementById('barchart'))
                    chart.clear()
                    
                    chart.setOption({

                        title: this.params.title1,
                        tooltip: this.params.tooltip,
                        legend: this.params.legend,
                        xAxis: {
                            data: this.params.xAxis.data[this.index],
                            axisLabel: {
                                interval: 0,
                                rotate: 15
                            }
                        },
                        yAxis: this.params.yAxis,
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
                            name: this.params.series[0].name,
                            type: this.params.series[0].type,
                            data: this.params.series[0].data[this.index],
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                        }, {
                            name: this.params.series[1].name,
                            type: this.params.series[1].type,
                            data: this.params.series[1].data[this.index],
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                        }]
                    });
                    window.onresize = chart.resize;
                })
            }
        },
        watch: {
            index: 'drawChart',
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