<template>
     <div class="box box-info col-md-6" v-if="show">
            <div class="box-header with-border">
              <h3 class="box-title">价格计算(目录价)</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body" >
                <div class="row">
                    <div class="col-md-6 col-sm-6" v-for="(data,index) in datas">
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon">{{data.ItemName}}</div>
                                <input class="form-control" v-model="data.ListPrice" v-bind:change="recalculate()" type="" name="" >
                                <div class="input-group-addon">￥</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <span>产品价格：</span>
                    {{price}}
                    <span>元</span>
                </div>
            </div>  
    </div>
</template>
<script>
    export default {
        data() {
            return {
                show: false,
                price: 0,
                datas: []
            }
        },
        methods: {
            calculate: function(data) {
                this.datas = data
                var price = 0
                var qty = 0
                for (var i = 0; i < data.length; i++) {
                    price += data[i].ListPrice * data[i].Quantity
                    qty += parseInt(data[i].Quantity)
                }
                this.price = price / qty
            },
            recalculate: function() {
                this.$nextTick(function() {

                    var data = this.datas
                    var price = 0
                    var qty = 0
                    for (var i = 0; i < data.length; i++) {
                        price += data[i].ListPrice * data[i].Quantity
                            // console.log('第' + i + '个物料总价：' + data[i].ListPrice * data[i].Quantity)
                            // console.log('第' + i + '个物料单价：' + data[i].ListPrice)
                            // console.log('第' + i + '个物料数量：' + data[i].Quantity)
                        qty += parseFloat(data[i].Quantity)
                    }

                    this.price = price / qty
                        // console.log('总价格' + price)
                        // console.log('总数量' + qty)
                        // console.log('价格' + this.price)
                    this.$parent.drawpiechart(data)
                })
            }
        },
        watch: {

        }
    }
</script>
<style>

</style>