<template>
  <el-row :gutter="20">
    <el-col :span="14">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="姓  名：">
          <el-input v-model="form.name" style="width: 35%;"></el-input>
        </el-form-item>

        <el-form-item label="性  别：">
          <el-select v-model="form.sex" placeholder="请选择性别" style="width: 35%;">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="身份证号：">
          <el-input v-model="form.idCardNumber" style="width: 45%"></el-input>
        </el-form-item>

        <el-form-item label="手机号：">
          <el-input v-model="form.mobile" style="width: 45%"></el-input>
        </el-form-item>

        <el-form-item label="医院名称：">
          <el-input v-model="form.hospitalName" style="width: 45%"></el-input>
        </el-form-item>

        <el-form-item label="所属地域：">
          <el-col :span="4">
            <el-select v-model="form.first" @change="onProvinceChange" placeholder="省">
              <el-option v-for="item in form.provinces" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-col>

          <el-col :span="4">
            <el-select v-model="form.second" @change="onCityChange" placeholder="市" v-if="form.cityShow">
              <el-option v-for="item in form.cities" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-col>

          <el-col :span="4">
            <el-select v-model="form.third" @change="onAreaChange" placeholder="区/县" v-if="form.areaShow">
              <el-option v-for="item in form.areaes" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-col>

          <el-col :span="4">
            <el-select v-model="form.fourth" @change="onTownChange" placeholder="镇" v-if="form.townShow">
              <el-option v-for="item in form.towns" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-col>

          <el-col :span="4">
            <el-select v-model="form.fifth" @change="onVillageChange" placeholder="村" v-if="form.villageShow" multiple>
              <el-option v-for="item in form.villages" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="权  限：">
          <el-checkbox v-model="form.responsible">区域负责人</el-checkbox>
        </el-form-item>

        <el-form-item label="备  注：">
          <el-input type="textarea" v-model="form.memo" style="width: 80%"></el-input>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="doctorPage">返回</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-col :span="10">
      <div class="custom-tree-container">

        <div class="block">
          <br/><br/>
          <el-tree :data="tree" show-checkbox node-key="id" :expand-on-click-node="false" default-expand-all
                   icon-class="el-icon-arrow-right"
                   :props="treeProps" ref="tree" @check-change="addSelectedNodes" style="border-style: none;">
          </el-tree>
        </div>
      </div>

    </el-col>

  </el-row>


</template>

<script>
  const header = {token: localStorage.getItem('cmq_token')};
  export default {
    data() {
      return {
        form: {
          id: '',
          name: '',
          sex: '',
          idCardNumber: '',
          mobile: '',
          hospitalName: '',
          responsible: false,
          memo: '',

          districtIds: [],
          functionIds: [],

          //selectors 选中的值
          first: [],
          second: [],
          third: [],
          fourth: [],
          fifth: [],

          provinces: [],
          cities: [],
          areaes: [],
          towns: [],
          villages: [],

          cityShow: false,
          areaShow: false,
          townShow: false,
          villageShow: false,
        },

        tree: [],
        treeProps: {
          label: 'name',
          children: 'children'
        }

      }
    },

    //mounted
    mounted() {
      this.$http.get('/api/district/list-for-selector', {headers: header}).then(response => {
        this.form.provinces = response.body.data.districts;
        //console.log(response.body.data.districts)
      }, response => {
        alert(response.body.message);
      });

      this.$http.get('/api/function/list-as-tree', {headers: header}).then(response => {
        this.tree = [];
        this.tree.push(response.body.data.functionTree);
      }, response => {
        alert(response.body.message);
      });

      //this.$refs.tree.setCheckedKeys(this.form.functionIds);

      //若是edit
      if (this.$route.query.id == null) {
        return;
      }

      this.form.id = this.$route.query.id;

      this.$http.get('/api/doctor/configuration-detail?doctorId=' + this.form.id, {headers: header}).then(response => {
        console.log(response.body.data.detail);
        this.form = response.body.data.detail;
        this.$refs.tree.setCheckedKeys(this.form.functionIds);
      }, response => {
        alert(response.body.message);
      });
    },

    methods: {

      onSubmit() {
        //console.log('submit!');
        this.$http.post('/api/doctor/insert-or-update-configuration', this.form, {headers: header}).then(response => {
          alert('保存成功!');
          this.doctorPage();
        }, response => {
          alert(response.body.message);
        });
      },

      doctorPage() {
        this.$router.push('/doctorform');
      },

      onProvinceChange() {
        this.$http.get('/api/district/list-for-selector?districtId=' + this.form.first, {headers: header}).then(response => {
          this.form.cities = response.body.data.districts;
        }, response => {
          alert(response.body.message);
        });

        this.form.districtIds = [];
        this.form.districtIds.push(this.form.first);
        //console.log(this.form.districtIds);

        this.form.second = null;
        this.form.third = null;
        this.form.fourth = null;
        this.form.fifth = null;

        this.form.cityShow = true;
        this.form.areaShow = false;
        this.form.townShow = false;
        this.form.villageShow = false;

      },

      onCityChange() {
        this.$http.get('/api/district/list-for-selector?districtId=' + this.form.second, {headers: header}).then(response => {
          this.form.areaes = response.body.data.districts;
        }, response => {
          alert(response.body.message);
        });

        this.form.districtIds = [];
        this.form.districtIds.push(this.form.second);
        //console.log(this.form.districtIds);

        this.form.third = null;
        this.form.fourth = null;
        this.form.fifth = null;

        this.form.cityShow = true;
        this.form.areaShow = true;
        this.form.townShow = false;
        this.form.villageShow = false;
      },

      onAreaChange() {
        this.$http.get('/api/district/list-for-selector?districtId=' + this.form.third, {headers: header}).then(response => {
          this.form.towns = response.body.data.districts;
        }, response => {
          alert(response.body.message);
        });

        this.form.districtIds = [];
        this.form.districtIds.push(this.form.third);

        this.form.fourth = null;
        this.form.fifth = null;

        this.form.cityShow = true;
        this.form.areaShow = true;
        this.form.townShow = true;
        this.form.villageShow = false;
      },

      onTownChange() {
        this.form.villages = [],

          this.$http.get('/api/district/list-for-selector?districtId=' + this.form.fourth, {headers: header}).then(response => {
            this.form.villages = response.body.data.districts;
          }, response => {
            alert(response.body.message);
          });

        this.form.districtIds = [];
        this.form.districtIds.push(this.form.fourth);

        this.form.fifth = null;

        this.form.cityShow = true;
        this.form.areaShow = true;
        this.form.townShow = true;
        this.form.villageShow = true;
      },

      onVillageChange() {
        this.form.districtIds = [];
        this.form.districtIds = this.form.fifth;
      },

      addSelectedNodes() {
        //parent node 只有在所有子节点都选中，才代表被选中
        //console.log(this.$refs.tree.getCheckedKeys());
        this.form.functionIds = [];
        this.form.functionIds = this.$refs.tree.getCheckedKeys();
      },

    }
  }
</script>
