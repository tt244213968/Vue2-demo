<template>
    <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu">
        <li v-for="(item,index) in items" class="treeview">
          <a>
            <i v-bind:class="item.icon"></i> <span>{{item.itemname}}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li v-for="(list,index) in item.lists">
                <router-link v-bind:to="list.url"><i class="fa fa-circle-o"></i> {{list.listname}}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
</template>
<script>
    export default {
        data() {
            return {
                items: [{
                    icon: 'fa fa-dashboard',
                    itemname: '成本管理',
                    lists: [{
                        listname: '成本查看',
                        url: '/costanalyse',
                        isActive_li: false
                    }, {
                        listname: '材料价格',
                        url: '/materialprice',
                        isActive_li: false
                    }, {
                        listname: '成本月报',
                        url: '/costmonthly',
                        isActive_li: false
                    }, {
                        listname: '汇率查看',
                        url: './huilv',
                        isActive_li: false
                    }],
                    isActive_ul: false
                }],

            }
        },
        methods: {
            changeActive: function() {
                this.isActive = !this.isActive
                console.log(this.isActive)
            },
            linkto: function(link) {
                this.$router.replace(link);
            }

        }
    }
</script>
<style>
    div.sidebar-nav {
        height: 100%;
    }
    
    .sidebar-nav a {
        cursor: pointer
    }
</style>