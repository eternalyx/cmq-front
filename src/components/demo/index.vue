<template>
    <div class="table">
      <div class="container">
          <div class="people-num">
              <span>本年度辨识总数:{{followUpNum.yearCount1}}人/次</span>
              <span>总辨识数:{{followUpNum.allCount1}}人/次</span>
              <span>本年度评估总数:{{followUpNum.yearCount2}}人/次</span>
              <span>总评估数:{{followUpNum.allCount2}}人/次</span>
          </div>
          <div class="handle-box">
            <el-input v-model="nameValue" clearable placeholder="筛选姓名" class="handle-input mr10" @keyup.enter.native="search"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
          </div>
          <el-row :gutter="0" v-loading="loading">
              <el-col :span="4">
                  <div class="tree-wrap">
                      <el-tree :data="regions" accordion node-key="id" :default-expanded-keys="[3,588,874,140223003]" :props="defaultProps" @node-click="handleNodeClick">
                      </el-tree>
                  </div>
            </el-col>
          <el-col :span="20">
              <el-table :data="tableData" border :stripe="true" style="width: 100%" ref="multipleTable">
              <el-table-column prop="number" label="编号" width="135">
              </el-table-column>
              <el-table-column prop="name" label="姓名"  width="80">
              </el-table-column>
              <el-table-column prop="sex" label="性别" width="60">
              </el-table-column>
              <el-table-column prop="age" label="年龄" width="60">
              </el-table-column>
              <el-table-column prop="phone" label="联系方式" width="110" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="address" label="家庭地址" show-overflow-tooltip>
              </el-table-column>
               <el-table-column prop="yearCount" label="今年辨识次数" show-overflow-tooltip width="95">
              </el-table-column>
               <el-table-column prop="allCount" label="辨识总次数" show-overflow-tooltip width="95">
              </el-table-column>
              <el-table-column prop="yearCount2" label="今年评估次数" show-overflow-tooltip width="95">
              </el-table-column>
               <el-table-column prop="allCount2" label="评估总次数" show-overflow-tooltip width="95">
              </el-table-column>
               <!-- <el-table-column prop="lastVisitTime" label="最近随访时间" show-overflow-tooltip width="110">
              </el-table-column> -->
              <el-table-column label="体质辨识" fixed="right" align="center" width="147">
                <template slot-scope="scope">
                    <el-button type="primary" @click="openFollowUpShowList(scope.row)">查看</el-button>
                    <el-button type="info" @click="goNew(scope.row)">新增</el-button>
                </template>
              </el-table-column>
              <el-table-column label="自理能力评估" fixed="right" align="center" width="147">
                <template slot-scope="scope">
                    <el-button type="success" @click="showAbilityEvaluate(scope.row)">查看</el-button>
                    <el-button type="info" @click="goNewAbilityEvaluate(scope.row)">新增</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination"  v-if="tableData.length != 0">
                <el-pagination
                @current-change="getTableList"
                :page-size="pageSize"
                :current-page.sync="pageNum"
                layout="total,prev, pager, next"
                :page-count="pages"
                :total="total">
                </el-pagination>
            </div>
            </el-col>
        </el-row>

        <!--老年人中医药随访查看选择弹窗-->
        <el-dialog title="随访查看选择" :visible.sync="dialogFollowUpShowSelect" width="700px" top="200px" v-loading="dialogFollowUpShowLoading">
            <div class="select-year-wrap" style="margin-bottom:15px;">
                <span>年份:</span>
                <el-select v-model="currentYear" placeholder="请选择年份" @change="yearChange">
                    <el-option
                        v-for="item in years"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-table
                ref="followUpShowTable"
                :data="followUpShowList"
                tooltip-effect="dark"
                style="width: 100%"
                border 
                :stripe="true">
                <el-table-column prop="op" label="医师" width="180">
                </el-table-column>
                <el-table-column prop="checkdate" label="随访日期" width="220">
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                  <template slot-scope="scope">
                      <el-button type="info" @click="goEdit(scope.row)">修改</el-button>
                      <el-button type="primary" @click="goInfo(scope.row)">查看</el-button>
                      <el-button type="danger" @click="goDelete(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <div class="pagination"  v-if="followUpShowList.length != 0">
                <el-pagination
                @current-change="getper_visit"
                :page-size="per_pageSize"
                :current-page.sync="per_pageNum"
                layout="total,prev, pager, next"
                :page-count="per_pages"
                :total="per_total">
                </el-pagination>
            </div>
        </el-dialog>

        <!--自评表查看选择弹窗-->
        <el-dialog title="随访查看选择" :visible.sync="dialogAbilityEvaluate" width="700px" top="200px" v-loading="dialogAbilityEvaluateLoading">
            <div class="select-year-wrap" style="margin-bottom:15px;">
                <span>年份:</span>
                <el-select v-model="abilityCurrentYear" placeholder="请选择年份" @change="yearChangeAbility">
                    <el-option
                        v-for="item in years"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-table
                ref="followUpShowTable"
                :data="abilityEvaluateList"
                tooltip-effect="dark"
                style="width: 100%"
                border 
                :stripe="true">
                <el-table-column prop="visitTime" label="随访日期" width="120">
                </el-table-column>
                <el-table-column prop="doctorName" label="随访医生" width="120">
                </el-table-column>
                <el-table-column prop="conclusion" label="评估结果" width="160">
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                  <template slot-scope="scope">
                      <el-button type="info" @click="goAbilityEdit(scope.row)">修改</el-button>
                      <el-button type="primary" @click="goAbilityInfo(scope.row)">查看</el-button>
                      <el-button type="danger" @click="goAbilityDelete(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <div class="pagination"  v-if="abilityEvaluateList.length != 0">
                <el-pagination
                @current-change="getAbilityEvaluate"
                :page-size="abilityEvaluatePageSize"
                :current-page.sync="abilityEvaluatePageNum"
                layout="total,prev, pager, next"
                :page-count="abilityEvaluatePages"
                :total="abilityEvaluateTotal">
                </el-pagination>
            </div>
        </el-dialog>

      </div>
    </div>
