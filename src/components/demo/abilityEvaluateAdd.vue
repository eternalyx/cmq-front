<template>
    <div  class="container" v-loading="loading"
    element-loading-text="请稍候..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
    >
        <div style="margin: auto;width: 880px;">
            <span>姓名:</span>
            <input v-model.trim="name" class="name-input" type="text" disabled="disabled"/>
            <span>编号:</span>
            <input v-model.trim="number" class="number-input" type="text" disabled="disabled"/>
        </div>
      
      <div style="border:1px solid #999;width: 880px;margin: auto;margin-top: 20px;">
        <p style="text-align: center;font-size: 28px;margin-top: 45px;">老年人生活自理能力评估表</p>
        <div style="margin-left: 140px;margin-top: 35px;">
            随访日期：
            <el-date-picker
                v-model="visitData.visitTime"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择日期"
                style="margin-right:20px"
                :picker-options="pickerOptions">
            </el-date-picker>
            随访医生：
            <input type="text" class="long-input" v-model="visitData.doctorName"/> 
        </div>
        <div class="question">
            <p>1、进餐：使用餐具将饭菜送入口、咀嚼、吞咽等活动</p>
            <el-radio-group v-model="visitData.meal" class="answerOption">
                <el-radio :label="0">独立完成</el-radio><br>
                <el-radio :label="3">需要协助，如切碎、搅拌食物等</el-radio><br>
                <el-radio :label="5">完全需要帮助</el-radio><br>
            </el-radio-group>
        </div>

        <div class="question">
            <p>2、梳洗：梳头、洗脸、刷牙、剃须、洗澡等活动</p>
            <el-radio-group v-model="visitData.wash" class="answerOption">
                <el-radio :label="0">独立完成</el-radio><br>
                <el-radio :label="1">能独立地洗头、梳头、洗脸、刷牙、剃须等；洗澡需要协助</el-radio><br>
                <el-radio :label="3">在协助下和适当的时间内，能完成部分梳洗活动</el-radio><br>
                <el-radio :label="7">完全需要帮助</el-radio><br>
            </el-radio-group>
        </div>

        <div class="question">
            <p>3、穿衣：穿衣裤、袜子、鞋子等活动</p>
            <el-radio-group v-model="visitData.dress" class="answerOption">
                <el-radio :label="0">独立完成</el-radio><br>
                <el-radio :label="3">需要协助，在适当的时间内完成部分穿衣</el-radio><br>
                <el-radio :label="5">完全需要帮助</el-radio><br>
            </el-radio-group>
        </div>

        <div class="question">
            <p>4、如厕：小便、大便等活动及自控</p>
            <el-radio-group v-model="visitData.toilet" class="answerOption">
                <el-radio :label="0">不需协助，可自控</el-radio><br>
                <el-radio :label="1">偶尔失禁，但基本上能如厕或使用便具</el-radio><br>
                <el-radio :label="5">经常失禁，在很多提示和协助下尚能如厕或使用便具</el-radio><br>
                <el-radio :label="10">完全失禁，完全需要帮助</el-radio><br>
            </el-radio-group>
        </div>

        <div class="question">
            <p>5、活动：站立、室内行走、上下楼梯、户外活动</p>
            <el-radio-group v-model="visitData.activity" class="answerOption">
                <el-radio :label="0">独立完成所有活动</el-radio><br>
                <el-radio :label="1">借助较小的外力或辅助装置能完成站立、行走、上下楼梯等</el-radio><br>
                <el-radio :label="5">借助较大的外力才能完成站立、行走、不能上下楼梯</el-radio><br>
                <el-radio :label="10">卧床不起，活动完全需要帮助</el-radio><br>
            </el-radio-group>
        </div>

        <p style="margin-left:50px;margin-top:55px;font-size: 24px;">总得分为：{{score}}，程度等级为：{{kindName}}</p>
        <div style="margin-top: 40px;margin-left: 58px;" ref="uploadList" class="upload-td">
            <el-upload
                        class="upload-demo"
                        action="http://cloud.eeesys.com/pu/upload.php"
                        :on-remove="handleRemove"
                        :before-upload="beforeAvatarUpload"
                        :on-success="handleAvatarSuccess"
                        :limit="3"
                        :on-exceed="handleExceed"
                        :on-preview="handlePreview"
                        :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>(点击下面图片名查看图片)
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过20MB</div>
                    </el-upload>
        </div>
        <div style="margin-top: 40px;margin-left: 58px;">
            <p>随访备注:</p>
            <el-input type="textarea" style="width:700px;margin-top: 10px" v-model="remarkContent" autosize maxlength=1000 placeholder="备注字数不得多于1000字"></el-input>
        </div>
        <div style="margin-left:50px;margin-top: 50px;margin-bottom: 50px;">
                <el-button type="primary" @click="saveVisit" style="margin-left:10px;">保存</el-button>
            <router-link to="/traditional_Chinese_medicine">
                <el-button type="info">取消</el-button>
            </router-link>
        </div>
        <el-dialog title="图片展示" :visible.sync="filePicVisible" class="dialogStyle" :close-on-click-modal="false">
            <div style="width:300px;">
                <img :src="filePic" style="width: 100%;">
            </div>
        </el-dialog>
        <img :src="tempImg" ref="avatarImg" v-show="false"/>
      </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                visitData: {
                    meal: 0,
                    wash: 0,
                    dress: 0,
                    toilet: 0,
                    activity: 0,
                    visitTime:this.getNowFormatDate(),
                    doctorName:localStorage.getItem('name'),
                            },
                loading: false,
                getData:{},
                name:this.$route.params.name,//姓名
                number:this.$route.params.number,//编号
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();//如果没有后面的-8.64e7就是不可以选择今天的
                    },
                },
                fileList:[],
                imageUrl:'',
                remarkContent:'',
                filePic:'',
                filePicVisible:false,
                tempImg:''
            }
        },
        mounted() {
            this.initialiseData();
        },
        watch: {
            // 监测 route 参数变化
            '$route' (to, from) {
                this.name = this.$route.params.name;//姓名
                this.number = this.$route.params.number;//编号
                if(to.name === 'abilityEvaluateEdit'){
                    this.getTableList();
                }else if(to.name === 'abilityEvaluateAdd'){
                    this.visitData = {
                    meal: 0,
                    wash: 0,
                    dress: 0,
                    toilet: 0,
                    activity: 0,
                    visitTime:this.getNowFormatDate(),
                    doctorName:localStorage.getItem('name'),
                            };
                }
            },
            fileList (val) {
                this.$nextTick(() => {
                    val.forEach((file, index) => {
                        var a = this.$refs.uploadList.querySelector(`ul.el-upload-list > li:nth-child(${index+1})`).title = file.name;
                    });
                });
            }
        },
        computed: {
            score: function(){
                return  this.visitData.meal+this.visitData.wash+this.visitData.dress+this.visitData.toilet+this.visitData.activity;
            },
            kindName: function(){
                if(this.score<4&&this.score>=0){
                    return '可自理';
                }else if(this.score>3&&this.score<9){
                    return '轻度依赖';
                }else if(this.score>8&&this.score<19){
                    return '中度依赖';
                }else if(this.score>=19){
                    return '不能自理';
                }
                return '';
            }
        },
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
            initialiseData(){
                let route = this.$route.name;
                if(route==='abilityEvaluateEdit'){
                    this.getTableList();
                }
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
                this.loading = true;
                this.$get('/visitSelfCare/selectDetail',{
                    id:this.$route.params.id,
                }).then((data) => {
                    this.loading = false;
                    if(data.status===0){
                        this.visitData = data.data;
                        if(this.visitData.pic){
                            this.fileList = JSON.parse(this.visitData.pic);
                            if(this.fileList&&this.fileList.length){
                                this.fileList.forEach(item=>{
                                    let date = item.date;
                                    let longitude = item.longitude;
                                    let latitude = item.latitude;
                                    if(!date){
                                        date = '未读取到时间';
                                    }
                                    if(!longitude){
                                        longitude = '未读取到经度';
                                    }
                                    if(!latitude){
                                        latitude = '未读取到纬度';
                                    }
                                    if(item.address){
                                        item.name = item.name+ ' (图片时间：' + date + ',图片经度：' + longitude + ',图片纬度：' + latitude + ',图片地址：' + item.address+ ')';
                                    }else{
                                        item.name = item.name+ ' (图片时间：' + date + ',图片经度：' + longitude + ',图片纬度：' + latitude + ',图片地址：未读取到图片地址)';
                                    }
                                })
                            }
                        }
                        if(this.visitData.remarkContent){
                            this.remarkContent = this.visitData.remarkContent;
                        }
                    }
                }).catch((data) =>{
                    console.log(data.msg);
                    this.loading = false;
                })
            },
            //保存数据(掉新增接口)
            saveVisit(){
                // 判断是否满足条件如：是否包括必传字段以及多选项是否超过个数
                // 判断填表日期是否输入
                if(!this.visitData.visitTime){
                    this.$message({
                        message: '请选择随访日期',
                        type: 'warning'
                    });
                    return;
                }
                // 判断医生是否输入
                if(!this.visitData.doctorName){
                    this.$message({
                        message: '请输入随访医生',
                        type: 'warning'
                    });
                    return;
                }
                if(this.fileList&&this.fileList.length){
                    let picName = this.fileList.map(item => {
                        let temp = JSON.parse(JSON.stringify(item.name));
                        item.name = temp.split('(图片时间：')[0].trim();
                        item.date = temp.split('(图片时间：')[1].split(',图片经度：')[0].trim();
                        item.longitude = temp.split(',图片经度：')[1].split(',图片纬度：')[0].trim();
                        item.latitude = temp.split(',图片纬度：')[1].split(',图片地址：')[0].trim();
                        item.address = temp.split(',图片地址：')[1].split(')')[0].trim();
                        if(item.response){
                            return {
                                url: item.response.img.split('small')[0]+'big'+item.response.img.split('small')[1],
                                name: item.name,
                                date: item.date,
                                longitude: item.longitude,
                                latitude: item.latitude,
                                address: item.address
                            };
                        }else{
                            return {
                                url: item.url,
                                name: item.name,
                                date: item.date,
                                longitude: item.longitude,
                                latitude: item.latitude,
                                address: item.address
                            };
                        }
                        });
                    this.visitData.pic = JSON.stringify(picName);
                }else{
                    this.visitData.pic = '';
                }
                this.visitData.remarkContent = this.remarkContent;
                let route = this.$route.name;
                this.visitData.contractId = this.$route.params.contractId;
                this.visitData.score = this.score;
                this.visitData.conclusion = this.kindName;
                if(route==='abilityEvaluateAdd'){
                    // 新增页面掉借口新增数据
                    this.$post('/visitSelfCare/',this.visitData).then((data) => {
                        if(data.status===0){
                            //中老年随访
                            this.$router.push('/traditional_Chinese_medicine');
                        }
                    }).catch((data) =>{
                        console.log(data.msg);
                        this.loading = false;
                    })
                }else if(route==='abilityEvaluateEdit'){
                    // 修改页面掉借口新增数据
                    this.$put(`/visitSelfCare/${this.$route.params.id}`,this.visitData).then((data) => {
                        if(data.status===0){
                            //中老年随访
                            this.$router.push('/traditional_Chinese_medicine');
                        }
                    }).catch((data) =>{
                        console.log(data.msg);
                        this.loading = false;
                    })
                }
            },
        } 
    }
</script>
<style scoped>
    @import '../../../assets/common.css';

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
        height: 33px;
        margin: 6px;
        border-radius: 4px;
        padding-left: 10px;
        border: 1px solid #dcdfe6;
        outline: 0;
    }
    .table_radio2{
        margin-top:40px;
    }
    .question{
        margin-left: 50px;
        margin-right: 50px;
        margin-top: 20px;
        line-height: 45px;
        border-bottom: 1px solid #EFEFEF;
        font-size: 20px;
        padding-bottom: 10px;
    }
    .answerOption{
        padding-left: 20px;
        line-height: 45px;
    }
    .answerOption>>>.el-radio__label{
        font-size: 17px;
    }
    .dialogStyle>>>.el-dialog{
        width:22%;
    }
    .upload-td >>> .upload-demo {
        width: 650px;
        margin: 5px 0;
    }
</style>
