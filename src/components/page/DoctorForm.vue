<template>
  <div class="block">
  <el-container>


    <el-aside width="230px">
      <!--<el-tree :data="tree" show-checkbox node-key="id" :expand-on-click-node="false" icon-class="el-icon-arrow-right"-->
               <!--:default-expanded-keys="[1, 2, 3]" style="width: 200px">-->

        <!--<span class="custom-tree-node" slot-scope="{ node, data }">-->
        <!--<span>{{ node.label }}</span>-->
       <!--</span>-->
      <!--</el-tree>-->

      <!--<div class="custom-tree-container">-->

        <!--<div class="block">-->

      <!--<el-input placeholder="输入关键字进行过滤" v-model="filterText"/> -->
          <el-tree :data="tree" show-checkbox node-key="id" :expand-on-click-node="false" icon-class="el-icon-arrow-right" :filter-node-method="filterNode"
                   :props="treeProps" ref="tree" style="border-style: none;" :default-expanded-keys="[1, 2, 3]" @check-change="addSelectedNodes">
          </el-tree>
        <!--</div>-->
      <!--</div>-->

    </el-aside>

    <el-container>
      <el-header>
        <el-row>
          <el-col :span="6"></el-col>
          <el-col :span="4"><el-input v-model.trim="params.name" placeholder="居民姓名"></el-input></el-col>
          <el-col :span="4">
            <el-input v-model.trim="params.idCardNumber" placeholder="身份证号"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="seniorSearch" plain>搜索</el-button>
          </el-col>
          <el-col :span="6"></el-col>
          <el-col :span="6" :offset="8">
            <el-button type="primary" @click="editorUserPage" round>新增用户</el-button>
            <el-button type="danger" @click="stopUsingBatch" round>批量禁用</el-button>
          </el-col>
        </el-row>
      </el-header>

        <el-main>
          <!-- border前面的冒号？？？-->
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :border="true" @selection-change="handleSelectionChange">
            <el-table-column type="selection"/>
            <!--<el-table-column label="日期" width="120">-->
              <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="name" label="姓名" width="120"/>-->
            <!--<el-table-column prop="address" label="地址"/>-->
            <el-table-column prop="id" label="id" v-if="false"/>
            <el-table-column label="姓名" width="90">
              <template slot-scope="scope">
                <a v-on:click="detailUserPage(scope.row)" style="color:blue">{{scope.row.name}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="70"/>
            <el-table-column prop="mobile" label="手机号" width="130"/>
            <el-table-column prop="idCardNumber" label="身份证号" width="180"/>
            <el-table-column prop="organization" label="所属地域"/>
            <el-table-column prop="hospitalName" label="医院名称"/>
            <el-table-column prop="usageState" label="状态" width="80"/>
            <el-table-column label="操作" width="85">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="resetPassword(scope.$index, scope.row)">密码重置</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.pageNo"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="params.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="params.total">
          </el-pagination>

        </el-main>
        <!--<el-footer>Footer</el-footer>-->
    </el-container>
  </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        params:{
          name: null,
          idCardNumber: null,
          districtIds: [],
          pageNo: 1,
          pageSize: 10,
          total: 0
        },

        doctorIds: [],
        multipleSelection: [],
        tableData: [],
        multipleSelection: [],
        total: 12,
        tree: [],

        filterText: '',

        treeProps: {
          label: 'name',
          children: 'children'
        }
      }
    },

    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },

    //page loading execute
    mounted(){
      this.listByPaging();

      const header = { token: localStorage.getItem('cmq_token') };
      this.$http.get('/api/district/list-as-tree', {headers: header}).then(response =>{
        this.tree = response.body.data.districtTree;
      }, response =>{
        alert(response.body.message);
      })
    },


  methods: {

    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

      editorUserPage(){
        this.$router.push('/doctoreditor');
      },


    detailUserPage(row) {

      this.$router.push({
        path:'/doctoreditor',
        query:{
          id: row.id
        }
      });

    },

  toggleSelection(rows) {
    if (rows) {
      rows.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row);
      });
    } else {
      this.$refs.multipleTable.clearSelection();
    }
  },

  handleSelectionChange(val) {
    this.multipleSelection = val;
  },

  listByPaging() {
    const header = { token: localStorage.getItem('cmq_token') };

    //alert(1);
    this.$http.post('/api/doctor/list-by-paging', this.params,
      {headers: header}
    ).then(response =>{

      if(response.body.code === '500'){
        alert(response.body.message);
      }
      //alert(response.body.data.paging.doctors[0].name);
      //alert(response.body.data.tree[0].label);
      this.tableData = response.body.data.paging.doctors;
      //this.params.pageNo = response.body.data.paging.pageNo;
      //this.params.pageSize = response.body.data.paging.pageSize;
      this.params.total = response.body.data.paging.total;
    }, response =>{
      alert(response.body.message);
    })
  },

    resetPassword(index, row){
      const header = { token: localStorage.getItem('cmq_token') };

      //alert(1);
      this.$http.post('/api/doctor/reset-password', {id: row.id},
        {headers: header}
      ).then(response =>{

        if(response.body.code === '500'){
          alert(response.body.message);
        }

        alert("密码重置为:123456");
        this.listByPaging();

      }, response =>{
        alert(response.body.message);
      })
    },

    seniorSearch(){
      this.listByPaging();
    },

    addSelectedNodes(){
      this.params.districtIds = [];
      this.params.districtIds = this.$refs.tree.getCheckedKeys();

      this.listByPaging();
    },

    stopUsingBatch() {
      //console.log(this.$refs.multipleTable.selection);
      //for(var i in this.$refs.multipleTable.columns){
      //  console.log(i);
      //}

      //console.log(this.multipleSelection[0].id);
      this.doctorIds = [];
      this.multipleSelection.forEach(row =>{
        //console.log(row);
          this.doctorIds.push(row.id);
        }
      );
      //console.log(this.params.doctorIds);
      //return false;

      const header = { token: localStorage.getItem('cmq_token') };
      this.$http.post('/api/doctor/stop-using-batch', {doctorIds: this.doctorIds},
        {headers: header}
      ).then(response =>{
        this.listByPaging();
        alert("禁用成功");
      }, response =>{
        alert(response.body.message);
      });



    },


  handleSizeChange(val) {
    //alert(this.params.pageNo);
    //alert(this.params.pageSize);
    //this.params.pageNo = 2;
        this.params.pageSize = val;
        this.listByPaging();
        console.log(`每页 ${val} 条`);
      },

  handleCurrentChange(val) {
    //alert(this.params.pageNo);
    //alert(this.params.pageSize);
    //this.params.pageNo = 2;
        this.params.pageNo = val;
        this.listByPaging();
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style>
  .el-header, .el-footer {
    #background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 30px;
  }

  .el-aside {
    #background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 1000px;
  }

  .el-main {
    #background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 20px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-row {
    margin-bottom: 20px;
  }
  :last-child {
     margin-bottom: 0;
   }

  .el-col {
    border-radius: 4px;
  }
  /*.bg-purple-dark {*/
    /*background: #99a9bf;*/
  /*}*/
  /*.bg-purple {*/
    /*background: #d3dce6;*/
  /*}*/
  /*.bg-purple-light {*/
    /*background: #e5e9f2;*/
  /*}*/
  /*.grid-content {*/
    /*border-radius: 4px;*/
    /*min-height: 36px;*/
  /*}*/
  /*.row-bg {*/
    /*padding: 10px 0;*/
    /*background-color: #f9fafc;*/
  /*}*/
</style>
