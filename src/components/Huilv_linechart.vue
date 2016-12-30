<template>  
    <div>

    

    <div class="box box-info" v-if="show">
            <div class="box-header with-border">
              <h3 class="box-title">汇率</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <!--<button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>-->
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body" >
                

            <div id="huilv_linechart" style="height:300px;width:100%">
                </div>
               
              <!-- /.table-responsive -->
            </div>
            <!-- /.box-body -->
            <!-- /.box-footer -->

          </div>
    
    </div>
</template>
<script>
    import echarts from 'echarts'
    export default {
        data() {
            return {
                show: true,
                data: ''
                    // historyprice: this.$store.state.historyprice
            }
        },
        methods: {
            drawChart: function(data) {
                var xAxis = [],
                    series = [],
                    legend = ['美元兑人民币']
                for (var i = 0; i < data.length; i++) {
                    xAxis.push(data[i].Date)
                    series.push(data[i].Rate)
                }


                var chart = echarts.init(document.getElementById('huilv_linechart'))
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
                        name: '汇率'
                    },
                    dataZoom: [{
                        type: 'slider',
                        xAxisIndex: 0,
                        start: 90,
                        end: 100
                    }, {
                        type: 'inside',
                        xAxisIndex: 0,
                        start: 0,
                        end: 60
                    }, {
                        type: 'slider',
                        yAxisIndex: 0,
                        start: 90,
                        end: 100
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
                })


            }
        },
        created: function() {
            var _this = this
            $.ajax({
                url: 'http://192.168.1.66:5000/huilv',
                type: 'post',
                dataType: 'json',
                data: {
                    userid: localStorage.userid,
                    token: localStorage.token
                },
                crossDomain: true,
                async: true,
                success: function(res) {
                    if (res.code == 1) {
                        _this.data = res.data

                    }
                },
                error: function() {
                    console.log('获取汇率失败')
                }
            })
        },
        watch: {
            data: 'drawChart'
        },
        props: {

        },
        components: {

        }
    }
</script>
<style>

</style>