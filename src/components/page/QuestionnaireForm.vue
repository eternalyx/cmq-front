<template>
  <div class="block">
    <el-container>
      <el-aside width="230px"/>

      <el-container>
        <el-header>
          <el-row>
            <el-col :span="6"></el-col>
            <el-col :span="4">
              <el-input v-model.trim="params.residentName" placeholder="居民姓名"></el-input>
            </el-col>
            <el-col :span="4">
              <el-input v-model.trim="params.idCardNumber" placeholder="身份证号"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="seniorSearch" plain>搜索</el-button>
            </el-col>
            <el-col :span="6"></el-col>
            <el-col :span="6" :offset="8">
              <el-button type="primary" @click="createQuestionnaire" round>新增辨识</el-button>
              <el-button type="danger" @click="deleteSome" round>批量删除</el-button>
            </el-col>
          </el-row>
        </el-header>

        <el-main>
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :border="true"
                    @selection-change="handleSelectionChange">
            <el-table-column type="selection"/>
            <el-table-column prop="id" label="id" v-if="false"/>
            <el-table-column label="姓名" width="90">
              <template slot-scope="scope">
                <a v-on:click="detailPage(scope.row)" style="color:blue">{{scope.row.residentName}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="70"/>
            <el-table-column prop="idCardNumber" label="身份证号" width="180"/>
            <el-table-column prop="doctorName" label="指导医生" width="95"/>
            <el-table-column prop="guidanceTime" label="指导日期" width="150"/>
            <el-table-column prop="result" label="辨识结果"/>
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
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        params: {
          residentName: null,
          idCardNumber: null,
          pageNo: 1,
          pageSize: 10,
          total: 0
        },
        tableData: [],
        questionnaireIds: [],
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

    mounted() {
      this.list();
    },

    filters:{
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },

    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },

      createQuestionnaire() {
        this.$router.push('/editQuestionnaire');
      },

      detailPage(row) {
        this.$router.push({
          path: '/detailQuestionnaire',
          query: {
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

      list() {
        const header = {token: localStorage.getItem('cmq_token')};

        this.$http.post('/api/web/questionnaire/list-by-paging', this.params, {headers: header}).then(response => {
          if (response.body.code === '500') {
            alert(response.body.message);
          }
          this.tableData = response.body.data.page.questionnaires;
          this.params.total = response.body.data.page.total;
        }, response => {
          alert(response.body.message);
        })
      },

      seniorSearch() {
        this.list();
      },

      addSelectedNodes() {
        this.params.districtIds = [];
        this.params.districtIds = this.$refs.tree.getCheckedKeys();
        this.listByPaging();
      },

      deleteSome() {
        this.questionnaireIds = [];
        this.multipleSelection.forEach(row => {
            this.questionnaireIds.push(row.id);
          }
        );

        const header = {token: localStorage.getItem('cmq_token')};
        this.$http.post('/api/web/questionnaire/delete-some', {questionnaireIds: this.questionnaireIds}, {headers: header}).then(response => {
          this.list();

          if (response.body.code === '500') {
            alert(response.body.message);
            return false;
          }
          alert("删除成功");
        }, response => {
          alert(response.body.message);
        });
      },

      handleSizeChange(val) {
        this.params.pageSize = val;
        this.list();
        console.log(`每页 ${val} 条`);
      },

      handleCurrentChange(val) {
        this.params.pageNo = val;
        this.list();
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
</style>
