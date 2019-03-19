// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 配置MintUI
import MintUI from 'mint-ui'
// 引入css
import 'mint-ui/lib/style.css'


// 引入自己的css
import './assets/css/global.css';

// 引入图标的css
import "./assets/ttf/iconfont.css";

// 引入自己的ul和li组件
import MyUl from '@/components/Common/MyUl';
import MyLi from '@/components/Common/MyLi';
// 注册全局组件
Vue.component(MyUl.name,MyUl);
Vue.component(MyLi.name,MyLi);
import NavBar from '@/components/Common/NavBar';
Vue.component(NavBar.name,NavBar);

import Comment from '@/components/Common/Comment';
Vue.component(Comment.name,Comment);
import MySwipe from '@/components/Common/MySwipe';
Vue.component(MySwipe.name,MySwipe);

// 全局组件结束





// 定义moment全局日期过滤器
import Moment from 'moment';

// 设置中文显示
Moment.locale('zh-cn');


// {{ 'xxx' | convertTime('yyyy-mm-dd') }}
// {{ 'xxx' | convertTime('yyyy年mm月dd日') }}
Vue.filter('convertTime',function (data,formatStr) {
  return Moment(data).format(formatStr);
});
Vue.filter('relativeTime',function (previousTime) {
  return Moment(previousTime).fromNow();
});
// 处理字符串过长的过滤器
Vue.filter('convertStr',function(str,count) {
  return str.substring(0,count) + '...';
})


// 图片预览插件
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview); // 内部运行 Vue.component('vue-preview',componentObj);





// 配置axios
import Axios from 'axios'
// 配置公共URL
Axios.defaults.baseURL = 'https://www.sinya.online/api/';
// 配置请求拦截器，显示loading图标
Axios.interceptors.request.use(function(config) {
    MintUI.Indicator.open({
       text:'玩儿命加载中...'
    });
    return config;
});
// 配置响应拦截器，关闭loading图标
Axios.interceptors.response.use(function(response) {
    //  response.config 类似 上面config
    MintUI.Indicator.close();
    return response;
});
Vue.prototype.$axios = Axios









// 安装插件 注册全局组件及挂载属性
Vue.use(MintUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
