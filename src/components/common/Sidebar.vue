<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: '1',
                        title: '管理员登录',
                        subs: [
                            {
                                index: 'doctorform',
                                title: '账户管理'
                            },
                            {
                                index: 'districtmanage',
                                title: '组织管理'
                            }
                        ]
                    },
                  {
                    icon: 'el-icon-setting',
                    index: '2',
                    title: '医生登录',
                    subs: [
                      {
                        index: 'questionnaireform',
                        title: '体质辨识'
                      }
                      // {
                      //   index: 'personalinformation',
                      //   title: '个人信息'
                      // }
                    ]
                  }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
