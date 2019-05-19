<template>
    <div  class="container" v-loading="loading"
    element-loading-text="请稍候..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
    >
        <div style="text-align: right">
            <router-link to="/traditional_Chinese_medicine">
                <el-button type="info">返回</el-button>
            </router-link>
            <el-button size="small" @click="doPrint">打印</el-button>
        </div>
        <div class="print">
          <div id="for_print"></div>
	        <div class="table-info">
	        	</br>
	        	<h2>老年人生活自理能力评估表</h2>
	        	<div>
		            <span>姓名:</span>
		            <label class="name-input">{{name}}</label>
		            <span>编号:</span>
		            <label class="number-input">{{number}}</label>
		        </div>
		        <table width="100%">
		        	<tr>
		        		<td colspan="2" rowspan="2" width="24%">评估事项、内容与评分</td>
		        		<td colspan="5">
		        			程度等级
		        		</td>
		        	</tr>
	            <tr>
	              <td width="14%">
	              	可自理
	              </td>
	              <td width="17%">
	              	轻度依赖
	              </td>
	              <td width="21%">
	              	中度依赖
	              </td>
	              <td width="16%">
	              	不能自理
	              </td>
                <td width="8%">
                  判断评分
                </td>
	            </tr>
              <tr>
                <td colspan="2">
                  <p class="line_one">进餐：使用餐具将饭菜送入口、咀嚼、吞咽等活动</p>
                  <p>评分</p>
                </td>
                <td>
                  <p class="line_one">独立完成</p>
                  <p>0</p>
                </td>
                <td>
                  <p class="line_one" style="line-height: 75px;text-align: center;">-----</p>
                  <p>0</p>
                </td>
                <td>
                  <p class="line_one">需要协助，如切碎、搅拌食物等</p>
                  <p>3</p>
                </td>
                <td>
                  <p class="line_one">完全需要帮助</p>
                  <p>5</p>
                </td>
                <td>
                  {{this.followUpData.meal}}
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <p class="line_two">梳洗：梳头、洗脸、刷牙、剃须、洗澡等活动</p>
                  <p>评分</p>
                </td>
                <td>
                  <p class="line_two">独立完成</p>
                  <p>0</p>
                </td>
                <td>
                  <p class="line_two">能独立地洗头、梳头、洗脸、刷牙、剃须等；洗澡需要协助</p>
                  <p>1</p>
                </td>
                <td>
                  <p class="line_two">在协助下和适当的时间内，能完成部分梳洗活动</p>
                  <p>3</p>
                </td>
                <td>
                  <p class="line_two">完全需要帮助</p>
                  <p>7</p>
                </td>
                <td>
                  {{this.followUpData.wash}}
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <p class="line_three">穿衣：穿衣裤、袜子、鞋子等活动</p>
                  <p>评分</p>
                </td>
                <td>
                  <p class="line_three">独立完成</p>
                  <p>0</p>
                </td>
                <td>
                  <p class="line_three" style="line-height: 70px;text-align: center;">-----</p>
                  <p>0</p>
                </td>
                <td>
                  <p class="line_three">需要协助，在适当的时间内完成部分穿衣</p>
                  <p>3</p>
                </td>
                <td>
                  <p class="line_three">完全需要帮助</p>
                  <p>5</p>
                </td>
                <td>
                  {{this.followUpData.dress}}
                </td>
              </tr>
	            <tr>
                <td colspan="2">
                  <p class="line_four">如厕：小便、大便等活动及自控</p>
                  <p>评分</p>
                </td>
                <td>
                  <p class="line_four">不需协助，可自控</p>
                  <p>0</p>
                </td>
                <td>
                  <p class="line_four">偶尔失禁，但基本上能如厕或使用便具</p>
                  <p>1</p>
                </td>
                <td>
                  <p class="line_four">经常失禁，在很多提示和协助下尚能如厕或使用便具</p>
                  <p>5</p>
                </td>
                <td>
                  <p class="line_four">完全失禁，完全需要帮助</p>
                  <p>10</p>
                </td>
                <td>
                  {{this.followUpData.toilet}}
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <p class="line_five">活动：站立、室内行走、上下楼梯、户外活动</p>
                  <p>评分</p>
                </td>
                <td>
                  <p class="line_five">独立完成所有活动</p>
                  <p>0</p>
                </td>
                <td>
                  <p class="line_five">借助较小的外力或辅助装置能完成站立、行走、上下楼梯等</p>
                  <p>1</p>
                </td>
                <td>
                  <p class="line_five">借助较大的外力才能完成站立、行走，不能上下楼梯</p>
                  <p>5</p>
                </td>
                <td>
                  <p class="line_five">卧床不起，活动完全需要帮助</p>
                  <p>10</p>
                </td>
                <td>
                  {{this.followUpData.activity}}
                </td>
              </tr>
              <tr>
                <td colspan="2"><p class="line_six">评估结果</p></td>
                <td colspan="2">
                  {{this.followUpData.conclusion}}
                </td>
                <td><p class="line_six">总得分</p></td>
                <td colspan="2">
                  {{this.followUpData.score}}
                </td>
              </tr>
	        </table>
	    		</div>
	    	</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            		name:this.$route.params.name,//姓名
                number:this.$route.params.number,//编号
                loading:false,
                followUpData:[{},{},{},{}],//随访数据
            }
        },
        mounted() {
            this.initialiseData();
        },
        watch: {
            // 监测 route 参数变化
            '$route' (to, from) {
                this.initialiseData();
            }
        },
        methods: {
            initialiseData() {
                let route = this.$route.name;
                this.getInfo();
            },

            //修改时获取数据
            getInfo() {
                this.loading = true;
                this.$get('/visitSelfCare/selectDetail', {
                    id: this.$route.params.id,
                }).then((data) => {
                    if (data.status == 0) {
                        this.followUpData = data.data;
                        
                        
                    }
                    this.loading = false;
                }).catch((data) =>{
                    this.loading = false;
                    console.log(data.msg);
                })
            },

            doPrint() {
							document.body.style.overflow = "auto";
              document.body.style.height = "auto";
              document.getElementById("for_print").style.display = 'block';
							var prnhtml = document.getElementsByClassName('print')[0].innerHTML;
							window.document.body.innerHTML = prnhtml;
							window.print();
							window.location.reload();
						}
        }
    }
