<template>
    <div>
        <div class="row">
            <div class="col-md-3 form-group">
                <div class="input-group">
                    <div class="input-group-addon">公司</div>
                    <select v-model="form_info.company_name" class="form-control" id="company_name">
                        <option value="美嘉">美嘉</option>
                        <option value="美冠">美冠</option>
                        <option value="医疗">医疗</option>
                    </select>
                </div>
            </div>
            <div class="col-md-3 form-group">
                <div class="input-group">
                    <div class="input-group-addon">材料名称</div>
                    <input v-model="form_info.material_name" class="form-control">
                </div>
            </div>
            <div class="col-md-3">
                <button type="submit" @click="showTable" class="btn btn-info btn-block">查询</button>
            </div>
        </div>
        <my-materialtable :data="table.data" ref="materialtable">

        </my-materialtable>
        
                <my-materiallinechartcny :data="linechartcny.data" ref="materiallinechartcny">
                </my-materiallinechartcny>
          
                <my-materiallinechartusd :data="linechartusd.data" ref="materiallinechartusd">
                </my-materiallinechartusd>
        
      
    </div>
</template>
<script>
    import NProgress from 'nprogress'
    import myMaterialtable from './Material_table'
    import myMateriallinechartcny from './Material_linechart_cny'
    import myMateriallinechartusd from './Material_linechart_usd'
    import myHuilvlinechart from './Huilv_linechart'
    export default {
        data() {
            return {
                form_info: {
                    company_name: '美嘉',
                    material_name: ''
                },
                table: {
                    data: ''
                },
                linechartcny: {
                    data: ''
                },
                linechartusd: {
                    data: ''
                }
            }
        },
        methods: {
            showTable: function() {
                if (this.form_info.material_name == '') {
                    $('#tip').modal('show')
                } else {
                    NProgress.start()
                    NProgress.set(0.5)
                    var _this = this
                    $.ajax({
                        url: 'http://192.168.1.66:5000/materialprice',
                        type: 'POST',
                        crossDomain: true,
                        data: {
                            token: localStorage.token,
                            userid: localStorage.userid,
                            company: _this.form_info.company_name,
                            itemkey: _this.form_info.material_name
                        },
                        async: true,
                        dataType: 'json',
                        success: function(res) {
                            _this.table.data = res.data
                            NProgress.done()
                            _this.$refs.materialtable.show = true
                                // _this.$refs.materialtable.setTable()
                        }
                    })
                }
            },
            drawlinechart: function(data) {
                if (data.code == 0) {
                    this.$refs.materiallinechartcny.show = false
                    this.$refs.materiallinechartusd.show = false
                } else {
                    if (data.datasingle[0] != '') {
                        this.$refs.materiallinechartcny.show = true
                        this.linechartcny.data = data.datasingle[0]
                    } else {
                        this.$refs.materiallinechartcny.show = false
                    }
                    if (data.datasingle[1] != '') {
                        this.$refs.materiallinechartusd.show = true
                        this.linechartusd.data = data.datasingle[1]
                    } else {
                        this.$refs.materiallinechartusd.show = false
                    }
                }

            }
        },
        components: {
            myMaterialtable,
            myMateriallinechartcny,
            myMateriallinechartusd,
            myHuilvlinechart
        }
    }
</script>
<style>

</style>