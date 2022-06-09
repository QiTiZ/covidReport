<template>
  <div v-if="fyList">
    <covid-con :title="title">
      <span class="dateStatistics">{{ fyList.data.times }}数据统计</span>
      <div class="popupBtn" href="" @click="dataState">
        <img src="../assets/images/yq-title-right.png" alt="" />
      </div>
      <div class="yq-list">
        <div class="yq-item">
          <h5>新增本土确诊</h5>
          <span>
            <b style="color: #a48256">{{ fyList.data.localconNum }}</b>
          </span>
        </div>
        <div class="yq-item">
          <h5>新增确诊</h5>
          <span>
            <b style="color: #c96161">{{ fyList.data.add_daily.addcon }}</b>
          </span>
        </div>
        <div class="yq-item">
          <h5>新增境外</h5>
          <span>
            <b style="color: #ffa200">{{
              fyList.data.add_daily.addjwsr_new
            }}</b>
          </span>
        </div>
        <div class="yq-item">
          <h5>新增无症状</h5>
          <span>
            <b style="color: #8a38a1">{{ fyList.data.addAsymNum }}</b>
          </span>
        </div>
        <div class="yq-item">
          <h5>现存本土确诊</h5>
          <span>
            <b style="color: #b8540e">{{ fyList.data.locIncrNum }}</b>
          </span>
        </div>
        <div class="yq-item">
          <h5>现存确诊</h5>
          <span>
            <b style="color: #ff3535">{{ fyList.data.econNum }}</b>
          </span>
        </div>
        <div class="yq-item">
          <h5>现存无症状</h5>
          <span>
            <b style="color: #ff3535">{{ fyList.data.asymptomNum }}</b>
          </span>
        </div>
        <div class="yq-item">
          <h5>现存疑似</h5>
          <span>
            <b style="color: #a36fff">{{ fyList.data.sustotal }}</b>
          </span>
        </div>
        <div class="yq-item">
          <h5>累计确诊</h5>
          <span>
            <b style="color: #b10000">{{ fyList.data.gntotal }}</b>
          </span>
          <span class="contrast"
            >较昨日<code>{{ fyList.data.add_daily.addcon_new }}</code>
          </span>
        </div>
        <div class="yq-item">
          <h5>累计境外输入</h5>
          <span>
            <b style="color: #fe6b22">{{ fyList.data.jwsrNum }}</b>
          </span>
          <span class="contrast"
            >较昨日<code>{{ fyList.data.add_daily.addjwsr }}</code>
          </span>
        </div>
        <div class="yq-item">
          <h5>累计治愈</h5>
          <span>
            <b style="color: #13b593">{{ fyList.data.curetotal }}</b>
          </span>
          <span class="contrast"
            >较昨日<code>{{ fyList.data.add_daily.addcure_new }}</code>
          </span>
        </div>
        <div class="yq-item">
          <h5>累计死亡</h5>
          <span>
            <b style="color: #666666">{{ fyList.data.deathtotal }}</b>
          </span>
          <span class="contrast"
            >较昨日<code>{{ fyList.data.add_daily.adddeath_new }}</code>
          </span>
        </div>
      </div>
      <div class="yq-line"></div>
      <div class="yq-bottom">
        <span>疫情动态追踪</span>
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
            1、数据来源：<br />
            来自国家卫健委、各省市区卫健委、各省市区政府、港澳台官方渠道公开数据；<br /><br />
            2、数据统计原则：
            <br />
            a)每日上午全国数据会优先使用国家卫健委公布的数据（此时各省市数据尚未及时更新，会出现全国数据大于各省份合计数的情况）；<br />
            b)当各省公布数据总和大于国家卫健委公布的数据时，则全国数据切换为各省合计数；<br />
            c) 全国数据含港澳台地区数据；
            <br /><br />
            3、数据更新时间：<br />
            实时更新全国、各省市区数据，因需要核实计算，与官方发布的时间相比，将有一定的时间延迟；
            <br /><br />
            4、“较昨日”的新增确诊、新增无症状等数据来源于卫健委发布的新增病例数，其含义是由（各省）卫健委公布的最新数据减去前一日对应的数据所得；由于各省卫健委公布时间及方式各不相同且存在核减情况，故而部分数据可能会有一定的时间延迟；<br /><br />
            6、本网站全力以赴提供权威、准确、及时的疫情数据，如有任何疑问，欢迎通过本网站留言反馈。
          </p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getFyData } from '../utils/getFyList.js'

export default {
  name: 'numberCon',
  data() {
    return {
      title: '全国(含港澳台)',
      // 疫情数据
      fyList: '',
      show: false
    }
  },
  created() {
    this.getFyList()
  },
  methods: {
    // 获取疫情数据
    async getFyList() {
      const { data: res } = await getFyData()
      const fyLisyJson = JSON.parse(res.slice(13, -2))

      if (fyLisyJson.status.msg !== 'success') {
        return this.$toast.fail('获取数据失败')
      }
      this.fyList = fyLisyJson
    },
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
.yq-item {
  width: 25%;
}
</style>
