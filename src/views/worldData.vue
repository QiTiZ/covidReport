<template>
  <div>
    <covid-con :title="title">
      <span class="caseShare">分享</span>
      <covid-all-data
        :cityName="cityName"
        :tableList="recentProvinceList"
        :showTotal="showTotal"
      ></covid-all-data>
      <div class="showAllList" v-show="showAllListBtn" @click="showAllList">
        <span>展开更多</span>
        <img src="../assets/images/ic_arrow_more_1.png" alt="" />
      </div>
    </covid-con>
  </div>
</template>

<script>
import { getFyData } from '../utils/getFyList.js'

export default {
  name: 'province31List',
  data() {
    return {
      title: '国外各国家疫情统计汇总 ',
      cityName: '国家',
      recentProvinceList: [],
      showTotal: 10,
      showAllListBtn: true
    }
  },
  created() {
    this.getCovidList()
  },
  mounted() {},
  methods: {
    // 获取31省市最新疫情数据
    async getCovidList() {
      const { data: res } = await getFyData()
      const covidDataJson = JSON.parse(res.slice(13, -2))

      this.recentProvinceList = covidDataJson.data.otherlist
      function sortId(a, b) {
        return b.conNum - a.conNum
      }

      this.recentProvinceList.sort(sortId)
    },
    showAllList() {
      this.showTotal = this.recentProvinceList.length
      this.showAllListBtn = false
    }
  }
}
</script>

<style lang="less" scoped>
.showAllList {
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  padding-bottom: 10px;
  span {
    font-size: 14px;
  }
  img {
    width: 15px;
    height: 15px;
  }
}
</style>
