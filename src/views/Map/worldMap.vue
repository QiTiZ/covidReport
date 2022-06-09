<template>
  <div>
    <div class="map">
      <!-- 地图数据切换 -->
      <keep-alive include="mapNewList,mapAddList">
        <component :is="comMap"></component>
      </keep-alive>

      <!-- 图例 -->
      <div class="legend"></div>

      <div class="yq-map-footer">
        <div
          class="yq-now"
          @click="gonowMap"
          :class="{ yqmapfooterchange: yqmapFooterStatus }"
        >
          现存数据
        </div>
        <div
          class="yq-history"
          @click="goAddMap"
          :class="{ yqmapfooterchange: !yqmapFooterStatus }"
        >
          历史数据
        </div>

        <div class="yq-share">
          <van-cell title="显示分享面板" @click="showShare = true" />
          <van-share-sheet
            v-model="showShare"
            title="分享疫情实时数据"
            :options="shareOptions"
            cancel-text
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mapNewList from './worldMap/worldMapNew.vue'
import mapAddList from './worldMap/worldMapAdd.vue'
export default {
  name: 'worldMap',
  data() {
    return {
      // 默认地图
      comMap: 'mapNewList',
      // 地图底部样式切换状态
      yqmapFooterStatus: true,
      showShare: false,
      shareOptions: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ]
    }
  },
  components: {
    mapNewList,
    mapAddList
  },
  methods: {
    // 现存累计地图切换
    gonowMap() {
      this.yqmapFooterStatus = true
      this.comMap = mapNewList
    },
    // 现存累计地图切换
    goAddMap() {
      this.yqmapFooterStatus = false
      this.comMap = mapAddList
    }
  }
}
</script>

<style lang="less" scoped>
// 疫情地图
.map {
  background-color: #fff;
  margin: 0 10px;
  overflow: hidden;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.legend {
  margin: 0 25px;
  height: 0.68rem;
  background: url('../../assets/images/worldLegend.png') no-repeat;
  background-size: cover;
}

.yq-map-footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 10px 10px;
  .yq-now {
    display: flex;
    background: #fff;
    text-align: center;
    font-size: 0.24rem;
    line-height: normal;
    border-radius: 0.1rem;
    position: relative;
    color: #9a9ead;
    height: 0.6rem;
    padding: 2px 8px;
    border: 1px solid #d7deeb;
    align-items: center;
    justify-content: center;
    margin-right: 0.16rem;
  }
  .yq-history {
    display: flex;
    background: #fff;
    text-align: center;
    font-size: 0.24rem;
    line-height: normal;
    border-radius: 0.1rem;
    position: relative;
    color: #9a9ead;
    height: 0.6rem;
    padding: 2px 8px;
    border: 1px solid #d7deeb;
    align-items: center;
    justify-content: center;
    margin-right: 0.16rem;
  }
  .yq-share {
    font-size: 12px;
    background-color: #4d79f3;
    color: #fff;
    font-weight: 700;
    padding: 5px 35px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    ::v-deep .van-cell {
      padding: 0;
      color: #fff;
      margin-left: 5px;
      background-color: #4d79f3;
    }
    &::before {
      content: '';
      width: 20px;
      height: 20px;
      background: url('../../assets/images/share_icon.png') 50% no-repeat;
      background-size: 100% auto;
    }
  }
  // 数据切换样式
  .yqmapfooterchange {
    background: #f1f4ff;
    color: #4d79f3 !important;
    border-color: #bdcfff;
    font-weight: bold;
    &::before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border: 1px solid #bdcfff;
      border-width: 0 0 1px 1px;
      display: block;
      top: -0.07rem;
      left: 50%;
      margin-left: -0.05rem;
      background: #f1f4ff;
      transform: rotate(135deg);
      width: 0.1rem;
      height: 0.1rem;
    }
  }
}
</style>
