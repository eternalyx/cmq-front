import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/doctorform',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children:[
        {
          path: '/',
          component: resolve => require(['../components/page/DoctorForm.vue'], resolve)
        },
        {
          path: '/doctoreditor',
          component: resolve => require(['../components/page/DoctorEditor.vue'], resolve)
        },
        {
          path: '/districtmanage',
          component: resolve => require(['../components/page/DistrictManage.vue'], resolve)
        }
        // {
        //   path: '/questionnaireform',
        //   component: resolve => require(['../components/page/QuestionnaireForm.vue'], resolve)
        // },
        // {
        //   path: '/detailQuestionnaire',
        //   component: resolve => resolve(['../components/demo/QuestionnaireDetail.vue'], resolve)
        // }
      ]
    },
    {
      path: '/questionnaireform',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children:[
        {
          path: '/',
          component: resolve => require(['../components/page/QuestionnaireForm.vue'], resolve)
        },
        {
          path: '/detailQuestionnaire',
          component: resolve => require(['../components/page/QuestionnaireDetail.vue'], resolve)
        },
        {
          path: '/editQuestionnaire',
          component: resolve => require(['../components/page/QuestionnaireEditor.vue'], resolve)
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    }

  ]
})