</template>

<script>
    export default {
        name:'traditional_Chinese_medicine',
        data() {
            return {
                loading:false,
                nameValue: '',
                value: '',//地域code,
                regions: [],
                followUpNum:{
                	yearCount1:0,
                	allCount1:0,
                	yearCount2:0,
                	allCount2:0
                },//随访总次数
                defaultProps: {
                    children: 'list',
                    label: 'name'
                },
                years:[],//共用开始年份

                // 中老年信息
                tableData: [],
                pageSize:0,
                pageNum:1,
                pages:0,
                total:0,
                //老年人中医药
                followUpShowList:[],//老年人中医药随访表
                dialogFollowUpShowSelect:false,//中医药随访弹框是否显示
                dialogFollowUpShowLoading:false,//中医药随访列表加载
                currentYear:2000,//开始年份
                selectedList:[],//获取中医药随访
                per_pageSize:0,
                per_pageNum:1,
                per_pages:0,
                per_total:0,
                per_row:{},//保存某一行的居民信息
                selectYear:'',
                //中老年自评表
                dialogAbilityEvaluate: false,//自评表随访弹框是否显示
                dialogAbilityEvaluateLoading: false,//自评表随访列表加载
                abilityCurrentYear:2000,//开始年份
                abilityEvaluateList: [],//获取自评表随访
                abilityEvaluatePages: 0,
                abilityEvaluateTotal: 0,
                abilityEvaluatePageSize: 0,
                abilityEvaluatePageNum: 1,
                ability_row:{},//保存某一行的居民信息
            }
        },
        activated(){
            // keep-alive 组件激活时刷新数据
            // this.getTableList();
        },
        mounted (){
            this.getAdress();
            // 初始化年份数据（从开始年份便利到当前年份）
            let currentYear = new Date().getFullYear();
            this.currentYear = currentYear;
            this.years = [];
            for (let year = currentYear; year >= 2000; year--) {
                this.years.push({value:year});
            }
        },
        watch: {
            // 监测 route 参数变化
            '$route' (to, from) {
                // 新增/修改页面 到  主页
                if((from.name==='traditional_Chinese_medicine_add'&&to.name==='traditional_Chinese_medicine')||(from.name==='traditional_Chinese_medicine_edit'&&to.name==='traditional_Chinese_medicine')){
                    this.getTableList();
                }
                if((from.name==='abilityEvaluateAdd'&&to.name==='traditional_Chinese_medicine')||(from.name==='abilityEvaluateEdit'&&to.name==='traditional_Chinese_medicine')){
                    this.getTableList();
                }
            }
        },
        methods: {
            // 获取所有乡镇
            getAdress() {
                this.$get('/area/selectPrecinct', {
                    code: localStorage.getItem('county')
                }).then((data) => {
                    if(data.status == 0) {
                        if(data.data.length != 0) {
                          this.regions = data.data;
                          this.value = this.regions[0].code;
                        }
                    }
                    this.getTableList(1);
                }).catch((data) => {
                    console.log(data.msg);
                })
            },
            // 获取列表数据
            getTableList(pageNum) {
                this.loading = true;
                pageNum = pageNum?pageNum:this.pageNum;
                this.$get('/tzData/selectByPage',{
                    pageNum:pageNum,
                    code: this.value,
                    name: this.nameValue,
                }).then((data) => {
                    this.loading = false;
                    if(data.status==0){
                        this.tableData=data.data.list;
                        this.pages=data.data.pages;
                        this.total=data.data.total;
                        this.pageSize=data.data.pageSize;
                        this.pageNum=data.data.pageNum;
                    }
                    this.getFollowUp();
                }).catch((data) =>{
                    console.log(data.msg);
                    this.loading = false;
                })
            },
            //获取随访次数
            getFollowUp(){
            	this.$get('/tzData/selectStatistic', {
                code: this.value
              }).then((data) => {
                if (data.status == 0) {
                  this.followUpNum = data.data;
                }
              }).catch((data) => {
                console.log(data.msg);
              })
            },
            //树形控件点击
            handleNodeClick(data) {
                this.loading = true;
                //把搜索框置空
                this.value = data.code;
                this.getTableList(1);
            },
            // 搜索
            search() {
                this.loading = true;
                this.getTableList(1);
            },
            
            //跳转新增随访时向路由中添加该用户的name
            goNew(row){
                let name = 'traditional_Chinese_medicine_add';
                let params = {contractId: row.contractId,name:row.name,number:row.number,idnumber:row.cardNo,areaCode:row.code};
                this.$router.push({name: name, params: params});
            },
            goInfo (row) {
                let name = 'traditional_Chinese_medicine_info';
                let params = {id: row.id};
                if(row.areaCode){
                    params.areaCode = row.areaCode;
                }else{
                    params.areaCode = 'null';
                }
                this.$router.push({name: name, params: params});
                this.dialogFollowUpShowSelect = false;
            },
            // 修改中医药随访
            goEdit(row){
                let name = 'traditional_Chinese_medicine_edit';
                let params = {contractId: this.per_row.contractId,name:this.per_row.name,number:this.per_row.number,idnumber:this.per_row.cardNo,id: row.id};
                if(row.areaCode){
                    params.areaCode = row.areaCode;
                }else{
                    params.areaCode = 'null';
                }
                this.$router.push({name: name, params: params});
                this.dialogFollowUpShowSelect = false;
            },
            // 删除中医药随访
            goDelete(row){
                this.$confirm('此操作将永久删除该人的本次随访, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$delete(`/tzData/${row.id}`).then((data) => {
                        if(data.status==0){
                        // 如果该页只有1个人员，那么删除该人员后，页码-1
                        if (this.tableData.length === 1 && this.pageNum >= 2) {
                            this.pageNum -= 1;
                        }
                            this.getTableList();
                            this.getper_visit();
                            this.$message.success("删除成功");
                        }
                    }).catch((data) =>{
                        console.log(data.msg);
                    })
                }).catch(() => {
                    this.$message.success("已取消删除");
                });
            },
            // 自我评估表
            goNewAbilityEvaluate(row){
                let name = 'abilityEvaluateAdd';
                let params = {contractId: row.contractId,name:row.name,number:row.number,idnumber:row.cardNo};
                this.$router.push({name: name, params: params});
            },
            // 打开居民随访查看列表
            openFollowUpShowList(row){
                this.dialogFollowUpShowSelect = true;
                this.currentYear = new Date().getFullYear();
                this.per_row = row;
                this.getper_visit(1);
            },
            // 获取某一居民所有中医药随访记录
            getper_visit(per_pageNum){
                    this.$get('/tzData/selectInfo',{
                    contractId:this.per_row.contractId,
                    code: this.value,
                    idnumber:this.per_row.cardNo,
                    pageNum:this.per_pageNum,
                    year:this.currentYear,
                }).then((data) => {
                    this.loading = false;
                    if(data.status==0){
                        this.followUpShowList=data.data.list;
                        this.per_pages=data.data.pages;
                        this.per_total=data.data.total;
                        this.per_pageSize=data.data.pageSize;
                        this.per_pageNum=data.data.pageNum;
                    }
                }).catch((data) =>{
                    console.log(data.msg);
                    this.loading = false;
                })
            },
            // 打开评估列表弹框
            showAbilityEvaluate(row){
                this.dialogAbilityEvaluate = true;
                this.abilityCurrentYear = new Date().getFullYear();
                this.ability_row = row;
                this.getAbilityEvaluate(1);
            },
            // 获取某一居民所有评估随访记录
            getAbilityEvaluate(abilityEvaluatePageNum){
                this.$get('/visitSelfCare/selectInfo',{
                contractId:this.ability_row.contractId,
                pageNum:this.abilityEvaluatePageNum,
                year:this.abilityCurrentYear,
            }).then((data) => {
                    this.loading = false;
                    if(data.status==0){
                        this.abilityEvaluateList=data.data.list;
                        this.abilityEvaluatePages=data.data.pages;
                        this.abilityEvaluateTotal=data.data.total;
                        this.abilityEvaluatePageSize=data.data.pageSize;
                        this.abilityEvaluatePageNum=data.data.pageNum;
                    }
                }).catch((data) =>{
                    console.log(data.msg);
                    this.loading = false;
                })

            },
            // 中医药切换随访年份
            yearChange(value) {
                this.currentYear = value;
                this.getper_visit();
            },
            // 自评表切换随访年份 
            yearChangeAbility(value){
                this.abilityCurrentYear = value;
                this.getAbilityEvaluate();
            },
            // 自评表删除操作
            goAbilityDelete(row){
                this.$confirm('此操作将永久删除该人的本次自评表, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$delete(`/visitSelfCare/${row.id}`).then((data) => {
                        if(data.status==0){
                        // 如果该页只有1个人员，那么删除该人员后，页码-1
                        if (this.tableData.length === 1 && this.pageNum >= 2) {
                            this.pageNum -= 1;
                        }
                            this.getTableList();
                            this.getAbilityEvaluate();
                            this.$message.success("删除成功");
                        }
                    }).catch((data) =>{
                        console.log(data.msg);
                    })
                }).catch(() => {
                    this.$message.success("已取消删除");
                });
            },
            //自评表修改页面跳转
            goAbilityEdit(row){
                let name = 'abilityEvaluateEdit';
                let params = {contractId: this.ability_row.contractId,name:this.ability_row.name,number:this.ability_row.number,idnumber:this.ability_row.cardNo,id:row.id};
                this.$router.push({name: name, params: params});
                this.dialogAbilityEvaluate = false;
            },
            //自评表查看页面跳转
            goAbilityInfo(row){
                let name = 'abilityEvaluateInfo';
                let params = {contractId: this.ability_row.contractId,name:this.ability_row.name,number:this.ability_row.number,idnumber:this.ability_row.cardNo,id:row.id};
                this.$router.push({name: name, params: params});
                this.dialogAbilityEvaluate = false;
            },
            
       
        }
    }

</script>

<style scoped>
    @import '../../../assets/common.css';
  .tap-wrap button{float: right;}
  .tap-wrap span.active{background: #2bd99f;color: #fff;border: 1px solid #2bd99f;}
  .tree-wrap{height: 529px; border: 1px solid #ebeef5; overflow-y: auto;}
  .handle-box {
      margin-bottom: 20px;
      text-align: right;
  }
  .handle-input {
      width: 300px;
      display: inline-block;
  }
</style>
