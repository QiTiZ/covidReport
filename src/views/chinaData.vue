<template>
  <div>
    <covid-con :title="title">
      <div class="popupBtn" href="" @click="dataState">
        <img src="../assets/images/yq-title-right.png" alt="" />
      </div>
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

    <!-- 弹层 -->
    <van-popup class="DataTip_item" v-model="show">
      <div>
        <img
          class="close-img"
          @click="closePopup"
          src="@/assets/images/share-close.08f0789.png"
          alt=""
        />
        <div class="Data_shuoming">数据说明</div>
        <div class="DataTip_list">
          <p class="popup-title">
            【现有确诊数据说明】<br />
            1、各省、市的现有确诊=累计确诊-累计治愈-累计死亡；<br />
            2、部分省份的治愈和死亡人数分布状况公布不充分，其下辖市/区的已知治愈与死亡人数小于实际人数，导致出现：<br />
            a)市/区的现有确诊总和大于全省/直辖市的现有确诊总数； <br />
            b)待确认的现有确诊为负数，因此展示为0
          </p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getFyData } from '../utils/getFyList.js'

export default {
  name: 'province31List',
  data() {
    return {
      title: '国内各地区疫情统计汇总',
      cityName: '省市区',
      recentProvinceList: [],
      showTotal: 10,
      showAllListBtn: true,
      show: false
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

      this.recentProvinceList = covidDataJson.data.list

      function sortId(a, b) {
        return b.conadd - a.conadd
      }

      this.recentProvinceList.sort(sortId)
    },
    showAllList() {
      this.showTotal = this.recentProvinceList.length
      this.showAllListBtn = false
    },
    // 数据说明遮罩层
    dataState() {
      this.show = true
    },
    // 点击关闭遮罩层
    closePopup() {
      this.show = false
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
