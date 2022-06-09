<template>
  <div>
    <covid-con :title="title">
      <div class="topBar" ref="lineRef"></div>
    </covid-con>
    <!-- 切换图表 -->
    <div class="change-btn">
      <div
        class="btn"
        @click="go('nation')"
        :class="{ btnActive: changeBtnStatus1 }"
      >
        <div>海外昨日</div>
        <div>新增TOP10</div>
      </div>
      <div
        class="btn"
        @click="go('sus')"
        :class="{ btnActive: changeBtnStatus2 }"
      >
        <div>海外七日</div>
        <div>增幅TOP10</div>
      </div>
      <div
        class="btn"
        @click="go('add')"
        :class="{ btnActive: changeBtnStatus3 }"
      >
        <div>海外治愈率</div>
        <div>TOP10</div>
      </div>
      <div
        class="btn"
        @click="go('percent')"
        :class="{ btnActive: changeBtnStatus4 }"
      >
        <div>海外死亡率</div>
        <div>TOP10</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getWorldTop,
  getWorldPercentTop,
  getFyData
} from '@/utils/getFyList.js'
import { barInit } from '@/assets/js/barChart.js'
import '@/assets/css/btnChange.less'

export default {
  name: '',
  data() {
    return {
      title: '海外昨日新增TOP10',
      chartsInstance: null,
      covidData: null,
      worldNew: null,
      worldSevenAdd: [],
      changeBtnStatus1: true,
      changeBtnStatus2: false,
      changeBtnStatus3: false,
      changeBtnStatus4: false
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

      const initOption = barInit
      this.chartsInstance.setOption(initOption)
    },
    async getData() {
      const { data: res } = await getWorldTop()
      const { data: resPercent } = await getWorldPercentTop()
      const { data: resData } = await getFyData()

      this.worldNew = JSON.parse(res.slice(17, -14))
      this.worldSevenAdd = JSON.parse(resPercent.slice(21, -14))
      this.covidData = JSON.parse(resData.slice(13, -2))

      this.upDataYesterday()
    },
    // 海外新增
    upDataYesterday() {
      const worldNewAddData = this.worldNew.result.data.multi_historylist.map(
        (item) => {
          return item.name
        }
      )
      const seriesDataNewAdd = this.worldNew.result.data.multi_historylist.map(
        (item) => {
          return item.sortvalue
        }
      )

      const upDataOption = {
        yAxis: {
          data: worldNewAddData
        },
        tooltip: {
          formatter: (e) => {
            return `<div>${e[0].name}</div> <span>${e[0].marker}</span> <span style="font-size:10px;">昨日新增: ${e[0].value}</span>`
          }
        },
        series: [
          {
            data: seriesDataNewAdd,
            itemStyle: {
              color: 'rgb(248, 104, 100)'
            }
          }
        ]
      }

      this.chartsInstance.setOption(upDataOption)
    },
    // 海外七日增幅TOP
    upDataSevenTOP() {
      const worldRateyData =
        this.worldSevenAdd.result.data.multi_historylist.map((item) => {
          return item.name
        })

      const seriesDataRate =
        this.worldSevenAdd.result.data.multi_historylist.map((item) => {
          return item.sortvalue
        })

      // 格式化百分比
      const worldData = []
      for (var i = 0; i < seriesDataRate.length; i++) {
        worldData.push((seriesDataRate[i] * 100).toFixed(2))
      }
      const worldDataSevenTop = worldData

      const upDataOption = {
        yAxis: {
          data: worldRateyData
        },
        grid: {
          left: '-19%'
        },
        tooltip: {
          formatter: (e) => {
            return `<div>${e[0].name}</div> <span>${e[0].marker}</span> <span style="font-size:10px;">七日增幅: ${e[0].value}%</span>`
          }
        },
        series: [
          {
            data: worldDataSevenTop,
            itemStyle: {
              color: 'rgb(248, 104, 100)'
            }
          }
        ]
      }

      this.chartsInstance.setOption(upDataOption)
    },
    // 海外治愈率
    upDataCurePercent() {
      // 治愈百分比排行
      const zyPercentData = this.covidData.data.otherlist.map((item) => {
        return {
          name: item.name,
          ppp: +item.cureNum / item.conNum
        }
      })
      function sortId(a, b) {
        return b.ppp - a.ppp
      }

      zyPercentData.sort(sortId)

      const zyTOP = zyPercentData.slice(1, 11)

      const worldZyRateName = zyTOP.map((item) => {
        return item.name
      })

      const worldZyRateSeries = zyTOP.map((item) => {
        return (item.ppp * 100).toFixed(2)
      })

      const upDataOption = {
        yAxis: {
          data: worldZyRateName
        },
        grid: {
          left: '-16%',
          right: '15%'
        },
        tooltip: {
          formatter: (e) => {
            return `<div>${e[0].name}</div> <span>${e[0].marker}</span> <span style="font-size:10px;">治愈率: ${e[0].value}%</span>`
          }
        },
        series: [
          {
            data: worldZyRateSeries,
            itemStyle: {
              color: '#538f5a'
            }
          }
        ]
      }

      this.chartsInstance.setOption(upDataOption)
    },
    // 海外死亡率
    upDataDeathPercent() {
      const swPercentData = this.covidData.data.otherlist.map((item) => {
        return {
          name: item.name,
          ppp: +item.deathNum / item.conNum
        }
      })
      function sortSW(a, b) {
        return b.ppp - a.ppp
      }
      swPercentData.sort(sortSW)

      const swTOP = swPercentData.slice(1, 11)
      const worldSwRateName = swTOP.map((item) => {
        return item.name
      })

      const worldSwRateSeries = swTOP.map((item) => {
        return (item.ppp * 100).toFixed(2)
      })

      const upDataOption = {
        yAxis: {
          data: worldSwRateName
        },
        grid: {
          left: '-16%'
        },
        tooltip: {
          formatter: (e) => {
            return `<div>${e[0].name}</div> <span>${e[0].marker}</span> <span style="font-size:10px;">死亡率: ${e[0].value}%</span>`
          }
        },
        series: [
          {
            data: worldSwRateSeries,
            itemStyle: {
              color: '#666666'
            }
          }
        ]
      }

      this.chartsInstance.setOption(upDataOption)
    },
    // 切换图表
    go(e) {
      this.chartsInstance.dispose()
      this.initChart()

      if (e === 'nation') {
        this.changeBtnStatus1 = true
        this.changeBtnStatus2 = false
        this.changeBtnStatus3 = false
        this.changeBtnStatus4 = false

        this.title = '海外昨日新增TOP10'
        this.upDataYesterday()
      } else if (e === 'sus') {
        this.changeBtnStatus1 = false
        this.changeBtnStatus2 = true
        this.changeBtnStatus3 = false
        this.changeBtnStatus4 = false

        this.title = '海外七日增幅TOP10'
        this.upDataSevenTOP()
      } else if (e === 'add') {
        this.changeBtnStatus1 = false
        this.changeBtnStatus2 = false
        this.changeBtnStatus3 = true
        this.changeBtnStatus4 = false

        this.title = '海外治愈率TOP10'
        this.upDataCurePercent()
      } else {
        this.changeBtnStatus1 = false
        this.changeBtnStatus2 = false
        this.changeBtnStatus3 = false
        this.changeBtnStatus4 = true

        this.title = '海外死亡率TOP10'
        this.upDataDeathPercent()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.topBar {
  height: 240px;
}

.subTitle {
  margin: 10px 0 0 5px;
  font-size: 10px;
  color: #999;
}
</style>
