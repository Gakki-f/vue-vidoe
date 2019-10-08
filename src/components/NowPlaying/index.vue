<template>
  <div class="movie_body">
    <Scroll
      class="scroll"
      :probeType="3"
      ref="scroll"
      @scroll="pullingDown"
      @touchEnd="touchEnd"
    >
      <ul>
        <li class="pullDown">{{ pullDownMsg }}</li>
        <li v-for="item in movieList" :key="item.id">
          <div class="pic_show">
            <img :src="item.img | setWH('128.180')" @tap="handleTap" />
          </div>
          <div class="info_list">
            <h2>
              {{item.nm}}
              <img v-if="item.version" src="@/assets/maxs.png" />
            </h2>
            <p>
              观众评
              <span class="grade">{{item.sc}}</span>
            </p>
            <p>主演: {{item.star}}</p>
            <p>{{item.showInfo}}</p>
          </div>
          <div class="btn_mall">购票</div>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "@/components/scroll/Scroll";
export default {
  name: "NowPlaying",
  data() {
    return {
      movieList: [],
      pullDownMsg : ''
    };
  },
  components: {
    Scroll
  },
  methods: {
      handleTap(){
          console.log('---');
      },
      pullingDown(position){
          if(position.y>30){
              this.pullDownMsg="正在更新中~"
          }
      },
      touchEnd(position){
          if(position.y>30){
             this.axios.get('/api/movieOnInfoList?cityId=11').then((res)=>{
                                const msg = res.data.msg;
                                if( msg === 'ok' ){
                                    this.pullDownMsg = '更新成功';
                                    setTimeout(()=>{
                                        this.movieList = res.data.data.movieList;
                                        this.pullDownMsg = '';
                                    },1000);
                                    
                                }
                            });
          }
      }
      
  },
  mounted() {
    this.axios.get("/api/movieOnInfoList?cityId=10").then(res => {
      const msg = res.data.msg;
      if (msg == "ok") {
        this.movieList = res.data.data.movieList;
      }
    });
   
  },
};
</script>
<style scoped>
.pullDown{
    justify-content: center;
    font-size: 16px;
    color:rgb(97, 107, 3);
    font-weight: bold;
    margin: 0!important;
    padding: 0!important;
    border: none!important;
    line-height: 1;
}
.scroll {
  height: 100%;
  overflow: hidden;
}
.movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
</style>