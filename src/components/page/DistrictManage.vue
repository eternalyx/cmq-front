<template>
  <div class="custom-tree-container">

    <div class="block">
      <el-tree :data="tree" node-key="id" :expand-on-click-node="false" icon-class="el-icon-arrow-right"
               :default-expanded-keys="treeExpandedKeys" :ref="tree">
        <!-- default-expand-all -->
        <!-- data: 所有的数据, node: 单节点数据 -->
        <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" @click="() => edit(node, data)">
            修改
          </el-button>
          <el-button type="text" size="mini" @click="() => insert(node, data, false)">
            添加同级
          </el-button>
          <el-button type="text" size="mini" @click="() => insert(node, data, true)">
            添加下级
          </el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
      </el-tree>
    </div>

    <!-- form -->
    <el-dialog title="修改/新增组织信息" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="组织编号" :label-width="formLabelWidth">
          <el-input v-model="form.districtCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="组织名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  let id = 1000;

  export default {
    data: function () {
      return {
        tree: [],
        dialogVisible: false,
        isEdit: false,
        form: {
          id: '',
          districtCode: '',
          name: '',
          beforeDistrictCode: '',
          isChildren: null,
        },
        formLabelWidth: '88px',
        treeExpandedKeys: [1, 2, 3]
      }
    },

    //page loading execute
    mounted() {
      const header = {token: localStorage.getItem('cmq_token')};

      this.$http.get('/api/district/list-as-tree',
        {headers: header}
      ).then(response => {

        if (response.body.code === '500') {
          alert(response.body.message);
        }
        //alert(response.body.data.tree[0].label);
        this.tree = response.body.data.districtTree;
      }, response => {
        alert(response.body.message);
      })
    },

    methods: {
      edit(node, data) {
        this.form.id = data.id;
        this.form.name = data.name;
        this.form.districtCode = data.districtCode;
        this.dialogVisible = true;

        // for(var i in data) {
        //
        //   alert(i,":",data[i]);
        //
        // }

        //alert(node);
        //alert(data);
      },

      insert(node, data, isChildren) {
        this.form.id = '';
        this.form.name = '';
        this.form.beforeDistrictCode = '';
        this.form.isChildren = null;

        var thisDistrictCode = node.data.districtCode;

        this.form.beforeDistrictCode = thisDistrictCode;
        this.form.isChildren = isChildren ? 1 : 0;

        if (thisDistrictCode.length == 11 && isChildren) {
          alert("无法添加下级组织结构");
          return false;
        }

        if (thisDistrictCode == 1 && !isChildren) {
          alert("仅支持中国地区");
          return false;
        }

        if (isChildren) {
          //alert(node.data.districtCode)
          this.form.districtCode = thisDistrictCode
        } else {
          this.form.districtCode = thisDistrictCode.substring(0, thisDistrictCode.length - 2);
        }

        this.dialogVisible = true;
      },

      remove(node, data) {
        //alert('delete');
        const header = {token: localStorage.getItem('cmq_token')};

        this.$http.post('/api/district/delete', {id: data.id}, {headers: header}
        ).then(response => {
          window.location.reload();
          alert("删除成功");
        }, response => {
          alert(response.body.message);
        })
      },

      submitForm() {
        const header = {token: localStorage.getItem('cmq_token')};

        //alert(this.form.id);
        //return false;

        this.$http.post('/api/district/insert-or-update', this.form, {headers: header}
        ).then(response => {
          if (response.body.code === '500') {
            alert(response.body.message);
            return false;
          }

          this.dialogVisible = false;
          window.location.reload();
          alert("处理成功");
        }, response => {
          alert(response.body.message);
        })
      },

      append(data) {
        const newChild = {id: id++, label: 'testtest', children: []};
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove1(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      }


    }
  };
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