</script>

<style scoped>
    @import '../../../assets/common.css';

    .name-input {
		    width: 100px;
		    font-size: 16px;
		    margin-left: 5px;
		    margin-bottom: 5px;
		    border: none;
		    border-bottom: 1px solid #999;
		    outline: 0;
		    background: #fff;
		    margin-right: 12px;
		    display: inline-block;
		}
		.number-input {
		    width: 200px;
		    font-size: 16px;
		    margin-left: 5px;
		    margin-bottom: 5px;
		    border: none;
		    border-bottom: 1px solid #999;
		    outline: 0;
		    background: #fff;
		    margin-right: 12px;
		    display: inline-block;
		}

	  .table-info {
		    width: 600px;
		    margin: 0 auto;
		    color: #333;
		}
	
		.table-info h2 {
		    text-align: center;
		    font-size: 20px;
		    font-weight: 500;
		    margin-bottom: 10px;
		}
		
		.table-info table {
		    width: 100%;
		    border-collapse: collapse;
		}
		
		.table-info table td {
		    border: 1px solid #999;
		    padding: 3px 2px;
		    font-size: 12px;
		    text-align: center;
		}
    .short-input {
        width: 80px;
        height: 20px;
        margin: 6px;
    }

    .long-input {
        min-width: 150px;
        height: 20px;
        margin: 6px;
    }
    .count-span {
		    min-width: 20px;
		    display: inline-block;
		    border: none;
		    outline: 0;
		    border-bottom: 1px solid #999;
		    margin-left: 1px;
		    margin-right: 1px;
		    background: #fff;
		    vertical-align: bottom;
		    text-align: center;
		}
		.result-span {
		    width: 14px;
		    height: 14px;
		    line-height: 14px;
		    float: right;
		    text-align: center;
		    border: 1px solid #000000;
		    background: #fff;
		}
		.result-span-list {
		    display: inline-block;
		    width: 12px;
		    height: 12px;
		    line-height: 12px;
		    text-align: center;
		    border: 1px solid #000000;
		    background: #fff;
		    vertical-align: top;
		}
		.result-span-list-wrap{float: right;}
		@page{
			margin:0;
		}
    .line_one{
      height: 75px;
      line-height: 24px;
      text-align: left;
      padding-left: 10px;
      padding-right: 4px;
      font-size: 13px;
    }
    .line_two{
      height: 120px;
      line-height: 24px;
      text-align: left;
      padding-left: 10px;
      padding-right: 4px;
      font-size: 13px;
    }
    .line_three{
      height: 70px;
      line-height: 24px;
      text-align: left;
      padding-left: 10px;
      padding-right: 4px;
      font-size: 13px;
    }
    .line_four{
      height: 80px;
      line-height: 24px;
      text-align: left;
      padding-left: 10px;
      padding-right: 4px;
      font-size: 13px;
    }
    .line_five{
      height: 120px;
      line-height: 24px;
      text-align: left;
      padding-left: 10px;
      padding-right: 4px;
      font-size: 13px;
    }
    .line_six{
      height: 30px;
      line-height: 30px;
      font-size: 13px;
    }
    .print{
      font-size: 13px;
    }
    #for_print{
      height: 130px;
      display: none;
    }
</style>
