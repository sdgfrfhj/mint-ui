<template>
    <div>  
        
        <nav-bar title="图文详情" />
        <div class="photo-title">
            <p>{{info.title}}</p>
            <span>发起日期：{{info.add_time | convertTime('YYYY-MM-DD')}}</span>
            <span>{{info.click}}次浏览</span>
            <span>分类：民生经济</span>
        </div>
       <!--  <ul>
            <vue-preview :slides="imgs" ></vue-preview>
            <li v-for="(img,index) in imgs" :key="index">
                <img :src="img.src">
            </li>    
        </ul> -->
    

        <vue-preview :slides="imgs" ></vue-preview>

        <div class="photo-desc">
            <p v-html="info.content"></p>
        </div>


        <!-- 使用评论组件 -->
        <comment :cid="$route.query.id"/>

    </div>
</template>
<script>
export default {
    data () {
        return {
            info: {}, //图文详情数据
            imgs:[],// 缩略图
        }
    },
    created () {
        let id = this.$route.query.id;
        // 发起请求 获取详情
        this.$axios.get('getimageInfo/' + id)
        .then( res => {
            // 数据结构是一个数组，为了方便直接取0 ，并且数据库结构是一致的
            this.info = res.data.message[0];
        })
        .catch ( err => console.log('图文详情获取失败！',err));

        // 获取缩略图
        this.$axios.get('getthumimages/' + id)
        .then( res => {
            this.imgs = res.data.message;

            this.imgs.forEach(img => {
                img.msrc = img.src;
                img.w = 600;
                img.h = 400;
            });


        })
        .catch( err => console.log('图片缩略图获取失败！',err));
    }
}
</script>
<style scoped>
li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-title {
    overflow: hidden;
}

.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}

.photo-title span {
    margin-right: 20px;
}

.photo-desc p {
    font-size: 18px;
}

</style>
