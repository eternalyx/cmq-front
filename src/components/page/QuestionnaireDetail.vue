<template>
  <div class="container" v-loading="loading"
       element-loading-text="请稍候..."
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <div style="text-align: right">
      <el-button @click="editQuestionnaire">编辑</el-button>
      <router-link to="/questionnaireform">
        <el-button type="info">返回</el-button>
      </router-link>
      <el-button @click="doPrint">打印</el-button>
    </div>
    <div class="print">
      <div class="table-info">
        <h1 align="center" style="margin-top: 10px">老年人中医药健康管理服务记录表</h1>
        <div>
          <!--<span class="span-style">地址:</span>-->
          <!--<label>{{visitData.address}}</label>-->
          <!--<br>-->
          <span class="span-style">姓名:</span>
          <label class="span-style">{{visitData.residentName}}</label>
          <br>
          <span class="span-style">性别:</span>
          <label class="span-style">{{visitData.sex}}</label>
          <br>
          <span class="span-style">出生日期:</span>
          <label class="">{{visitData.birthdayStr}}</label>
          <br>
          <span class="span-style">年龄:</span>
          <label class="span-style">{{visitData.age}}</label>
          <br>
          <span class="span-style">身份证号:</span>
          <label class="span-style">{{visitData.idCardNumber}}</label>
          <br>
          <span class="span-style">联系电话:</span>
          <label class="">{{visitData.residentPhone}}</label>
          <br>
          <span class="span-style">建档日期:</span>
          <label class="">{{visitData.date}}</label>
          <br>
          <span class="span-style">测试日期:</span>
          <label class="">{{visitData.date}}</label>
          <br>
          <span class="span-style">家庭地址:</span>
          <label class="">{{visitData.address}}</label>
        </div>

        <table id="result-table">
          <tr>
            <td style="width: 10%;">体质类型</td>
            <td style="width: 10%;">气虚</td>
            <td style="width: 10%;">阳虚</td>
            <td style="width: 10%;">阴虚</td>
            <td style="width: 10%;">痰湿</td>
            <td style="width: 10%;">湿热</td>
            <td style="width: 10%;">血瘀</td>
            <td style="width: 10%;">气郁</td>
            <td style="width: 10%;">特禀</td>
            <td style="width: 10%;">平和</td>
          </tr>

          <tr>
            <td style="width: 10%;">测试结果</td>
            <td style="width: 10%;">{{visitData.qixuJ}}</td>
            <td style="width: 10%;">{{visitData.yangxuJ}}</td>
            <td style="width: 10%;">{{visitData.yinxuJ}}</td>
            <td style="width: 10%;">{{visitData.tanshiJ}}</td>
            <td style="width: 10%;">{{visitData.shireJ}}</td>
            <td style="width: 10%;">{{visitData.xueyuJ}}</td>
            <td style="width: 10%;">{{visitData.qixuJ}}</td>
            <td style="width: 10%;">{{visitData.tebingJ}}</td>
            <td style="width: 10%;">{{visitData.pingheJ}}</td>
          </tr>
        </table>

        <div class="mySchart">
          <schart :canvasId="canvasId"
                  :type="type"
                  :width="width"
                  :height="height"
                  :data="data"
                  :options="options"
          ></schart>
        </div>

        <div class="pageBreak"></div>
        <h1 align="center" style="margin-top: 30px">中医药健康教育保健处方</h1>
        <h3>建议：</h3>
        <!-- v-html标签 -->
        <label v-html="visitData.advice">{{visitData.advice}}</label>

        <br><br>
        <h3>其它建议：</h3>
        <label v-html="visitData.otherAdvice">{{visitData.otherAdvice}}</label>

        <br><br><br>
        <h3>医师：{{visitData.op}}&nbsp;&nbsp;&nbsp;&nbsp;患者签字：</h3>

        <br>
        <h3>联系地址：{{visitData.doctorAddress}}</h3>

        <br>
        <h3>联系电话：{{visitData.doctorPhone}}</h3>

        <!-- 打印分页 -->
        <div class="pageBreak"/>
        <table width="100%" style="margin-top: 50px">
          <tr>
            <td colspan="5" style="width:50%;text-align: left">&nbsp;&nbsp;&nbsp;请根据近一年的体验和感觉，回答以下问题。</td>
            <td style="width:10%">没有<br>(根本不/从来没有)</td>
            <td style="width:10%">很少<br>(有一点/偶尔)</td>
            <td style="width:10%">有时<br>(有些/少数时间)</td>
            <td style="width:10%">经常<br>(相当/多数时间)</td>
            <td style="width:10%">总是<br>(非常/每天)</td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left;">(1)您精力充沛吗？(指精神头足，乐于做事)</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c1===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(2)您容易疲乏吗？(指体力如何，是否稍微活动一下或做一点家务劳动就感到累)</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c2===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(3)您容易气短，呼吸短促，接不上气吗？</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c3===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(4)您说话声音低弱无力吗？(指说话没有力气)</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c4===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(5)您感到闷闷不乐，情绪低沉吗？(指心情不愉快，情绪低落)</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c5===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(6)您容易精神紧张，焦虑不安吗？(指遇事是否心情紧张)</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c6===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(7)您因为生活状态改变而感到孤独，失落吗？</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c7===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(8)您容易感到害怕或受到惊吓吗？</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c8===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(9)您感到身体超重不轻松吗？(感到身体沉重)[BMI指数=体重(kg)/身高²(m)]</td>
            <td style="position:relative;"><span v-bind:class="[visitData.c9===1 ?  className:'']">1</span><span><br>(BMI<24)</span>
            </td>
            <td style="position:relative;"><span v-bind:class="[visitData.c9===2 ?  className:'']">2</span><span><br>(24<=BMI<25)</span>
            </td>
            <td style="position:relative;"><span v-bind:class="[visitData.c9===3 ?  className:'']">3</span><span><br>(25<=BMI<26)</span>
            </td>
            <td style="position:relative;"><span v-bind:class="[visitData.c9===4 ?  className:'']">4</span><span><br>(26<=BMI<28)</span>
            </td>
            <td style="position:relative;"><span v-bind:class="[visitData.c9===5 ?  className:'']">5</span><span><br>(BMI>=28)</span>
            </td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(10)您眼睛干涩吗？</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c10===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(11)您手脚发凉吗？(不包含因周围温度低或穿的少导致的手脚发冷)</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c11===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(12)您胃脘部、背部或腰膝部怕冷吗？(指上腹部、背部、腰部或膝关节等，有一处或多处怕冷)</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c12===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(13)您比一般人耐受不了寒冷吗？(指比别人容易害怕冬天或是夏天的冷空调、电扇等)</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c13===item ?  className:'']">{{item}}</span></td>
          </tr>
        </table>
        <div class="pageBreak"></div>
        <table width="100%" style="margin-top:50px;">
          <tr>
            <td colspan="5" style="text-align: left;width:50%;">(14)您容易患感冒吗？(指每年感冒的次数)</td>
            <td style="position:relative;width:10%;"><span
              v-bind:class="[visitData.c14===1 ?  className:'']">1</span><span><br>一年<2次</span></td>
            <td style="position:relative;width:10%;"><span
              v-bind:class="[visitData.c14===2 ?  className:'']">2</span><span><br>一年感冒2-4次</span></td>
            <td style="position:relative;width:10%;"><span
              v-bind:class="[visitData.c14===3 ?  className:'']">3</span><span><br>一年感冒5-6次</span></td>
            <td style="position:relative;width:10%;"><span
              v-bind:class="[visitData.c14===4 ?  className:'']">4</span><span><br>一年8次以上</span></td>
            <td style="position:relative;width:10%;"><span
              v-bind:class="[visitData.c14===5 ?  className:'']">5</span><span><br>几乎每月</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(15)您没有感冒时也会鼻塞、流鼻涕吗？</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c15===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(16)您有口粘口腻，或睡眠打鼾吗？</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c16===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(17)您容易过敏(对药物、食物、气味、花粉或在季节交替、气候变化时)吗？(指每年感冒的次数)</td>
            <td style="position:relative;"><span v-bind:class="[visitData.c17===1 ?  className:'']">1</span><span><br>从来没有</span>
            </td>
            <td style="position:relative;"><span v-bind:class="[visitData.c17===2 ?  className:'']">2</span><span><br>一年1、2次</span>
            </td>
            <td style="position:relative;"><span v-bind:class="[visitData.c17===3 ?  className:'']">3</span><span><br>一年3、4次</span>
            </td>
            <td style="position:relative;"><span v-bind:class="[visitData.c17===4 ?  className:'']">4</span><span><br>一年5、6次</span>
            </td>
            <td style="position:relative;"><span v-bind:class="[visitData.c17===5 ?  className:'']">5</span><span><br>每次遇到上述原因都过敏</span>
            </td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(18)您的皮肤容易起荨麻疹吗？(包括风团、风疹块、风疙瘩)</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c18===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(19)您的皮肤在不知不觉中会出现青紫瘀斑、皮下出血吗？(指皮肤在没有外伤的情况下出现青一块紫一块的情况)</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c19===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(20)您的皮肤一抓就红，并出现抓痕吗？(指被指甲或钝物划过后皮肤的反应)</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c20===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(21)您皮肤或口唇干吗？</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c21===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(22)您有肢体麻木或固定部位疼痛的感觉吗？</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c22===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(23)您面部或鼻部有油腻感或者油亮发光吗？(指脸上或鼻子)</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c23===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(24)您面色或目眶晦黯，或出现褐色斑块/斑点吗？</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c24===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(25)您有皮肤湿疹、疮疖吗？</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c25===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(26)您感到口干咽燥、总想喝水吗？</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c26===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(27)您感到口苦或嘴里有异味吗？(指口苦或口臭)</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c27===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(28)您腹部肥大吗？(指腹部脂肪肥厚)</td>
            <td style="position:relative;"><span v-bind:class="[visitData.c28===1 ?  className:'']">1</span><span><br>(腹围<80cm,相当于2.4尺)</span>
            </td>
            <td style="position:relative;"><span v-bind:class="[visitData.c28===2 ?  className:'']">2</span><span><br>(腹围80-85cm,2.4-2.55尺)</span>
            </td>
            <td style="position:relative;"><span v-bind:class="[visitData.c28===3 ?  className:'']">3</span><span><br>(腹围86-90cm,2.56-2.7尺)</span>
            </td>
            <td style="position:relative;"><span v-bind:class="[visitData.c28===4 ?  className:'']">4</span><span><br>(腹围1-105cm,2.71-3.15尺)</span>
            </td>
            <td style="position:relative;"><span v-bind:class="[visitData.c28===5 ?  className:'']">5</span><span><br>(腹围>105cm或3.15尺)</span>
            </td>
          </tr>
        </table>
        <div class="pageBreak"></div>
        <table width="100%" style="margin-top:50px;">
          <tr>
            <td colspan="5" style="text-align: left;width:50%;">
              (29)您吃(喝)凉的东西会感到不舒服或者怕吃(喝)凉的东西吗？(指不喜欢吃凉的食物，或吃了凉的食物后会不舒服)
            </td>
            <td style="position:relative;width:10%;" v-for="item in answer"><span
              v-bind:class="[visitData.c29===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(30)您有大便粘滞不爽、解不尽的感觉吗？(大便容易粘在马桶或便坑壁上)</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c30===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(31)您容易大便干燥吗？</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c31===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(32)您舌苔厚腻或有舌苔厚厚的感觉吗？(如果自我感觉不清楚可由调查院观察后填写)</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c32===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left">(33)您舌下静脉瘀紫或增粗吗？(可有调查员辅助观察后填写)</td>
            <td style="position:relative;" v-for="item in answer"><span
              v-bind:class="[visitData.c33===item ?  className:'']">{{item}}</span></td>
          </tr>
          <tr>
            <td style="width:6%"><span>体质类型</span></td>
            <td style="width:11%"><span>气虚质</span></td>
            <td style="width:11%"><span>阳虚质</span></td>
            <td style="width:11%"><span>阴虚质</span></td>
            <td style="width:11%"><span>痰湿质</span></td>
            <td style="width:10%"><span>湿热质</span></td>
            <td style="width:10%"><span>血瘀质</span></td>
            <td style="width:10%"><span>气郁质</span></td>
            <td style="width:10%"><span>特禀质</span></td>
            <td style="width:10%"><span>平和质</span></td>
          </tr>
          <tr>
            <td><span>体质辨别</span></td>
            <td style="text-align:left"><span><span class="table_three">1.</span>得分<span class="count-span">{{visitData.qixu}}</span><br><span
              v-bind:class="[visitData.qixuJ==='是' ?  judgeName:'table_three']">2.</span>是<br><span
              v-bind:class="[visitData.qixuJ==='倾向是' ?  judgeName:'table_three']">3.</span>倾向是</span></td>
            <td style="text-align:left"><span><span class="table_three">1.</span>得分<span class="count-span">{{visitData.yangxu}}</span><br><span
              v-bind:class="[visitData.yangxuJ==='是' ?  judgeName:'table_three']">2.</span>是<br><span
              v-bind:class="[visitData.yangxuJ==='倾向是' ?  judgeName:'table_three']">3.</span>倾向是</span></td>
            <td style="text-align:left"><span><span class="table_three">1.</span>得分<span class="count-span">{{visitData.yinxu}}</span><br><span
              v-bind:class="[visitData.yinxuJ==='是' ?  judgeName:'table_three']">2.</span>是<br><span
              v-bind:class="[visitData.yinxuJ==='倾向是' ?  judgeName:'table_three']">3.</span>倾向是</span></td>
            <td style="text-align:left"><span><span class="table_three">1.</span>得分<span class="count-span">{{visitData.tanshi}}</span><br><span
              v-bind:class="[visitData.tanshiJ==='是' ?  judgeName:'table_three']">2.</span>是<br><span
              v-bind:class="[visitData.tanshiJ==='倾向是' ?  judgeName:'table_three']">3.</span>倾向是</span></td>
            <td style="text-align:left"><span><span class="table_three">1.</span>得分<span class="count-span">{{visitData.shire}}</span><br><span
              v-bind:class="[visitData.shireJ==='是' ?  judgeName:'table_three']">2.</span>是<br><span
              v-bind:class="[visitData.shireJ==='倾向是' ?  judgeName:'table_three']">3.</span>倾向是</span></td>
            <td style="text-align:left"><span><span class="table_three">1.</span>得分<span class="count-span">{{visitData.xueyu}}</span><br><span
              v-bind:class="[visitData.xueyuJ==='是' ?  judgeName:'table_three']">2.</span>是<br><span
              v-bind:class="[visitData.xueyuJ==='倾向是' ?  judgeName:'table_three']">3.</span>倾向是</span></td>
            <td style="text-align:left"><span><span class="table_three">1.</span>得分<span class="count-span">{{visitData.qiyu}}</span><br><span
              v-bind:class="[visitData.qiyuJ==='是' ?  judgeName:'table_three']">2.</span>是<br><span
              v-bind:class="[visitData.qiyuJ==='倾向是' ?  judgeName:'table_three']">3.</span>倾向是</span></td>
            <td style="text-align:left"><span><span class="table_three">1.</span>得分<span class="count-span">{{visitData.tebing}}</span><br><span
              v-bind:class="[visitData.tebingJ==='是' ?  judgeName:'table_three']">2.</span>是<br><span
              v-bind:class="[visitData.tebingJ==='倾向是' ?  judgeName:'table_three']">3.</span>倾向是</span></td>
            <td style="text-align:left"><span><span class="table_three">1.</span>得分<span class="count-span">{{visitData.pinghe}}</span><br><span
              v-bind:class="[visitData.pingheJ==='是' ?  judgeName:'table_three']">2.</span>是<br><span
              v-bind:class="[visitData.pingheJ==='倾向是' ?  judgeName:'table_three']">3.</span>倾向是</span></td>
          </tr>
          <tr>
            <td><span>中医药保健指导</span></td>
            <td style="text-align:left;vertical-align: top;"><span><span
              v-bind:class="[qixuGuidance.includes('1') ?  judgeName:'table_three']">1.</span>情志调摄<br><span
              v-bind:class="[qixuGuidance.includes('2') ?  judgeName:'table_three']">2.</span>饮食调养<br><span
              v-bind:class="[qixuGuidance.includes('3') ?  judgeName:'table_three']">3.</span>起居调摄<br><span
              v-bind:class="[qixuGuidance.includes('4') ?  judgeName:'table_three']">4.</span>运动保健<br><span
              v-bind:class="[qixuGuidance.includes('5') ?  judgeName:'table_three']">5.</span>穴位保健<br><span
              v-bind:class="[qixuGuidance.includes('6') ?  judgeName:'table_three']">6.</span>其他:<br><span
              style="margin-left:10px;">{{visitData.qixuOther}}</span></span></td>
            <td style="text-align:left;vertical-align: top;"><span><span
              v-bind:class="[yangxuGuidance.includes('1') ?  judgeName:'table_three']">1.</span>情志调摄<br><span
              v-bind:class="[yangxuGuidance.includes('2') ?  judgeName:'table_three']">2.</span>饮食调养<br><span
              v-bind:class="[yangxuGuidance.includes('3') ?  judgeName:'table_three']">3.</span>起居调摄<br><span
              v-bind:class="[yangxuGuidance.includes('4') ?  judgeName:'table_three']">4.</span>运动保健<br><span
              v-bind:class="[yangxuGuidance.includes('5') ?  judgeName:'table_three']">5.</span>穴位保健<br><span
              v-bind:class="[yangxuGuidance.includes('6') ?  judgeName:'table_three']">6.</span>其他:<br><span
              style="margin-left:10px;">{{visitData.yangxuOther}}</span></span></td>
            <td style="text-align:left;vertical-align: top;"><span><span
              v-bind:class="[yinxuGuidance.includes('1') ?  judgeName:'table_three']">1.</span>情志调摄<br><span
              v-bind:class="[yinxuGuidance.includes('2') ?  judgeName:'table_three']">2.</span>饮食调养<br><span
              v-bind:class="[yinxuGuidance.includes('3') ?  judgeName:'table_three']">3.</span>起居调摄<br><span
              v-bind:class="[yinxuGuidance.includes('4') ?  judgeName:'table_three']">4.</span>运动保健<br><span
              v-bind:class="[yinxuGuidance.includes('5') ?  judgeName:'table_three']">5.</span>穴位保健<br><span
              v-bind:class="[yinxuGuidance.includes('6') ?  judgeName:'table_three']">6.</span>其他:<br><span
              style="margin-left:10px;">{{visitData.yinxuOther}}</span></span></td>
            <td style="text-align:left;vertical-align: top;"><span><span
              v-bind:class="[tanshiGuidance.includes('1') ?  judgeName:'table_three']">1.</span>情志调摄<br><span
              v-bind:class="[tanshiGuidance.includes('2') ?  judgeName:'table_three']">2.</span>饮食调养<br><span
              v-bind:class="[tanshiGuidance.includes('3') ?  judgeName:'table_three']">3.</span>起居调摄<br><span
              v-bind:class="[tanshiGuidance.includes('4') ?  judgeName:'table_three']">4.</span>运动保健<br><span
              v-bind:class="[tanshiGuidance.includes('5') ?  judgeName:'table_three']">5.</span>穴位保健<br><span
              v-bind:class="[tanshiGuidance.includes('6') ?  judgeName:'table_three']">6.</span>其他:<br><span
              style="margin-left:10px;">{{visitData.tanshiOther}}</span></span></td>
            <td style="text-align:left;vertical-align: top;"><span><span
              v-bind:class="[shireGuidance.includes('1') ?  judgeName:'table_three']">1.</span>情志调摄<br><span
              v-bind:class="[shireGuidance.includes('2') ?  judgeName:'table_three']">2.</span>饮食调养<br><span
              v-bind:class="[shireGuidance.includes('3') ?  judgeName:'table_three']">3.</span>起居调摄<br><span
              v-bind:class="[shireGuidance.includes('4') ?  judgeName:'table_three']">4.</span>运动保健<br><span
              v-bind:class="[shireGuidance.includes('5') ?  judgeName:'table_three']">5.</span>穴位保健<br><span
              v-bind:class="[shireGuidance.includes('6') ?  judgeName:'table_three']">6.</span>其他:<br><span
              style="margin-left:10px;">{{visitData.shireOther}}</span></span></td>
            <td style="text-align:left;vertical-align: top;"><span><span
              v-bind:class="[xueyuGuidance.includes('1') ?  judgeName:'table_three']">1.</span>情志调摄<br><span
              v-bind:class="[xueyuGuidance.includes('2') ?  judgeName:'table_three']">2.</span>饮食调养<br><span
              v-bind:class="[xueyuGuidance.includes('3') ?  judgeName:'table_three']">3.</span>起居调摄<br><span
              v-bind:class="[xueyuGuidance.includes('4') ?  judgeName:'table_three']">4.</span>运动保健<br><span
              v-bind:class="[xueyuGuidance.includes('5') ?  judgeName:'table_three']">5.</span>穴位保健<br><span
              v-bind:class="[xueyuGuidance.includes('6') ?  judgeName:'table_three']">6.</span>其他:<br><span
              style="margin-left:10px;">{{visitData.xueyuOther}}</span></span></td>
            <td style="text-align:left;vertical-align: top;"><span><span
              v-bind:class="[qiyuGuidance.includes('1') ?  judgeName:'table_three']">1.</span>情志调摄<br><span
              v-bind:class="[qiyuGuidance.includes('2') ?  judgeName:'table_three']">2.</span>饮食调养<br><span
              v-bind:class="[qiyuGuidance.includes('3') ?  judgeName:'table_three']">3.</span>起居调摄<br><span
              v-bind:class="[qiyuGuidance.includes('4') ?  judgeName:'table_three']">4.</span>运动保健<br><span
              v-bind:class="[qiyuGuidance.includes('5') ?  judgeName:'table_three']">5.</span>穴位保健<br><span
              v-bind:class="[qiyuGuidance.includes('6') ?  judgeName:'table_three']">6.</span>其他:<br><span
              style="margin-left:10px;">{{visitData.qiyuOther}}</span></span></td>
            <td style="text-align:left;vertical-align: top;"><span><span
              v-bind:class="[tebingGuidance.includes('1') ?  judgeName:'table_three']">1.</span>情志调摄<br><span
              v-bind:class="[tebingGuidance.includes('2') ?  judgeName:'table_three']">2.</span>饮食调养<br><span
              v-bind:class="[tebingGuidance.includes('3') ?  judgeName:'table_three']">3.</span>起居调摄<br><span
              v-bind:class="[tebingGuidance.includes('4') ?  judgeName:'table_three']">4.</span>运动保健<br><span
              v-bind:class="[tebingGuidance.includes('5') ?  judgeName:'table_three']">5.</span>穴位保健<br><span
              v-bind:class="[tebingGuidance.includes('6') ?  judgeName:'table_three']">6.</span>其他:<br><span
              style="margin-left:10px;">{{visitData.tebingOther}}</span></span></td>
            <td style="text-align:left;vertical-align: top;"><span><span
              v-bind:class="[pingheGuidance.includes('1') ?  judgeName:'table_three']">1.</span>情志调摄<br><span
              v-bind:class="[pingheGuidance.includes('2') ?  judgeName:'table_three']">2.</span>饮食调养<br><span
              v-bind:class="[pingheGuidance.includes('3') ?  judgeName:'table_three']">3.</span>起居调摄<br><span
              v-bind:class="[pingheGuidance.includes('4') ?  judgeName:'table_three']">4.</span>运动保健<br><span
              v-bind:class="[pingheGuidance.includes('5') ?  judgeName:'table_three']">5.</span>穴位保健<br><span
              v-bind:class="[pingheGuidance.includes('6') ?  judgeName:'table_three']">6.</span>其他:<br><span
              style="margin-left:10px;">{{visitData.pingheOther}}</span></span></td>
          </tr>
          <tr>
            <td colspan="2"><span>填表日期</span></td>
            <td colspan="3">{{visitData.date}}</td>
            <td colspan="2"><span>医生签名</span></td>
            <td colspan="3">{{visitData.op}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  const header = {token: localStorage.getItem('cmq_token')};

  import {formatDate} from "../../common/js/date";
  import Schart from 'vue-schart';

  export default {
    data() {
      return {
        id: null,
        loading: false,
        visitData: {},
        answer: [1, 2, 3, 4, 5],
        qixuGuidance: [],
        yangxuGuidance: [],
        yinxuGuidance: [],
        tanshiGuidance: [],
        shireGuidance: [],
        xueyuGuidance: [],
        qiyuGuidance: [],
        tebingGuidance: [],
        pingheGuidance: [],
        className: "mark_circle",
        judgeName: "mark_judge",
        //柱状图属性
        canvasId: 'myCanvas',
        type: 'bar',
        width: '500px',
        height: '100px',
        data: [],
        options: {
          title: ''
        }
      }
    },
    mounted() {
      this.getTableList();
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      Schart
    },
    methods: {
      // 获取列表数据
      getTableList() {
        this.$http.get('/api/web-questionnaire/detail?questionnaireId=' + this.$route.query.id, {headers: header}).then(response => {
          this.loading = false;
          if (response.body.code === '200') {
            this.visitData = response.body.data.detail;
            if (this.visitData.qixuGuidance) {
              this.qixuGuidance = (this.visitData.qixuGuidance);
            }
            if (this.visitData.yangxuGuidance) {
              this.yangxuGuidance = this.visitData.yangxuGuidance;
            }
            if (this.visitData.yinxuGuidance) {
              this.yinxuGuidance = this.visitData.yinxuGuidance;
            }
            if (this.visitData.tanshiGuidance) {
              this.tanshiGuidance = (this.visitData.tanshiGuidance);
            }
            if (this.visitData.shireGuidance) {
              this.shireGuidance = (this.visitData.shireGuidance);
            }
            if (this.visitData.xueyuGuidance) {
              this.xueyuGuidance = (this.visitData.xueyuGuidance);
            }
            if (this.visitData.qiyuGuidance) {
              this.qiyuGuidance = (this.visitData.qiyuGuidance);
            }
            if (this.visitData.tebingGuidance) {
              this.tebingGuidance = (this.visitData.tebingGuidance);
            }
            if (this.visitData.pingheGuidance) {
              this.pingheGuidance = (this.visitData.pingheGuidance);
            }


            this.data = [
              {name: "气虚", value: this.visitData.qixu},
              {name: "阳虚", value: this.visitData.yangxu},
              {name: "阴虚", value: this.visitData.yinxu},
              {name: "痰湿", value: this.visitData.tanshi},
              {name: "湿热", value: this.visitData.shire},
              {name: "血瘀", value: this.visitData.xueyu},
              {name: "气郁", value: this.visitData.qiyu},
              {name: "特禀", value: this.visitData.tebing},
              {name: "平和", value: this.visitData.pinghe}
            ];
          }
        }).catch((data) => {
          this.loading = false;
        })
      },

      editQuestionnaire() {
        this.$router.push({
          path: '/editQuestionnaire',
          query: {
            id: this.$route.query.id
          }
        });
      },

      doPrint() {
        document.body.style.overflow = "auto";
        document.body.style.height = "auto";
        var prnhtml = document.getElementsByClassName('print')[0].innerHTML;
        //innerHTML 无法获取非html元素，需用selector手动获取后，再用方法after append
        var canvas = document.getElementById("myCanvas");
        canvas.style="width:888px;height:150px";
        window.document.body.innerHTML = prnhtml;
        var styleEl = document.createElement('style');
        styleEl.innerHTML =
          `@media print{
					.pageBreak{
							page-break-after:always;
					}
					@page{
						margin:0;
						size: landscape;
					}
				} `;

        window.document.body.appendChild(styleEl);
        document.getElementById("result-table").after(canvas);
        window.print();
        window.location.reload();
      }
    }
  }
</script>

<style scoped>
  @import '../../assets/common.css';

  .span-style {
    font-size: 15px;
    margin-left: 50px;
  }

  .name-input {
    width: 100px;
    font-size: 25px;
    margin-left: 5px;
    margin-bottom: 5px;
    border: none;
    #border-bottom: 1px solid #999;
    outline: 0;
    background: #fff;
    margin-right: 12px;
    display: inline-block;
  }

  .number-input {
    width: 200px;
    font-size: 25px;
    margin-left: 5px;
    margin-bottom: 5px;
    border: none;
    #border-bottom: 1px solid #999;
    outline: 0;
    background: #fff;
    margin-right: 12px;
    display: inline-block;
  }

  .table-info {
    width: 950px;
    margin: 0 auto;
    color: #333;
    margin-top: 40px;
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
    height: 37px;
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

  .table_three {
    display: inline-block;
    width: 15px;
    height: 15px;
    line-height: 15px;
    text-align: center;
  }

</style>
