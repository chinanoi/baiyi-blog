<template>
  <div>
    <el-table :data="data.list"
              :header-cell-style="{ background: '#f5f5f6', color: '#333' }"
              style="width: 100%;font-size: 12px">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="demo-table-expand">
            <template v-for="(item,index) in data.columns">
              <el-form-item v-if="item.type=='data'"
                            :key="index"
                            :align="item.align"
                            :label="item.label"
                            :width="item.width">
                <span>{{ props.row[item.prop] }}</span>
              </el-form-item>
            </template>
          </el-form>
        </template>
      </el-table-column>

      <template v-for="(item,index) in data.columns">
        <el-table-column :label="item.label"
                         :key="index"
                         :width="item.width"
                         :align="item.align"
                         :prop="item.prop"
                         v-if="item.type=='operates'"><span @click="item.method(props.row,index)"
                :title="item.title"
                :class="[item.class ,'icon-class']"
                style="cursor: pointer;"></span>
        </el-table-column>
        <el-table-column :label="item.label"
                         :key="index"
                         :width="item.width"
                         :align="item.align"
                         :prop="item.prop"
                         v-if="item.key&&item.type=='data'">
        </el-table-column>
      </template>
    </el-table>
    <div class="pagination-div">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="data.currentPages"
                     :page-sizes="data.pageSizes===undefined?[10, 20, 50, 100]:data.pageSizes"
                     :page-size="data.pageSize===undefined?10:data.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="data.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: Object
  },
  data () {
    return {
    }
  },
  methods: {
    //分页，每页取几条
    handleSizeChange (val) {
      this.$emit('handleSizeChange', val)
      // console.log(`每页 ${val} 条`);
    },
    // 分页，当前第几页
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', val)
      console.log(`当前页: ${val}`);
    }
  }
}
</script>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-table--small th,
.el-table--small td {
  padding: 14px 0 !important;
}
</style>