import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/spider/spiderCoupon',
    hidden: true
  },
  {
    path: '/spider',
    component: Layout,
    name: '爬虫站数据',
    meta: { title: '爬虫站数据', icon: 'example' },
    redirect: '/spider/spiderCoupon',
    children: [
      {
        path: 'spiderCoupon',
        name: '优惠券管理',
        component: () => import('@/views/spider/spiderCoupon/spiderCoupon.vue'),
        meta: { title: '优惠券管理', icon: 'tree' }
      },
      {
        path: 'spiderStore',
        name: '商家管理',
        component: () => import('@/views/spider/spiderStore/spiderStore.vue'),
        meta: { title: '商家管理', icon: 'tree' }
      },
      {
        path: 'spiderCategory',
        name: '分类',
        component: () => import('@/views/spider/spiderCategory/spiderCategory.vue'),
        meta: { title: '分类', icon: 'tree' }
      },
      {
        path: 'spiderStat',
        name: '统计',
        component: () => import('@/views/spider/spiderStat/spiderStat.vue'),
        meta: { title: '统计', icon: 'tree' }
      },
      {
        path: 'spiderMaintain',
        name: '维护操作',
        component: () => import('@/views/spider/spiderMaintain/spiderMaintain.vue'),
        meta: { title: '维护操作', icon: 'tree' }
      },
    ]
  },
  {
    path: '/site',
    component: Layout,
    name: '内站点数据',
    meta: { title: '内站点数据', icon: 'example' },
    redirect: '/site/site1',
    children: [
      {
        path: 'site1',
        name: '站点1',
        component: () => import('@/views/site/siteHome/siteHome.vue'),
        meta: { title: '站点1', icon: 'tree',siteId:'1' }
      },
      {
        path: 'site2',
        name: '站点2',
        component: () => import('@/views/site/siteHome/siteHome.vue'),
        meta: { title: '站点2', icon: 'tree',siteId:'2' }
      }
    ]
  },
  {
    path: '/storeCheck',
    component: Layout,
    name: '商家审核',
    meta: { title: '商家审核', icon: 'example' },
    redirect: '/storeCheck/check',
    children: [
      {
        path: 'check',
        name: '商家审核',
        component: () => import('@/views/storeCheck/storeCheck.vue'),
        meta: { title: '商家审核', icon: 'tree' }
      }
    ]
  },
  {
    path: '/staffWork',
    component: Layout,
    name: '员工管理',
    meta: { title: '员工管理', icon: 'example' },
    redirect: '/staffWork/staffdDaily',
    children: [
      {
        path: 'staffdDaily',
        name: '工作记录',
        component: () => import('@/views/staffWork/staffdDaily/staffdDaily.vue'),
        meta: { title: '工作记录', icon: 'tree' }
      },
      {
        path: 'dataStat',
        name: '管理商家',
        component: () => import('@/views/storeManage/storeManage.vue'),
        meta: { title: '管理商家', icon: 'tree' }
      }
    ]
  },
  {
    path: '/spiderManage',
    component: Layout,
    name: '爬虫管理',
    meta: { title: '爬虫管理', icon: 'example' },
    redirect: '/spiderManage/site1',
    children: [
      {
        path: 'lastData',
        name: '最近一次数据',
        component: () => import('@/views/spiderManage/lastData/lastData.vue'),
        meta: { title: '最近一次数据', icon: 'tree' }
      },
      {
        path: 'dataStat',
        name: '爬虫日志',
        component: () => import('@/views/spiderManage/dataStat/dataStat.vue'),
        meta: { title: '爬虫日志', icon: 'tree' }
      },
      {
        path: 'setting',
        name: '设置',
        component: () => import('@/views/spiderManage/setting/setting.vue'),
        meta: { title: '设置', icon: 'tree' }
      },
    ]
  },
  {
    path: '/power',
    component: Layout,
    name: '权限管理',
    meta: { title: '权限管理', icon: 'example' },
    redirect: '/power/roleManage',
    children: [
      {
        path: 'roleManage',
        name: '角色管理',
        component: () => import('@/views/power/roleManage/roleManage.vue'),
        meta: { title: '角色管理', icon: 'tree' }
      },
      {
        path: 'staffManage',
        name: '人员管理',
        component: () => import('@/views/power/staffManage/staffManage.vue'),
        meta: { title: '人员管理', icon: 'tree' }
      }
    ]
  },
  /*{
    path: '/staff',
    component: Layout,
    name: '人员管理',
    meta: { title: '人员管理', icon: 'example' },
    redirect: '/staff/info',
    children: [
      {
        path: 'info',
        name: '人员管理',//人员信息
        component: () => import('@/views/staff/staffManage/staffManage.vue'),
        meta: { title: '人员管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/site',
    component: Layout,
    name: '站点管理',
    meta: { title: '站点管理', icon: 'table' },
    redirect: '/site/siteManage',
    children: [
      {
        path: 'siteManage',
        name: '站点管理',//优惠券信息
        component: () => import('@/views/site/siteManage/siteManage.vue'),
        meta: { title: '站点管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/shops',
    component: Layout,
    name: '商家管理',
    meta: { title: '商家管理', icon: 'example' },
    redirect: '/shops/shopsManage',
    children: [
      {
        path: 'couponManage',
        name: '商家管理',//商家信息
        component: () => import('@/views/shops/shopsManage/shopsManage.vue'),
        meta: { title: '商家管理', icon: 'example' }
      }
    ]
  },
{
  path: '/coupon',
    component: Layout,
  name: '优惠券管理',
  meta: { title: '优惠券管理', icon: 'form' },
  redirect: '/coupon/couponManage',
    children: [
  {
    path: 'couponManage',
    name: '优惠券管理',//优惠券信息
    component: () => import('@/views/coupon/couponManage/couponManage.vue'),
  meta: { title: '优惠券管理', icon: 'form' }
}
]
},*/

  { path: '/websiteFir', component: () => import('@/views/webSite/layout/layout.vue'), hidden: true },
  { path: '/websiteSec', component: () => import('@/views/webSiteSec/layout/layout.vue'), hidden: true },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

