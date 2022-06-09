<template>
  <div>
    <section class="news" @click="goQuickNews">
      <div class="fast-news">
        <div class="fast-news-img">
          <img src="../assets/images/quick-news.png" alt="" />
        </div>
        <div class="fast-colum">
          <div class="fast-theme">
            <van-swipe
              style="height: 52px"
              vertical
              autoplay="4000"
              loop
              touchable
            >
              <van-swipe-item>{{ fastNewsList[0] }}</van-swipe-item>
              <van-swipe-item>{{ fastNewsList[1] }}</van-swipe-item>
              <van-swipe-item>{{ fastNewsList[2] }}</van-swipe-item>

              <template #indicator>
                <div></div>
              </template>
            </van-swipe>
          </div>
        </div>
        <div class="fast-icon">
          <img src="../assets/images/fast-news-right.png" alt="" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getFastNews } from '../utils/getFyList.js'

export default {
  name: 'quickNews',
  data() {
    return {
      // 资讯
      fastNewsList: []
    }
  },
  created() {
    this.getFastnews()
  },
  methods: {
    // 获取快讯新闻
    async getFastnews() {
      const { data: res } = await getFastNews()

      const allFastNews = res.data.data.map((item) => {
        return item.item.info.title
      })
      this.fastNewsList = allFastNews
    },
    // 去往抗疫快讯
    goQuickNews() {
      this.$toast({
        message: '爱你哟',
        icon: 'like-o'
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 快讯
.news {
  width: 100%;
  height: 55px;
  background-color: #fff;
  .fast-news {
    padding: 2px 10px;
    display: flex;
    .fast-news-img {
      img {
        width: 50px;
        height: 50px;
      }
    }
    .fast-colum {
      padding: 2px 15px;
      line-height: 25px;
      height: 50px;
      overflow: hidden;
      .fast-theme {
        font-size: 14px;
      }
    }
    .fast-icon {
      position: relative;
      img {
        position: absolute;
        right: 2px;
        top: 20px;
        width: 10px;
        height: 10px;
      }
    }
  }
}
</style>
