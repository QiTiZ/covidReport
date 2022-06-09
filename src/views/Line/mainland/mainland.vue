<template>
  <div>
    <covid-con :title="title">
      <span class="caseShare">分享</span>
      <div class="newAdd-line" ref="lineRef"></div>
    </covid-con>
    <!-- 切换图表 -->
    <div class="change-btn">
      <div
        class="btn"
        @click="go('new')"
        :class="{ btnActive: changeBtnStatus1 }"
      >
        <div>新增</div>
        <div>本土趋势</div>
      </div>
      <div
        class="btn"
        @click="go('jw')"
        :class="{ btnActive: changeBtnStatus2 }"
      >
        <div>境外输入</div>
        <div>新增趋势</div>
      </div>
      <div class="btn" @click="go" :class="{ btnActive: changeBtnStatus3 }">
        <div>境外输入</div>
        <div>省级TOP10</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFyData, getJWSRTop10 } from '@/utils/getFyList.js'
import { init } from '@/assets/js/initChart.js'

import '@/assets/css/btnChange.less'

export default {
  name: '',
  data() {
    return {
      title: '近期新增本土趋势',
      chartsInstance: null,
      covidData: null,
      covidJwTop: null,
      xDateMainland: null,
      changeBtnStatus1: true,
      changeBtnStatus2: false,
      changeBtnStatus3: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
      this.getData()
    })
  },
  methods: {
    initChart() {
      this.chartsInstance = this.$echarts.init(this.$refs.lineRef)

      const initOption = init
      this.chartsInstance.setOption(initOption)
    },
    async getData() {
      const { data: res } = await getFyData()
      this.covidData = JSON.parse(res.slice(13, -2))

      // 境外输入TOP10
      const { data: resTop } = await getJWSRTop10()
      this.covidJwTop = resTop

      this.upDataList()
    },
    // 本土新增
    upDataList() {
      // 时间
      const mainlandDate = this.covidData.data.historylist.map((item) => {
        return item.date
      })
      this.xDateMainland = mainlandDate.reverse().slice(300)

      const mainlandAddData = this.covidData.data.historylist.map((item) => {
        return item.cn_local_conNum
      })
      this.seriesDataMainlandAdd = mainlandAddData.reverse().slice(300)

      const upDataOption = {
        xAxis: {
          data: this.xDateMainland
        },
        series: [
          {
            name: '新增本土',
            data: this.seriesDataMainlandAdd,
            itemStyle: {
              color: '#a48256'
            }
          }
        ]
      }
      this.chartsInstance.setOption(upDataOption)
    },
    // 境外新增
    upDataJw() {
      const jwstData = this.covidData.data.historylist.map((item) => {
        return item.cn_addjwsrNum
      })
      const seriesDataJwsr = jwstData.reverse().slice(300)

      const upDataOption = {
        xAxis: {
          data: this.xDateMainland
        },
        series: [
          {
            name: '新增境外',
            data: seriesDataJwsr,
            itemStyle: {
              color: '#ffa200'
            }
          }
        ]
      }

      this.chartsInstance.setOption(upDataOption)
    },
    // 境外TOP
    upDataJwTop() {
      // 城市
      const JwTopProvince = this.covidJwTop.result.data.map((item) => {
        return item.from
      })
      // 数据
      const seriesDataTop = this.covidJwTop.result.data.map((item) => {
        return item.certain
      })

      const upDataOption = {
        xAxis: {
          data: JwTopProvince,
          axisLabel: {
            interval: 0
          }
        },
        tooltip: {
          trigger: 'item',
          borderColor: '#999',
          formatter: (e) => {
            return `<div>${e.name}</div>  <span>${e.marker}</span></span><span>${e.value}</span>`
          }
        },
        series: [
          {
            name: '',
            type: 'bar',
            data: seriesDataTop,
            itemStyle: {
              color: (e) => {
                const value = e.value
                if (value > 2000) {
                  return '#da2824'
                } else if (value > 0) {
                  return '#f6b16b'
                }
              }
            },
            barWidth: '46%'
          }
        ]
      }

      this.chartsInstance.setOption(upDataOption)
    },
    // 切换图表
    go(e) {
      this.chartsInstance.dispose()
      this.initChart()

      if (e === 'new') {
        this.changeBtnStatus1 = true
        this.changeBtnStatus2 = false
        this.changeBtnStatus3 = false
        this.title = '近期新增本土趋势'
        this.upDataList()
      } else if (e === 'jw') {
        this.changeBtnStatus1 = false
        this.changeBtnStatus2 = true
        this.changeBtnStatus3 = false
        this.title = '近期境外输入新增趋势'
        this.upDataJw()
      } else {
        this.changeBtnStatus1 = false
        this.changeBtnStatus2 = false
        this.changeBtnStatus3 = true
        this.title = '境外输入累计确诊省Top10'
        this.upDataJwTop()
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
