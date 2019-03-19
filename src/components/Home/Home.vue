<template>
    <div>
      
      <my-swipe url="getlunbo" />
      
      <div class="grid">
          <my-ul>
            <my-li v-for="(grid,index) in grids" :key="index"> 
                <router-link :to="grid.router">
                  <span :class="grid.className"></span>
                  <div>{{grid.title}}</div>
                </router-link>
            </my-li>
          </my-ul>
      </div>



    </div>
</template>
<script>
export default {
  data () {
    return {
      imgs:[], //轮播图数据
      grids:[
        { className:'cms-news',title:'新闻资讯',router:{name:'news.list'}},
        { className:'cms-photo',title:'图文分享',router:{name:'photo.list',params:{categoryId:0} }},
        { className:'cms-goods',title:'商品展示',router:{name:'goods.list',query:{id:1} }},
        { className:'cms-feedback',title:'留言反馈',
        router:{name:'news.list'}},
        { className:'cms-search',title:'搜索资讯',
        router:{name:'news.list'}},
        { className:'cms-callme',title:'联系我们',router:{name:'news.list'}},
      ]
    }
  },
  // created创建组件的生命周期函数中，可以操作数据
  created () {
    // this.imgs = [];
    // this.imgs = ['a','b'];
    // this.imgs = []; 
  }
}
</script>
<style scoped>

  /*相当于全局*/
/*  div {
    background-color: red;
  }*/

/*九宫格样式*/
.grid span {
    display: inline-block;
    margin: 10px 0;
    width: 50px;
    height: 50px;
    background-repeat: round;
}
a {
  text-decoration: none;
}

/*九宫格图片*/
.cms-news {
  background-image: url(../../assets/img/news.png);
}
.cms-photo {
  background-image: url(../../assets/img/picShare.png);
}
.cms-goods {
  background-image: url(../../assets/img/goodsShow.png);
}
.cms-feedback {
  background-image: url(../../assets/img/feedback.png);
}
.cms-search {
  background-image: url(../../assets/img/search.png);
}
.cms-callme {
  background-image: url(../../assets/img/callme.png);
}





</style>
