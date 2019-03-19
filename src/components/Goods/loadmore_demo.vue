<template>
  <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" @top-status-change="handleTopChange" ref="loadmore">
    <ul>
      <li v-for="item in list" :key="item">{{ item }}</li>
    </ul>
    <div slot="top" class="mint-loadmore-top">
      <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
      <span v-show="topStatus === 'loading'">Loading...</span>
    </div>
  </mt-loadmore>
</template>
<script>
  export default {
    data() {
      return {
        list:[1,2,3,4,5,6],
        topStatus: '',
        // ...
      };
    },
    methods: {
      handleTopChange(status) {
        this.topStatus = status;
        console.log(status);
      },
      loadTop() {
        console.log('函数调用被触发了');
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {
        console.log('上拉函数调用了');
        // this.$refs.loadmore.onBottomLoaded();  注释以后卡住
        // 正确的方式是给list加元素，直到加满为止
      }
      // ...
    },
    // ...
  };
</script>