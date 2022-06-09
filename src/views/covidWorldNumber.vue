<template>
  <div v-if="fyList">
    <covid-con :title="title">
      <span class="dateStatistics">{{ fyList.data.times }}数据统计</span>
      <div class="popupBtn" href="" @click="dataState">
        <img src="../assets/images/yq-title-right.png" alt="" />
      </div>
      <div class="yq-list">
        <div class="yq-item">
          <h5>新增确诊</h5>
          <span>
            <b style="color: #c96161">{{
              fyList.data.othertotal.certain_inc.slice(1)
            }}</b>
          </span>
        </div>
        <div class="yq-item">
          <h5>新增死亡</h5>
          <span>
            <b style="color: #4d5054">{{
              fyList.data.othertotal.die_inc.slice(1)
            }}</b>
          </span>
        </div>
        <div class="yq-item">
          <h5>现存确诊</h5>
          <span>
            <b style="color: #ff3535">{{
              fyList.data.othertotal.certain -
              fyList.data.othertotal.die -
              fyList.data.othertotal.recure
            }}</b>
          </span>
        </div>
        <div class="yq-item">
          <h5>累计确诊</h5>
          <span>
            <b style="color: #b10000">{{ fyList.data.othertotal.certain }}</b>
          </span>
          <span class="contrast"
            >较昨日<code>{{ fyList.data.othertotal.certain_inc }}</code>
          </span>
        </div>
        <div class="yq-item">
          <h5>累计治愈</h5>
          <span>
            <b style="color: #13b593">{{ fyList.data.othertotal.recure }}</b>
          </span>
          <span class="contrast"
            >较昨日<code>{{ fyList.data.add_daily.addcure_new }}</code>
          </span>
        </div>
        <div class="yq-item">
          <h5>累计死亡</h5>
          <span>
            <b style="color: #666666">{{ fyList.data.othertotal.die }}</b>
          </span>
          <span class="contrast"
            >较昨日<code>{{ fyList.data.othertotal.die_inc }}</code>
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
            国外数据说明:
            <br />
            a)数据来源：国外疫情数据来自权威机构的公开报道、世卫组织（WHO）、各国官方通报；<br />
            b)统计口径：因各国分不同时区，疫情数据日期统一采用北京时间的日期；新增数据与趋势图数据为昨日数据与前日数据相减的结果，每天更新一次；<br />
            c)更新时间：国外疫情数据因追踪、核实需要，与各国官方的发布时间相比较有一定的延迟。
            <br /><br />
          </p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getFyData } from '../utils/getFyList.js'

export default {
  name: 'worldNumber',
  data() {
    return {
      title: '国外疫情',
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

      this.fyList = fyLisyJson
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
.dateStatistics {
  left: 90px;
}
</style>
