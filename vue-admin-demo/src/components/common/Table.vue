<template>
<div style="border:1px solid rgb(241, 241, 241)">
    <el-table :data="data.list" :header-cell-style="{ background: '#f5f5f6', color: '#333' }" style="width: 100%;font-size: 12px;" highlight-current-row class="tableData" :stripe="true">
        <template v-for="(item,index) in data.columns">
            <el-table-column v-if="item.type=='checkbox'" type="selection" :key='index' :width="item.width" :align="item.align">
            </el-table-column>
            <el-table-column :key='index' :label="item.label" :align="item.align" :width="item.width" v-else-if="item.type=='index'" type="index" :index="indexMethod"></el-table-column>
            <el-table-column :key='index' v-else-if="item.type=='radio'" type="radio" :width="item.width" :align="item.align">
                <template slot-scope="scope">
                    <el-radio class="radio" v-model="radioId" :label="scope.row.id" @change.native="currentChange(scope.$index,scope.row)"><span class="el-radio__label"></span></el-radio>
                    <!-- 　　　　　　　　<el-radio  :label="scope.row.checked" @change.native="currentChange(scope.$index,scope.row)"></el-radio> -->
                </template>
            </el-table-column>
            <el-table-column :prop="item.prop" :key='index' :label="item.label" :align="item.align" :width="item.width" v-else-if="item.type=='data'" :formatter="item.formatter"></el-table-column>
            <el-table-column v-else-if="item.type=='onClick'" :key='index' :label="item.label" :align="item.align" :width="item.width">
                <template slot-scope="scope">
                    <div style="cursor: pointer;" :class="item.class" @click="item.method(scope.row)"></div>
                </template>
            </el-table-column>
        </template>
        <el-table-column :label="data.columns[data.columns.length-1].label" :align="data.columns[data.columns.length-1].align" :width="data.columns[data.columns.length-1].width" v-if="data.operates.length">
            <template slot-scope="scope">
                <!-- {{scope.row.showType}} -->
                <span v-for="(btn,index) in data.operates" :key="index">
                    <span v-if="scope.row.flag">
                        <span :title="btn.label" :class="[btn.class ,'icon-class']" @click="btn.method(index,scope.row)" v-if="scope.row.showType!=btn.showType"></span>
                    </span>
                    <span v-else>
                        <span :title="btn.label" :class="[btn.class ,'icon-class']" @click="btn.method(index,scope.row)" v-if="scope.row.showType==btn.showType"></span>
                    </span>
                </span>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-div">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.currentPages" :page-sizes="data.pageSizes===undefined?[10, 20, 50, 100]:data.pageSizes" :page-size="data.pageSize===undefined?10:data.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="data.total">
        </el-pagination>
    </div>
</div>
</template>

<script>
export default {
    props: {
        data: {}
    },
    data() {
        return {
            radioId: ''
        }
    },
    watch: {
        data(val) {
            console.log('data', val)
        }
    },
    methods: {
        indexMethod(index) {
            return index + 1;
        },
        selectionChange(val, row) {
            console.log(val)
            return
            this.$emit('handleSelectionChange', val)
        },
        currentChange(index, row) {
            this.radioId = row.id
            this.$emit('currentChange', row, index)
        },
        //分页，每页取几条
        handleSizeChange(val) {
            this.$emit('handleSizeChange', val)
            // console.log(`每页 ${val} 条`);
        },
        // 分页，当前第几页
        handleCurrentChange(val) {
            this.$emit('handleCurrentChange', val)
            console.log(`当前页: ${val}`);
        },
        method(val, obj) {
            console.log('val')
        },
    }
}
</script>

<style>
.tableData .cell,
.el-table th div {
    padding-right: 0px !important;
    overflow: hidden;
    text-overflow: none !important;
}

.el-pagination__jump {
    margin-left: 5px !important;
}

.el-table--small th,
.el-table--small td {
    padding: 12px 0 !important;
}

.gutter {
    display: block !important;
}
</style><style scoped>
.icon-class {
    font-size: 18px;
    vertical-align: middle;
    margin-right: 5px;
    display: inline-block;
    color: #0974cc;
}

.th {
    font-weight: normal !important;
}

.table_1_column_1 {
    border-right: 1px solid #353535 !important;
}
</style>
