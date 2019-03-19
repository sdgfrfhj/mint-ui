<template>
    <div class="tmpl">
        <nav-bar :title="title"/>

        <div class="news-title">
            <p>{{newsDetail.title}}</p>
            <div>
                <span>{{newsDetail.click}}次点击</span>
                <span>分类:民生经济</span>
                <span>添加时间:{{newsDetail.add_time | convertTime('YYYY年MM月DD日')}}</span>
            </div>
        </div>
        <div class="news-content" v-html="newsDetail.content"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            title:'',// 变化的标题
            newsDetail:{},// 新闻详情
        }
    },
    created () {
        // 获取路由查询字符串参数id
        let id = this.$route.query.id;

        this.$axios.get('getnew/' + id) 
        .then( res => {
               this.newsDetail = res.data.message[0]; 
        })
        .catch( err => console.log(err));
    },
    // 路由确认前，组件渲染前的守卫函数
    beforeRouteEnter (to, from, next) {

        console.log(from.name);

// news.detail
// photo.info
        // 1: 判断from 万一from的name是空，说明，是粘贴地址栏
        //      1.1： 继续判断， 根据to来设置title
        // 2: 如果from 是新闻列表，  就给title为新闻详情
        // 3: 如果from 是商品详情， 就给title是商品图文介绍
        let title = '';
        if (from.name == null) {
            if (to.name === 'news.detail') {
                title = '新闻详情';
            } else if (to.name === 'photo.info') {
                title = '商品图文介绍';
            }
        } else if (from.name === 'news.list') {
            title = '新闻详情';
        } else if (from.name === 'goods.detail') {
            title = '商品图文介绍';
        } 
       
        // 最终都放行 ，大不了赋值一个title为空串
        next(vm => {
            vm.title = title;  // vm 就是未来组件对象的this
        });
    }
}


</script>
<style scoped>
.news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
}

.news-title span {
    margin-right: 30px;
}

.news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}


/*主体文章的左右距离*/

.news-content {
    padding: 10 5;
}

</style>
