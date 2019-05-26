<template>
    <div  class="container" v-loading="loading"
    element-loading-text="请稍候..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
    >
        <div style="text-align: right">
            <router-link to="/questionnaireform">
                <el-button type="info">取消</el-button>
            </router-link>
        </div>
        <div>
            <span>姓名:</span>
            <input v-model.trim="visitData.residentName" class="name-input" type="text" :disabled="isCreate"/>
            <span>性别:</span>
            <input v-model.trim="visitData.sex" class="name-input" type="text" :disable="isCreate"/>
            <span>生日:</span>
            <el-date-picker v-model="visitData.birthday" type="date" :disable="isCreate"/>
            <span>身份证号:</span>
            <input v-model.trim="visitData.idCardNumber" class="number-input" type="text" :disable="isCreate"/>
            <span>地址:</span>
            <input v-model.trim="visitData.address" class="name-input" type="text" :disable="isCreate"/>
        </div>
        <table width="100%" class="table_radio" style="table-layout:fixed;white-space:normal;word-break:break-all;word-wrap:break-word;">
            <tr>
                <td colspan="5">请根据近一年的体验和感觉，回答以下问题。</td>
                <td style="width:11%">没有(根本不/从来没有)</td>
                <td style="width:12%">很少(有一点/偶尔)</td>
                <td style="width:11%">有时(有些/少数时间)</td>
                <td style="width:11%">经常(相当/多数时间)</td>
                <td style="width:11%">总是(非常/每天)</td>
            </tr>
            <tr>
                <td colspan="5">(1)您精力充沛吗？(指精神头足，乐于做事)</td>
                <td><el-radio v-model="visitData.c1" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c1" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c1" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c1" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c1" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(2)您容易疲乏吗？(指体力如何，是否稍微活动一下或做一点家务劳动就感到累)</td>
                <td><el-radio v-model="visitData.c2" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c2" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c2" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c2" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c2" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(3)您容易气短，呼吸短促，接不上气吗？</td>
                <td><el-radio v-model="visitData.c3" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c3" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c3" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c3" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c3" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(4)您说话声音低弱无力吗？(指说话没有力气)</td>
                <td><el-radio v-model="visitData.c4" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c4" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c4" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c4" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c4" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(5)您感到闷闷不乐，情绪低沉吗？(指心情不愉快，情绪低落)</td>
                <td><el-radio v-model="visitData.c5" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c5" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c5" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c5" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c5" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(6)您容易精神紧张，焦虑不安吗？(指遇事是否心情紧张)</td>
                <td><el-radio v-model="visitData.c6" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c6" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c6" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c6" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c6" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(7)您因为生活状态改变而感到孤独，失落吗？</td>
                <td><el-radio v-model="visitData.c7" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c7" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c7" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c7" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c7" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(8)您容易感到害怕或受到惊吓吗？</td>
                <td><el-radio v-model="visitData.c8" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c8" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c8" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c8" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c8" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(9)您感到身体超重不轻松吗？(感到身体沉重)[BMI指数=体重(kg)/身高²(m)]</td>
                <td><el-radio v-model="visitData.c9" :label="1">1<span>(BMI<24)</span></el-radio></td>
                <td><el-radio v-model="visitData.c9" :label="2">2<span>(24<=BMI<25)</span></el-radio></td>
                <td><el-radio v-model="visitData.c9" :label="3">3<span>(25<=BMI<26)</span></el-radio></td>
                <td><el-radio v-model="visitData.c9" :label="4">4<span>(26<=BMI<28)</span></el-radio></td>
                <td><el-radio v-model="visitData.c9" :label="5">5<span>(BMI>=28)</span></el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(10)您眼睛干涩吗？</td>
                <td><el-radio v-model="visitData.c10" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c10" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c10" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c10" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c10" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(11)您手脚发凉吗？(不包含因周围温度低或穿的少导致的手脚发冷)</td>
                <td><el-radio v-model="visitData.c11" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c11" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c11" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c11" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c11" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(12)您胃脘部、背部或腰膝部怕冷吗？(指上腹部、背部、腰部或膝关节等，有一处或多处怕冷)</td>
                <td><el-radio v-model="visitData.c12" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c12" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c12" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c12" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c12" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(13)您比一般人耐受不了寒冷吗？(指比别人容易害怕冬天或是夏天的冷空调、电扇等)</td>
                <td><el-radio v-model="visitData.c13" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c13" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c13" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c13" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c13" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(14)您容易患感冒吗？(指每年感冒的次数)</td>
                <td><el-radio v-model="visitData.c14" :label="1">1<span>一年<2次</span></el-radio></td>
                <td><el-radio v-model="visitData.c14" :label="2">2<span>一年感冒2-4次</span></el-radio></td>
                <td><el-radio v-model="visitData.c14" :label="3">3<span>一年感冒5-6次</span></el-radio></td>
                <td><el-radio v-model="visitData.c14" :label="4">4<span>一年8次以上</span></el-radio></td>
                <td><el-radio v-model="visitData.c14" :label="5">5<span>几乎每月</span></el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(15)您没有感冒时也会鼻塞、流鼻涕吗？</td>
                <td><el-radio v-model="visitData.c15" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c15" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c15" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c15" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c15" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(16)您有口粘口腻，或睡眠打鼾吗？</td>
                <td><el-radio v-model="visitData.c16" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c16" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c16" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c16" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c16" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(17)您容易过敏(对药物、食物、气味、花粉或在季节交替、气候变化时)吗？(指每年感冒的次数)</td>
                <td><el-radio v-model="visitData.c17" :label="1">1<span>从来没有</span></el-radio></td>
                <td><el-radio v-model="visitData.c17" :label="2">2<span>一年1、2次</span></el-radio></td>
                <td><el-radio v-model="visitData.c17" :label="3">3<span>一年3、4次</span></el-radio></td>
                <td><el-radio v-model="visitData.c17" :label="4">4<span>一年5、6次</span></el-radio></td>
                <td><el-radio v-model="visitData.c17" :label="5">5<span>每次遇到上述原因都过敏</span></el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(18)您的皮肤容易起荨麻疹吗？(包括风团、风疹块、风疙瘩)</td>
                <td><el-radio v-model="visitData.c18" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c18" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c18" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c18" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c18" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(19)您的皮肤在不知不觉中会出现青紫瘀斑、皮下出血吗？(指皮肤在没有外伤的情况下出现青一块紫一块的情况)</td>
                <td><el-radio v-model="visitData.c19" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c19" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c19" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c19" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c19" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(20)您的皮肤一抓就红，并出现抓痕吗？(指被指甲或钝物划过后皮肤的反应)</td>
                <td><el-radio v-model="visitData.c20" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c20" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c20" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c20" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c20" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(21)您皮肤或口唇干吗？</td>
                <td><el-radio v-model="visitData.c21" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c21" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c21" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c21" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c21" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(22)您有肢体麻木或固定部位疼痛的感觉吗？</td>
                <td><el-radio v-model="visitData.c22" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c22" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c22" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c22" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c22" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(23)您面部或鼻部有油腻感或者油亮发光吗？(指脸上或鼻子)</td>
                <td><el-radio v-model="visitData.c23" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c23" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c23" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c23" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c23" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(24)您面色或目眶晦黯，或出现褐色斑块/斑点吗？</td>
                <td><el-radio v-model="visitData.c24" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c24" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c24" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c24" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c24" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(25)您有皮肤湿疹、疮疖吗？</td>
                <td><el-radio v-model="visitData.c25" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c25" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c25" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c25" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c25" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(26)您感到口干咽燥、总想喝水吗？</td>
                <td><el-radio v-model="visitData.c26" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c26" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c26" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c26" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c26" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(27)您感到口苦或嘴里有异味吗？(指口苦或口臭)</td>
                <td><el-radio v-model="visitData.c27" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c27" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c27" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c27" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c27" :label="5">5</el-radio></td>
            </tr>
              
            <tr>
                <td colspan="5">(28)您腹部肥大吗？(指腹部脂肪肥厚)</td>
                <td><el-radio v-model="visitData.c28" :label="1">1<span>(腹围<80cm,相当于2.4尺)</span></el-radio></td>
                <td><el-radio v-model="visitData.c28" :label="2">2<span>(腹围80-85cm,2.4-2.55尺)</span></el-radio></td>
                <td><el-radio v-model="visitData.c28" :label="3">3<span>(腹围86-90cm,2.56-2.7尺)</span></el-radio></td>
                <td><el-radio v-model="visitData.c28" :label="4">4<span>(腹围1-105cm,2.71-3.15尺)</span></el-radio></td>
                <td><el-radio v-model="visitData.c28" :label="5">5<span>(腹围>105cm或3.15尺)</span></el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(29)您吃(喝)凉的东西会感到不舒服或者怕吃(喝)凉的东西吗？(指不喜欢吃凉的食物，或吃了凉的食物后会不舒服)</td>
                <td><el-radio v-model="visitData.c29" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c29" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c29" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c29" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c29" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(30)您有大便粘滞不爽、解不尽的感觉吗？(大便容易粘在马桶或便坑壁上)</td>
                <td><el-radio v-model="visitData.c30" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c30" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c30" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c30" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c30" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(31)您容易大便干燥吗？</td>
                <td><el-radio v-model="visitData.c31" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c31" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c31" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c31" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c31" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(32)您舌苔厚腻或有舌苔厚厚的感觉吗？(如果自我感觉不清楚可由调查院观察后填写)</td>
                <td><el-radio v-model="visitData.c32" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c32" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c32" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c32" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c32" :label="5">5</el-radio></td>
            </tr>
            <tr>
                <td colspan="5">(33)您舌下静脉瘀紫或增粗吗？(可有调查员辅助观察后填写)</td>
                <td><el-radio v-model="visitData.c33" :label="1">1</el-radio></td>
                <td><el-radio v-model="visitData.c33" :label="2">2</el-radio></td>
                <td><el-radio v-model="visitData.c33" :label="3">3</el-radio></td>
                <td><el-radio v-model="visitData.c33" :label="4">4</el-radio></td>
                <td><el-radio v-model="visitData.c33" :label="5">5</el-radio></td>
            </tr>
            </table>

            <div style="text-align: right;margin-top:30px;">
                <span style="margin-right:15px;">(备注：确认问题答案后，点击提交问卷选项按钮，得到体质类型及体质辨别对应项，请根据得到的值填写中医药保健指导选项)</span>
                <el-button type="warning" @click="computerValue">提交问卷选项</el-button>
            </div>

            <table width="100%" class="table_radio2 table_radio">
            <tr>
                <td>体质类型</td>
                <td>气虚质</td>
                <td>阳虚质</td>
                <td>阴虚质</td>
                <td>痰湿质</td>
                <td>湿热质</td>
                <td>血瘀质</td>
                <td>气郁质</td>
                <td>特禀质</td>
                <td>平和质</td>
            </tr>
            <tr>
                <td>体质辨识</td>
                <td>
                    得分<input type="number" min="0" class="short-input" v-model="visitData.qixu" disabled/>
                    <br>
                    <el-radio v-model="visitData.qixuJ" label="是" disabled>1.是</el-radio>
                    <br>
                    <el-radio v-model="visitData.qixuJ" label="倾向是"  disabled>2.倾向是</el-radio>
                </td>
                <td>
                    得分<input type="number" min="0" class="short-input" v-model="visitData.yangxu" disabled/>
                    <br>
                    <el-radio v-model="visitData.yangxuJ" label="是" disabled>1.是</el-radio>
                    <br>
                    <el-radio v-model="visitData.yangxuJ" label="倾向是"  disabled>2.倾向是</el-radio>
                </td>
                <td>
                    得分<input type="number" min="0" class="short-input" v-model="visitData.yinxu" disabled/>
                    <br>
                    <el-radio v-model="visitData.yinxuJ" label="是" disabled>1.是</el-radio>
                    <br>
                    <el-radio v-model="visitData.yinxuJ" label="倾向是"  disabled>2.倾向是</el-radio>
                </td>
                <td>
                    得分<input type="number" min="0" class="short-input" v-model="visitData.tanshi" disabled/>
                    <br>
                    <el-radio v-model="visitData.tanshiJ" label="是" disabled>1.是</el-radio>
                    <br>
                    <el-radio v-model="visitData.tanshiJ" label="倾向是"  disabled>2.倾向是</el-radio>
                </td>
                <td>
                    得分<input type="number" min="0" class="short-input" v-model="visitData.shire" disabled/>
                    <br>
                    <el-radio v-model="visitData.shireJ" label="是" disabled>1.是</el-radio>
                    <br>
                    <el-radio v-model="visitData.shireJ" label="倾向是"  disabled>2.倾向是</el-radio>
                </td>
                <td>
                    得分<input type="number" min="0" class="short-input" v-model="visitData.xueyu" disabled/>
                    <br>
                    <el-radio v-model="visitData.xueyuJ" label="是" disabled>1.是</el-radio>
                    <br>
                    <el-radio v-model="visitData.xueyuJ" label="倾向是"  disabled>2.倾向是</el-radio>
                </td>
                <td>
                    得分<input type="number" min="0" class="short-input" v-model="visitData.qiyu" disabled/>
                    <br>
                    <el-radio v-model="visitData.qiyuJ" label="是" disabled>1.是</el-radio>
                    <br>
                    <el-radio v-model="visitData.qiyuJ" label="倾向是"  disabled>2.倾向是</el-radio>
                </td>
                <td>
                    得分<input type="number" min="0" class="short-input" v-model="visitData.tebing" disabled/>
                    <br>
                    <el-radio v-model="visitData.tebingJ" label="是" disabled>1.是</el-radio>
                    <br>
                    <el-radio v-model="visitData.tebingJ" label="倾向是"  disabled>2.倾向是</el-radio>
                </td>
                <td>
                    得分<input type="number" min="0" class="short-input" v-model="visitData.pinghe" disabled/>
                    <br>
                    <el-radio v-model="visitData.pingheJ" label="是" disabled>1.是</el-radio>
                    <br>
                    <el-radio v-model="visitData.pingheJ" label="倾向是" disabled>2.倾向是</el-radio>
                </td>
                
            </tr>
            <tr>
                <td>中医药保健指导</td>
                <td>
                    <el-checkbox-group v-model="qixuGuidance" :disabled="visitData.qixuJ === '否'">
                      <el-checkbox label="1">1.情志调摄</el-checkbox><br>
                      <el-checkbox label="2">2.饮食调养</el-checkbox><br>
                      <el-checkbox label="3">3.起居调摄</el-checkbox><br>
                      <el-checkbox label="4">4.运动保健</el-checkbox><br>
                      <el-checkbox label="5">5.穴位保健</el-checkbox><br>
                      <el-checkbox label="6">6.其他</el-checkbox><br>
                      <input type="text" class="long-input" style="width:105px" v-model="visitData.qixuOther" :disabled="!qixuGuidance.includes('6')"/>
                    </el-checkbox-group>
                </td>
                <td>
                    <el-checkbox-group v-model="yangxuGuidance" :disabled="visitData.yangxuJ === '否'">
                      <el-checkbox label="1">1.情志调摄</el-checkbox><br>
                      <el-checkbox label="2">2.饮食调养</el-checkbox><br>
                      <el-checkbox label="3">3.起居调摄</el-checkbox><br>
                      <el-checkbox label="4">4.运动保健</el-checkbox><br>
                      <el-checkbox label="5">5.穴位保健</el-checkbox><br>
                      <el-checkbox label="6">6.其他</el-checkbox><br>
                      <input type="text" class="long-input" style="width:105px" v-model="visitData.yangxuOther" :disabled="!yangxuGuidance.includes('6')"/>
                    </el-checkbox-group>
                </td>
                <td>
                    <el-checkbox-group v-model="yinxuGuidance" :disabled="visitData.yinxuJ === '否'">
                      <el-checkbox label="1">1.情志调摄</el-checkbox><br>
                      <el-checkbox label="2">2.饮食调养</el-checkbox><br>
                      <el-checkbox label="3">3.起居调摄</el-checkbox><br>
                      <el-checkbox label="4">4.运动保健</el-checkbox><br>
                      <el-checkbox label="5">5.穴位保健</el-checkbox><br>
                      <el-checkbox label="6">6.其他</el-checkbox><br>
                      <input type="text" class="long-input" style="width:105px" v-model="visitData.yinxuOther" :disabled="!yinxuGuidance.includes('6')"/>
                    </el-checkbox-group>
                </td>
                <td>
                    <el-checkbox-group v-model="tanshiGuidance" :disabled="visitData.tanshiJ === '否'">
                      <el-checkbox label="1">1.情志调摄</el-checkbox><br>
                      <el-checkbox label="2">2.饮食调养</el-checkbox><br>
                      <el-checkbox label="3">3.起居调摄</el-checkbox><br>
                      <el-checkbox label="4">4.运动保健</el-checkbox><br>
                      <el-checkbox label="5">5.穴位保健</el-checkbox><br>
                      <el-checkbox label="6">6.其他</el-checkbox><br>
                      <input type="text" class="long-input" style="width:105px" v-model="visitData.tanshiOther" :disabled="!tanshiGuidance.includes('6')"/>
                    </el-checkbox-group>
                </td>
                <td>
                    <el-checkbox-group v-model="shireGuidance" :disabled="visitData.shireJ === '否'">
                      <el-checkbox label="1">1.情志调摄</el-checkbox><br>
                      <el-checkbox label="2">2.饮食调养</el-checkbox><br>
                      <el-checkbox label="3">3.起居调摄</el-checkbox><br>
                      <el-checkbox label="4">4.运动保健</el-checkbox><br>
                      <el-checkbox label="5">5.穴位保健</el-checkbox><br>
                      <el-checkbox label="6">6.其他</el-checkbox><br>
                      <input type="text" class="long-input" style="width:130px" v-model="visitData.shireOther" :disabled="!shireGuidance.includes('6')"/>
                    </el-checkbox-group>
                </td>
                <td>
                    <el-checkbox-group v-model="xueyuGuidance" :disabled="visitData.xueyuJ === '否'">
                      <el-checkbox label="1">1.情志调摄</el-checkbox><br>
                      <el-checkbox label="2">2.饮食调养</el-checkbox><br>
                      <el-checkbox label="3">3.起居调摄</el-checkbox><br>
                      <el-checkbox label="4">4.运动保健</el-checkbox><br>
                      <el-checkbox label="5">5.穴位保健</el-checkbox><br>
                      <el-checkbox label="6">6.其他</el-checkbox><br>
                      <input type="text" class="long-input" style="width:130px" v-model="visitData.xueyuOther" :disabled="!xueyuGuidance.includes('6')"/>
                    </el-checkbox-group>
                </td>
                <td>
                    <el-checkbox-group v-model="qiyuGuidance" :disabled="visitData.qiyuJ === '否'">
                      <el-checkbox label="1">1.情志调摄</el-checkbox><br>
                      <el-checkbox label="2">2.饮食调养</el-checkbox><br>
                      <el-checkbox label="3">3.起居调摄</el-checkbox><br>
                      <el-checkbox label="4">4.运动保健</el-checkbox><br>
                      <el-checkbox label="5">5.穴位保健</el-checkbox><br>
                      <el-checkbox label="6">6.其他</el-checkbox><br>
                      <input type="text" class="long-input" style="width:130px" v-model="visitData.qiyuOther" :disabled="!qiyuGuidance.includes('6')"/>
                    </el-checkbox-group>
                </td>
                <td>
                    <el-checkbox-group v-model="tebingGuidance" :disabled="visitData.tebingJ === '否'">
                      <el-checkbox label="1">1.情志调摄</el-checkbox><br>
                      <el-checkbox label="2">2.饮食调养</el-checkbox><br>
                      <el-checkbox label="3">3.起居调摄</el-checkbox><br>
                      <el-checkbox label="4">4.运动保健</el-checkbox><br>
                      <el-checkbox label="5">5.穴位保健</el-checkbox><br>
                      <el-checkbox label="6">6.其他</el-checkbox><br>
                      <input type="text" class="long-input" style="width:130px" v-model="visitData.tebingOther" :disabled="!tebingGuidance.includes('6')"/>
                    </el-checkbox-group>
                </td>
                <td>
                    <el-checkbox-group v-model="pingheGuidance" :disabled="visitData.pingheJ === '否'">
                      <el-checkbox label="1">1.情志调摄</el-checkbox><br>
                      <el-checkbox label="2">2.饮食调养</el-checkbox><br>
                      <el-checkbox label="3">3.起居调摄</el-checkbox><br>
                      <el-checkbox label="4">4.运动保健</el-checkbox><br>
                      <el-checkbox label="5">5.穴位保健</el-checkbox><br>
                      <el-checkbox label="6">6.其他</el-checkbox><br>
                      <input type="text" class="long-input" style="width:130px" v-model="visitData.pingheOther" :disabled="!pingheGuidance.includes('6')"/>
                    </el-checkbox-group>
                </td>
            </tr>
            <tr>
                <td colspan="2">填表日期<span style="color:red;font-size:22px">*</span></td>
                <td colspan="3">
                  <el-date-picker
                        v-model="visitData.date"
                        type="date"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        placeholder="选择日期"
                        :picker-options="pickerOptions" disabled="true">
                    </el-date-picker>
                </td>
                <td colspan="2">医生签名<span style="color:red;font-size:22px">*</span></td>
                <td colspan="3">
                  <input type="text" class="long-input" v-model="visitData.op"/>
                </td>
            </tr>
            <!--<tr>-->
                <!--<td>上传图片</td>-->
                <!--<td colspan="11" ref="uploadList" class="upload-td">-->
                    <!--<el-upload-->
                        <!--class="upload-demo"-->
                        <!--action="http://cloud.eeesys.com/pu/upload.php"-->
                        <!--:on-remove="handleRemove"-->
                        <!--:before-upload="beforeAvatarUpload"-->
                        <!--:on-success="handleAvatarSuccess"-->
                        <!--:limit="3"-->
                        <!--:on-exceed="handleExceed"-->
                        <!--:on-preview="handlePreview"-->
                        <!--:file-list="fileList">-->
                    <!--<el-button size="small" type="primary">点击上传</el-button>(点击下面图片名查看图片)-->
                    <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过20MB</div>-->
                    <!--</el-upload>-->
                <!--</td>-->
            <!--</tr>-->
            <!--<tr>
                <td>随访备注</td>
                <td colspan="11">
                    <el-input type="textarea" v-model="remarkContent" autosize maxlength=1000 placeholder="备注字数不得多于1000字"></el-input>
                </td>
            </tr>-->
        </table>
        <div style="text-align: right;margin-top:40px;">
            <span style="margin-right:15px;">(备注:填好所有内容后,点击保存提交该次服务记录表)</span>
            <el-button type="primary" @click="saveVisit" style="margin-left:10px;">保存</el-button>
        </div>
        <!--<el-dialog title="图片展示" :visible.sync="filePicVisible" class="dialogStyle" :close-on-click-modal="false">-->
            <!--<div style="width:300px;">-->
                <!--<img :src="filePic" style="width: 100%;">-->
            <!--</div>-->
        <!--</el-dialog>-->
        <!--<img :src="tempImg" ref="avatarImg" v-show="false"/>-->
    </div>
