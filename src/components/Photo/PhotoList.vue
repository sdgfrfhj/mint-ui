<template>
    <div>
        <nav-bar title="图文列表"/>

        <!-- 引入返回导航 -->
        <div class="photo-header">
            <ul>
                <li v-for="c in categorys" :key="c.id">
                    <a @click="loadImgsByCategoryId(c.id)" href="javascript:;">{{c.title}}</a>
                </li>
            </ul>
        </div>
        <!-- 下方的图片 -->
        <div class="photo-list">
            <ul>
                <li v-for="img in imgs" :key="img.id">
                <!-- 关于value是否给单引号的问题: 给了是字符串，不给是从vue中获取数据 -->
                    <router-link :to="{name:'photo.detail',query:{id:img.id} }">
                        <img v-lazy="img.img_url">
                        <p>
                            <span>{{img.title}}</span>
                            <br>
                            <span>{{img.zhaiyao}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            imgs:[],// 图片数据
            categorys:[],// 分类信息
        }
    },
    beforeRouteUpdate (to, from, next) {   
    // 开课吧老师总结一句话: 路由复用，但参数改变触发，
    // 参数指的是:query||params
    // console.log(to);
    this.loadImgById(to.params.categoryId);
    next();
    },
    created() {  
        // 1: 获取路由参数categoryId
        let categoryId = this.$route.params.categoryId;
        this.loadImgById(categoryId);
        // 2 获取分类信息
        this.$axios.get('/getimgcategory')
        .then(res=>{
            this.categorys = res.data.message;

            // 向数组的第一个元素添加一个全部
            this.categorys.unshift({
                id:0,title:'全部'
            });


        })
        .catch(err=>console.log('分类信息获取失败',err));
    }
    ,methods: {
        loadImgsByCategoryId (categoryId) {

            this.$router.push({
                name:'photo.list',
                params:{
                    categoryId
                }
            });    
        },
        // 通过id获取数据
        loadImgById(id) {
            // 2: 通过url拼接参数发请求
            this.$axios.get('getimages/' + id)
            .then(res => {
                this.imgs = res.data.message;
                // 判断是否imgs.length== 0
                if (this.imgs.length === 0) {
                    // iconfont icon-debug
                    this.$toast({
                      message: '没有图片了!',
                      iconClass: 'iconfont icon-debug'
                    });
                }
            })
            .catch(err => console.log('图片列表获取失败',err));
            // 3: 获取数据做渲染
        }
    }
}

</script>
<style>
.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
}


/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}
/*图片懒加载样式*/
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}


</style>
