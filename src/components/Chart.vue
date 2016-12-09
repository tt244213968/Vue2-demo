<template>
    <div class="chart-responsive">
        <div id="barchart" style="height:400px;width:100%">
        </div>
        
    </div>
</template>
<script>
    import echarts from 'echarts'
    export default {
        data() {
            return {
                params: ''
            }
        },
        // props: {
        //     params: ''
        // },
        methods: {
            drawChart: function() {

                var chart = echarts.init(document.getElementById('barchart'))
                    // chart.clear()
                chart.setOption({
                    title: this.params.title1,
                    tooltip: this.params.tooltip,
                    legend: this.params.legend,
                    xAxis: this.params.xAxis,
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
                    series: this.params.series,

                });
                console.log(7)

            }
        }
    }
</script>
<style>

</style>