</template>
<script>
    const header = {token: localStorage.getItem('cmq_token')};
    export default {
        data() {
            return {
                visitData: {
                            id:null,
                            qixu:'',
                            yangxu:'',
                            yinxu:'',
                            tanshi:'',
                            shire:'',
                            xueyu:'',
                            qiyu:'',
                            tebing:'',
                            pinghe:'',
                            qixuJ:'',
                            yangxuJ:'',
                            yinxuJ:'',
                            tanshiJ:'',
                            shireJ:'',
                            xueyuJ:'',
                            qiyuJ:'',
                            tebingJ:'',
                            pingheJ:'',
                            date: this.getNowFormatDate(),
                            op:localStorage.getItem('name'),
                            },
                qixuGuidance:[],
                yangxuGuidance:[],
                yinxuGuidance:[],
                tanshiGuidance:[],
                shireGuidance:[],
                xueyuGuidance:[],
                qiyuGuidance:[],
                tebingGuidance:[],
                pingheGuidance:[],
                isCreate:false,
                loading: false,
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();//如果没有后面的-8.64e7就是不可以选择今天的
                    },
                },
                fileList:[],
                imageUrl:'',
                filePic:'',
                filePicVisible:false,
                tempImg:''
            }
        },
        mounted() {
          this.getTableList();
        },
        // watch: {
        //     // 监测 route 参数变化
        //     '$route' (to, from) {
        //         this.name = this.$route.params.name;//姓名
        //         this.number = this.$route.params.number;//编号
        //         if(to.name === 'editQuestionnaire'){
        //             this.getTableList();
        //         }else if(to.name === 'detailQuestionnaire'){
        //             this.visitData = {
        //                     qixu:'',
        //                     yangxu:'',
        //                     yinxu:'',
        //                     tanshi:'',
        //                     shire:'',
        //                     xueyu:'',
        //                     qiyu:'',
        //                     tebing:'',
        //                     pinghe:'',
        //                     qixuJ:'',
        //                     yangxuJ:'',
        //                     yinxuJ:'',
        //                     tanshiJ:'',
        //                     shireJ:'',
        //                     xueyuJ:'',
        //                     qiyuJ:'',
        //                     tebingJ:'',
        //                     pingheJ:'',
        //                     checkdate: this.getNowFormatDate(),
        //                     op:localStorage.getItem('name'),
        //             };
        //             this.qixuGuidance=[];
        //             this.yangxuGuidance=[];
        //             this.yinxuGuidance=[];
        //             this.tanshiGuidance=[];
        //             this.shireGuidance=[];
        //             this.xueyuGuidance=[];
        //             this.qiyuGuidance=[];
        //             this.tebingGuidance=[];
        //             this.pingheGuidance=[];
        //             this.isConfirm=false;
        //         }
        //     },
        //     fileList (val) {
        //         this.$nextTick(() => {
        //             val.forEach((file, index) => {
        //                 var a = this.$refs.uploadList.querySelector(`ul.el-upload-list > li:nth-child(${index+1})`).title = file.name;
        //             });
        //         });
        //     }
        // },
        methods: {
            getExif() {
                const imgEl = this.$refs.avatarImg;
                return new Promise(resolve => {
                    imgEl.onload = () => {
                        delete imgEl.exifdata;
                        let temp = this;
                        this.$EXIF.getData(imgEl, function() {
                            let date = temp.$EXIF.getTag(this, "DateTime");
                            if(date){
                                date = date.split(' ')[0].replace(/:/g,'/')+" "+date.split(' ')[1];
                            }
                            let latitude = temp.$EXIF.getTag(this, "GPSLatitude");
                            let longitude = temp.$EXIF.getTag(this, "GPSLongitude");
                            let address = temp.$EXIF.getTag(this, "StripOffsets");
                            if(latitude){
                                latitude = (latitude[0]+latitude[1]/60+latitude[2]/3600).toFixed(6);
                            }
                            if(longitude){
                                longitude = (longitude[0]+longitude[1]/60+longitude[2]/3600).toFixed(6);
                            }
                            resolve({
                                date: date || '未读取到时间',
                                latitude: latitude || '未读取到纬度',
                                longitude: longitude || '未读取到经度'
                            });
                        });
                    };
                });
            },
            //上传头像做限制
            beforeAvatarUpload(file) {
                let isJPG;
                if(file.type==='image/jpeg'||file.type==='image/png'){
                    isJPG = true;
                }else{
                    isJPG = false;
                }
                const isLt20M = file.size / 1024 / 1024 < 20;

                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG/PNG/JPEG 格式!');
                }
                if (!isLt20M) {
                    this.$message.error('上传图片大小不能超过 20MB!');
                }
                this.loading = isJPG && isLt20M;
                return isJPG && isLt20M;
            },
            handleAvatarSuccess(res, file, fileList) {
                this.getExif().then(obj => {
                    this.$jsonp(`https://restapi.amap.com/v3/geocode/regeo?location=${obj.longitude},${obj.latitude}&key=8cf657c8537370b9479ef0bd25e2e70d`).then((res)=>{
                        if(res.regeocode.formatted_address&&res.regeocode.formatted_address.length){
                            file.name = file.name+ ' (图片时间：' + obj.date + ',图片经度：' + obj.longitude + ',图片纬度：' + obj.latitude + ',图片地址：' + res.regeocode.formatted_address+ '(附近))';
                        }else{
                            file.name = file.name+ ' (图片时间：' + obj.date + ',图片经度：' + obj.longitude + ',图片纬度：' + obj.latitude + ',图片地址：未读取到图片地址)';
                        }
                            if(file.response){
                                this.loading = false;
                            }
                            if(!this.loading){
                                this.$message({
                                    message: '图片上传成功',
                                    type: 'success'
                                });
                            }
                            this.fileList = fileList;
                    }).catch((err)=>{
                        this.loading = false;
                        console.log(err);
                        return;
                    })
                });
                this.tempImg = file.url;
            },
            handleRemove(file, fileList) {
                this.fileList = fileList;
            },
            handleExceed(files, fileList) {
                this.$message.warning(`最多上传3个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            handlePreview(file){
                // 弹框显示url图片详情
                this.filePic = file.url;
                this.filePicVisible = true;
            },
            // 获取当前时间作为建册日期
            getNowFormatDate() {
                    var date = new Date();
                    var seperator1 = "-";
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var strDate = date.getDate();
                    if (month >= 1 && month <= 9) {
                            month = "0" + month;
                    }
                    if (strDate >= 0 && strDate <= 9) {
                            strDate = "0" + strDate;
                    }
                    var currentdate = year + seperator1 + month + seperator1 + strDate;
                    return currentdate;
            },
            // 修改时获取列表数据
            getTableList() {
              // if(this.$route.query.id){
              //   return false;
              // }
                //this.visitData.id = this.$route.query.id;
                this.loading = true;
                // let obj = {};
                // obj.id = this.$route.params.id;
                // let areaCodeTemp = this.$route.params.areaCode;
                // if(areaCodeTemp !=='null'){
                //     obj.areaCode = this.$route.params.areaCode;
                // }
              this.$http.get('/api/web/questionnaire/detail?questionnaireId=' + this.$route.query.id, {headers: header}).then(response => {
                    this.loading = false;
                  if(response.body.code==='200'){
                    this.visitData = response.body.data.detail;
                    console.log(response.body.data.detail);
                        // if(this.visitData.pic){
                        //     this.fileList = JSON.parse(this.visitData.pic);
                        //     if(this.fileList&&this.fileList.length){
                        //         this.fileList.forEach(item=>{
                        //             let date = item.date;
                        //             let longitude = item.longitude;
                        //             let latitude = item.latitude;
                        //             if(!date){
                        //                 date = '未读取到时间';
                        //             }
                        //             if(!longitude){
                        //                 longitude = '未读取到经度';
                        //             }
                        //             if(!latitude){
                        //                 latitude = '未读取到纬度';
                        //             }
                        //             if(item.address){
                        //                 item.name = item.name+ ' (图片时间：' + date + ',图片经度：' + longitude + ',图片纬度：' + latitude + ',图片地址：' + item.address+ ')';
                        //             }else{
                        //                 item.name = item.name+ ' (图片时间：' + date + ',图片经度：' + longitude + ',图片纬度：' + latitude + ',图片地址：未读取到图片地址)';
                        //             }
                        //         })
                        //     }
                        // }
                        // if(this.visitData.remarkContent){
                        //     this.remarkContent = this.visitData.remarkContent;
                        // }
                        this.visitData.qixuJ = response.body.data.detail.qixuJ;
                        this.visitData.yangxuJ = response.body.data.detail.yangxuJ;
                        this.visitData.yinxuJ = response.body.data.detail.yinxuJ;
                        this.visitData.tanshiJ = response.body.data.detail.tanshiJ;
                        this.visitData.shireJ = response.body.data.detail.shireJ;
                        this.visitData.xueyuJ = response.body.data.detail.xueyuJ;
                        this.visitData.qiyuJ = response.body.data.detail.qiyuJ;
                        this.visitData.tebingJ = response.body.data.detail.tebingJ;
                        this.visitData.pingheJ = response.body.data.detail.pingheJ;
                        if(response.body.data.detail.qixuGuidance){
                            this.qixuGuidance = JSON.parse(response.body.data.detail.qixuGuidance); 
                        }
                        if(response.body.data.detail.yangxuGuidance){
                            this.yangxuGuidance = JSON.parse(response.body.data.detail.yangxuGuidance);
                        }
                        if(response.body.data.detail.yinxuGuidance){
                            this.yinxuGuidance = JSON.parse(response.body.data.detail.yinxuGuidance); 
                        }
                        if(response.body.data.detail.tanshiGuidance){
                            this.tanshiGuidance = JSON.parse(response.body.data.detail.tanshiGuidance);
                        }
                        if(response.body.data.detail.shireGuidance){
                            this.shireGuidance = JSON.parse(response.body.data.detail.shireGuidance); 
                        }
                        if(response.body.data.detail.xueyuGuidance){
                            this.xueyuGuidance = JSON.parse(response.body.data.detail.xueyuGuidance);
                        }
                        if(response.body.data.detail.qiyuGuidance){
                            this.qiyuGuidance = JSON.parse(response.body.data.detail.qiyuGuidance); 
                        }
                        if(response.body.data.detail.tebingGuidance){
                            this.tebingGuidance = JSON.parse(response.body.data.detail.tebingGuidance);
                        }
                        if(response.body.data.detail.pingheGuidance){
                            this.pingheGuidance = JSON.parse(response.body.data.detail.pingheGuidance);
                        }
                        this.visitData.qixuOther = response.body.data.detail.qixuOther;
                        this.visitData.yangxuOther = response.body.data.detail.yangxuOther;
                        this.visitData.yinxuOther = response.body.data.detail.yinxuOther;
                        this.visitData.tanshiOther = response.body.data.detail.tanshiOther;
                        this.visitData.shireOther = response.body.data.detail.shireOther;
                        this.visitData.xueyuOther = response.body.data.detail.xueyuOther;
                        this.visitData.qiyuOther = response.body.data.detail.qiyuOther;
                        this.visitData.tebingOther = response.body.data.detail.tebingOther;
                        this.visitData.pingheOther = response.body.data.detail.pingheOther;
                    }
                }).catch((data) =>{
                    this.loading = false;
                })
            },
            // 计算体质辨识得分
            computerValue(){
                // 判断33项是否都进行了选择
                for(var i=1;i<=33;i++){
                    if(!this.visitData['c'+i]){
                        this.$message({
                            message: '请选择第'+i+'题',
                            type: 'warning'
                        });
                        return;
                    }
                }
                // 气虚质得分
                if(this.visitData.c2&&this.visitData.c3&&this.visitData.c4&&this.visitData.c14){
                    this.visitData.qixu = +this.visitData.c2+ +this.visitData.c3 + +this.visitData.c4 + +this.visitData.c14;
                    if(this.visitData.qixu>=11){
                        this.visitData.qixuJ = '是';
                    }else if(this.visitData.qixu<=10&&this.visitData.qixu>=9){
                        this.visitData.qixuJ = '倾向是';
                    }else if(this.visitData.qixu<9){
                        this.visitData.qixuJ = '否';
                        this.qixuGuidance = [];
                    }
                }
                // 阳虚质得分
                if(this.visitData.c11&&this.visitData.c12&&this.visitData.c13&&this.visitData.c29){
                    this.visitData.yangxu = +this.visitData.c11 + +this.visitData.c12 + +this.visitData.c13 + +this.visitData.c29;
                    if(this.visitData.yangxu>=11){
                        this.visitData.yangxuJ = '是';
                    }else if(this.visitData.yangxu<=10&&this.visitData.yangxu>=9){
                        this.visitData.yangxuJ = '倾向是';
                    }else if(this.visitData.yangxu<9){
                        this.visitData.yangxuJ = '否';
                        this.yangxuGuidance = [];
                    }
                }
                // 阴虚质得分
                if(this.visitData.c10&&this.visitData.c21&&this.visitData.c26&&this.visitData.c31){
                    this.visitData.yinxu = +this.visitData.c10 + +this.visitData.c21 + +this.visitData.c26 + +this.visitData.c31;
                    if(this.visitData.yinxu>=11){
                        this.visitData.yinxuJ = '是';
                    }else if(this.visitData.yinxu<=10&&this.visitData.yinxu>=9){
                        this.visitData.yinxuJ = '倾向是';
                    }else if(this.visitData.yinxu<9){
                        this.visitData.yinxuJ = '否';
                        this.yinxuGuidance = [];
                    }
                }
                // 痰湿质得分
                if(this.visitData.c9&&this.visitData.c16&&this.visitData.c28&&this.visitData.c32){
                    this.visitData.tanshi = +this.visitData.c9 + +this.visitData.c16 + +this.visitData.c28 + +this.visitData.c32;
                    if(this.visitData.tanshi>=11){
                        this.visitData.tanshiJ = '是';
                    }else if(this.visitData.tanshi<=10&&this.visitData.tanshi>=9){
                        this.visitData.tanshiJ = '倾向是';
                    }else if(this.visitData.tanshi<9){
                        this.visitData.tanshiJ = '否';
                        this.tanshiGuidance = [];
                    }
                }
                // 湿热质得分
                if(this.visitData.c23&&this.visitData.c25&&this.visitData.c27&&this.visitData.c30){
                    this.visitData.shire = +this.visitData.c23 + +this.visitData.c25 + +this.visitData.c27 + +this.visitData.c30;
                    if(this.visitData.shire>=11){
                        this.visitData.shireJ = '是';
                    }else if(this.visitData.shire<=10&&this.visitData.shire>=9){
                        this.visitData.shireJ = '倾向是';
                    }else if(this.visitData.shire<9){
                        this.visitData.shireJ = '否';
                        this.shireGuidance = [];
                    }
                }
                // 血淤质得分
                if(this.visitData.c19&&this.visitData.c22&&this.visitData.c24&&this.visitData.c33){
                    this.visitData.xueyu = +this.visitData.c19 + +this.visitData.c22 + +this.visitData.c24 + +this.visitData.c33;
                    if(this.visitData.xueyu>=11){
                        this.visitData.xueyuJ = '是';
                    }else if(this.visitData.xueyu<=10&&this.visitData.xueyu>=9){
                        this.visitData.xueyuJ = '倾向是';
                    }else if(this.visitData.xueyu<9){
                        this.visitData.xueyuJ = '否';
                        this.xueyuGuidance = [];
                    }
                }
                // 气郁质得分
                if(this.visitData.c5&&this.visitData.c6&&this.visitData.c7&&this.visitData.c8){
                    this.visitData.qiyu = +this.visitData.c5 + +this.visitData.c6 + +this.visitData.c7 + +this.visitData.c8;
                    if(this.visitData.qiyu>=11){
                        this.visitData.qiyuJ = '是';
                    }else if(this.visitData.qiyu<=10&&this.visitData.qiyu>=9){
                        this.visitData.qiyuJ = '倾向是';
                    }else if(this.visitData.qiyu<9){
                        this.visitData.qiyuJ = '否';
                        this.qiyuGuidance = [];
                    }
                }
                // 特禀质得分
                if(this.visitData.c15&&this.visitData.c17&&this.visitData.c18&&this.visitData.c20){
                    this.visitData.tebing = +this.visitData.c15 + +this.visitData.c17 + +this.visitData.c18 + +this.visitData.c20;
                    if(this.visitData.tebing>=11){
                        this.visitData.tebingJ = '是';
                    }else if(this.visitData.tebing<=10&&this.visitData.tebing>=9){
                        this.visitData.tebingJ = '倾向是';
                    }else if(this.visitData.tebing<9){
                        this.visitData.tebingJ = '否';
                        this.tebingGuidance = [];
                    }
                }
                // 平和质得分
                if(this.visitData.c1&&this.visitData.c2&&this.visitData.c4&&this.visitData.c5&&this.visitData.c13){
                    this.visitData.pinghe = +this.visitData.c1 + (6 - +this.visitData.c2) + (6 - +this.visitData.c4) + (6 - +this.visitData.c5) +(6 - +this.visitData.c13);
                    if(this.visitData.pinghe>=17&&this.visitData.qixu<=8&&this.visitData.yangxu<=8&&this.visitData.yinxu<=8&&this.visitData.tanshi<=8&&this.visitData.shire<=8&&this.visitData.xueyu<=8&&this.visitData.qiyu<=8&&this.visitData.tebing<=8){
                        this.visitData.pingheJ = '是';
                    }else if(this.visitData.pinghe>=17&&this.visitData.qixu<=10&&this.visitData.yangxu<=10&&this.visitData.yinxu<=10&&this.visitData.tanshi<=10&&this.visitData.shire<=10&&this.visitData.xueyu<=10&&this.visitData.qiyu<=10&&this.visitData.tebing<=10){
                        this.visitData.pingheJ = '倾向是';
                    }else{
                        this.visitData.pingheJ = '否';
                        this.pingheGuidance = [];
                    }
                }
                this.isConfirm = true;//提交过问卷选项
            },
            //保存数据(掉新增接口)
            saveVisit(){
                if(!this.isConfirm){
                    this.$message({
                        message: '请点击提交问卷选项按钮提交问卷',
                        type: 'warning'
                    });
                    return;
                }
                // 判断是否满足条件如：是否包括必传字段以及多选项是否超过个数
                // 健康指导的其他输入内容长度不得多于20个字
                if((this.visitData.qixuOther&&this.visitData.qixuOther.length>20)||(this.visitData.yangxuOther&&this.visitData.yangxuOther.length>20)||(this.visitData.yinxuOther&&this.visitData.yinxuOther.length>20)||(this.visitData.qixuOther&&this.visitData.qixuOther.length>20)||(this.visitData.tanshiOther&&this.visitData.tanshiOther.length>20)||(this.visitData.shireOther&&this.visitData.shireOther.length>20)||(this.visitData.xueyuOther&&this.visitData.xueyuOther.length>20)||(this.visitData.qiyuOther&&this.visitData.qiyuOther.length>20)||(this.visitData.tebingOther&&this.visitData.tebingOther.length>20)||(this.visitData.pingheOther&&this.visitData.pingheOther.length>20)){
                    this.$message({
                        message: '中医药保健指导的其他选项最多输入20个字',
                        type: 'warning'
                    });
                    return;
                }
                // 判断填表日期是否输入
                // if(!this.visitData.checkdate){
                //     this.$message({
                //         message: '请选择填表日期',
                //         type: 'warning'
                //     });
                //     return;
                // }
                // 判断孕周是否输入
                if(!this.visitData.op){
                    this.$message({
                        message: '请输入医生签名',
                        type: 'warning'
                    });
                    return;
                }
                if(this.qixuGuidance.length!=0){
                    if(!this.qixuGuidance.includes('6')){
                        this.visitData.qixuOther = "";
                    }
                    this.visitData.qixuGuidance = JSON.stringify(this.qixuGuidance);
                }else{
                    this.qixuGuidance = [];
                    this.visitData.qixuOther = "";
                    this.visitData.qixuGuidance = JSON.stringify(this.qixuGuidance);
                }

                if(this.yangxuGuidance!=0){
                    if(!this.yangxuGuidance.includes('6')){
                        this.visitData.yangxuOther = "";
                    }
                    this.visitData.yangxuGuidance = JSON.stringify(this.yangxuGuidance);
                }else{
                    this.yangxuGuidance = [];
                    this.visitData.yangxuOther = "";
                    this.visitData.yangxuGuidance = JSON.stringify(this.yangxuGuidance);
                }

                if(this.yinxuGuidance!=0){
                    if(!this.yinxuGuidance.includes('6')){
                        this.visitData.yinxuOther = "";
                    }
                    this.visitData.yinxuGuidance = JSON.stringify(this.yinxuGuidance);
                }else{
                    this.yinxuGuidance = [];
                    this.visitData.yinxuOther = "";
                    this.visitData.yinxuGuidance = JSON.stringify(this.yinxuGuidance);
                }

                if(this.tanshiGuidance!=0){
                    if(!this.tanshiGuidance.includes('6')){
                        this.visitData.tanshiOther = "";
                    }
                    this.visitData.tanshiGuidance = JSON.stringify(this.tanshiGuidance);
                }else{
                    this.tanshiGuidance = [];
                    this.visitData.tanshiOther = "";
                    this.visitData.tanshiGuidance = JSON.stringify(this.tanshiGuidance);
                }

                if(this.shireGuidance!=0){
                    if(!this.shireGuidance.includes('6')){
                        this.visitData.shireOther = "";
                    }
                    this.visitData.shireGuidance = JSON.stringify(this.shireGuidance);
                }else{
                    this.shireGuidance = [];
                    this.visitData.shireOther = "";
                    this.visitData.shireGuidance = JSON.stringify(this.shireGuidance);
                }

                if(this.xueyuGuidance!=0){
                    if(!this.xueyuGuidance.includes('6')){
                        this.visitData.xueyuOther = "";
                    }
                    this.visitData.xueyuGuidance = JSON.stringify(this.xueyuGuidance);
                }else{
                    this.xueyuGuidance = [];
                    this.visitData.xueyuOther = "";
                    this.visitData.xueyuGuidance = JSON.stringify(this.xueyuGuidance);
                }

                if(this.qiyuGuidance!=0){
                    if(!this.qiyuGuidance.includes('6')){
                        this.visitData.qiyuOther = "";
                    }
                    this.visitData.qiyuGuidance = JSON.stringify(this.qiyuGuidance);
                }else{
                    this.qiyuGuidance = [];
                    this.visitData.qiyuOther = "";
                    this.visitData.qiyuGuidance = JSON.stringify(this.qiyuGuidance);
                }

                if(this.tebingGuidance!=0){
                    if(!this.tebingGuidance.includes('6')){
                        this.visitData.tebingOther = "";
                    }
                    this.visitData.tebingGuidance = JSON.stringify(this.tebingGuidance);
                }else{
                    this.tebingGuidance = [];
                    this.visitData.tebingOther = "";
                    this.visitData.tebingGuidance = JSON.stringify(this.tebingGuidance);
                }

                if(this.pingheGuidance!=0){
                    if(!this.pingheGuidance.includes('6')){
                        this.visitData.pingheOther = "";
                    }
                    this.visitData.pingheGuidance = JSON.stringify(this.pingheGuidance);
                }else{
                    this.pingheGuidance = [];
                    this.visitData.pingheOther = "";
                    this.visitData.pingheGuidance = JSON.stringify(this.pingheGuidance);
                }
                // if(this.fileList&&this.fileList.length){
                //     let picName = this.fileList.map(item => {
                //         let temp = JSON.parse(JSON.stringify(item.name));
                //         item.name = temp.split('(图片时间：')[0].trim();
                //         item.date = temp.split('(图片时间：')[1].split(',图片经度：')[0].trim();
                //         item.longitude = temp.split(',图片经度：')[1].split(',图片纬度：')[0].trim();
                //         item.latitude = temp.split(',图片纬度：')[1].split(',图片地址：')[0].trim();
                //         item.address = temp.split(',图片地址：')[1].split(')')[0].trim();
                //         if(item.response){
                //             return {
                //                 url: item.response.img.split('small')[0]+'big'+item.response.img.split('small')[1],
                //                 name: item.name,
                //                 date: item.date,
                //                 longitude: item.longitude,
                //                 latitude: item.latitude,
                //                 address: item.address
                //             };
                //         }else{
                //             return {
                //                 url: item.url,
                //                 name: item.name,
                //                 date: item.date,
                //                 longitude: item.longitude,
                //                 latitude: item.latitude,
                //                 address: item.address
                //             };
                //         }
                //         });
                //     this.visitData.pic = JSON.stringify(picName);
                // }else{
                //     this.visitData.pic = '';
                // }
                //this.visitData.remarkContent = this.remarkContent;
                // let route = this.$route.name;
                // this.visitData.name = this.$route.params.name;
                // this.visitData.idnumber = this.$route.params.idnumber;
                // this.visitData.contractId = this.$route.params.contractId;
                // this.visitData.areaCode = this.$route.params.areaCode;

                this.visitData.id = this.$route.query.id;
                this.$http.post('/api/web/questionnaire/save', this.visitData, {headers: header}).then(response => {
                  alert("操作成功");
                  this.$router.push("/questionnaireform");
                }).catch((data) =>{
                  // console.log(response.message);
                  this.loading = false;
                })
            },
        } 
    }
</script>
<style scoped>
    @import '../../assets/common.css';

    .name-input {
        width: 100px;
        font-size: 16px;
        margin-left: 5px;
        margin-bottom: 10px;
        border: none;
        border-bottom: 1px solid #999;
        outline: 0;
        background: #fff;
        margin-right: 12px;
    }

    .number-input {
        width: 200px;
        font-size: 16px;
        margin-left: 5px;
        margin-bottom: 10px;
        border: none;
        border-bottom: 1px solid #999;
        outline: 0;
        background: #fff;
        margin-right: 12px;
    }

    table {
        border-collapse: collapse;
    }

    td {
        border: 1px solid #ccc;
        padding: 5px 7px 5px 7px;
        background-color: white;
    }

    .errorStyle {
        color: red;
        font-size: 13px;
    }

    .short-input {
        width: 50px;
        height: 20px;
        margin: 6px;
    }

    .long-input {
        min-width: 105px;
        height: 20px;
        margin: 6px;
    }
    .table_radio2{
        margin-top:40px;
    }
    .dialogStyle>>>.el-dialog{
        width:22%;
    }
    .upload-td >>> .upload-demo {
        width: 1000px;
        margin: 5px 0;
    }
</style>
<style>
    .table_radio .el-radio__inner{
        width: 20px;
        height: 20px;
    }
    .table_radio .el-radio__label span{
        white-space:normal;
        word-break:break-all;
        word-wrap:break-word;
    }
     .table_radio .el-radio__label{
        font-size: 16px;
        white-space:normal;
        word-break:break-all;
        word-wrap:break-word;
        margin-right:5px;
     }
</style>
