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
        @click="go('nation')"
        :class="{ btnActive: changeBtnStatus1 }"
      >
        <div>全国疫情</div>
        <div>新增趋势</div>
      </div>
      <div
        class="btn"
        @click="go('sus')"
        :class="{ btnActive: changeBtnStatus2 }"
      >
        <div>全国确诊</div>
        <div>疑似趋势</div>
      </div>
      <div
        class="btn"
        @click="go('add')"
        :class="{ btnActive: changeBtnStatus3 }"
      >
        <div>全国累计</div>
        <div>治愈死亡</div>
      </div>
      <div
        class="btn"
        @click="go('percent')"
        :class="{ btnActive: changeBtnStatus4 }"
      >
        <div>治愈率</div>
        <div>死亡率</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFyData } from '@/utils/getFyList.js'
import { init } from '@/assets/js/initChart.js'
import '@/assets/css/btnChange.less'

export default {
  name: '',
  data() {
    return {
      title: '全国 总新增/新增境外输入 确诊趋势',
      chartsInstance: null,
      covidData: null,
      xDateMainland: null,
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

      const initOption = init

      this.chartsInstance.setOption(initOption)
    },
    async getData() {
      const { data: res } = await getFyData()
      this.covidData = JSON.parse(res.slice(13, -2))

      this.upDataTotal()
    },
    // 总新增+新增境外
    upDataTotal() {
      const mainlandDate = this.covidData.data.historylist.map((item) => {
        return item.date
      })
      this.xDateMainland = mainlandDate.reverse().slice(300)

      const seriesData = this.covidData.data.historylist.map((item) => {
        return item.cn_conadd
      })
      const newAddTotal = seriesData.reverse().slice(300)

      const seriesData2 = this.covidData.data.historylist.map((item) => {
        return item.cn_addjwsrNum
      })
      const newAddJw = seriesData2.reverse().slice(300)

      const upDataOption = {
        xAxis: {
          data: this.xDateMainland
        },
        series: [
          {
            name: '总新增确诊',
            data: newAddTotal,
            itemStyle: {
              color: '#c96161'
            }
          },
          {
            name: '新增境外输入',
            data: newAddJw,
            itemStyle: {
              color: '#ffb842'
            }
          }
        ]
      }
      this.chartsInstance.setOption(upDataOption)
    },
    // 现有+疑似+累计
    upDataJw() {
      const seriesData3 = this.covidData.data.historylist.map((item) => {
        return item.cn_econNum
      })
      const nowqzData = seriesData3.reverse().slice(300)

      const seriesData4 = this.covidData.data.historylist.map((item) => {
        return item.cn_susNum
      })
      const susData = seriesData4.reverse().slice(300)

      const seriesData5 = this.covidData.data.historylist.map((item) => {
        return item.cn_conNum
      })
      const leijiData = seriesData5.reverse().slice(300)

      const upDataOption = {
        xAxis: {
          data: this.xDateMainland
        },
        series: [
          {
            name: '现有确诊',
            data: nowqzData,
            itemStyle: {
              color: '#ff3535'
            }
          },
          {
            name: '现有疑似',
            data: susData,
            itemStyle: {
              color: '#a36fff'
            }
          },
          {
            name: '累计确诊',
            data: leijiData,
            itemStyle: {
              color: '#b10000'
            }
          }
        ]
      }

      this.chartsInstance.setOption(upDataOption)
    },
    // 治愈死亡累计
    upDataZyAndSw() {
      const seriesData6 = this.covidData.data.historylist.map((item) => {
        return item.cn_cureNum
      })
      const cureNumData = seriesData6.reverse().slice(300)

      const seriesData7 = this.covidData.data.historylist.map((item) => {
        return item.cn_deathNum
      })
      const deathNumData = seriesData7.reverse().slice(300)
      const upDataOption = {
        xAxis: {
          data: this.xDateMainland
        },
        series: [
          {
            name: '治愈',
            data: cureNumData,
            itemStyle: {
              color: '#13b593'
            }
          },
          {
            name: '死亡',
            data: deathNumData,
            itemStyle: {
              color: '#666666'
            }
          }
        ]
      }

      this.chartsInstance.setOption(upDataOption)
    },
    // 治愈和死亡率
    upDataZyRate() {
      const seriesData8 = this.covidData.data.historylist.map((item) => {
        return item.cn_cureRate
      })
      const cureRateData = seriesData8.reverse().slice(300)

      const seriesData9 = this.covidData.data.historylist.map((item) => {
        return item.cn_deathRate
      })
      const deathRate = seriesData9.reverse().slice(300)

      const upDataOption = {
        xAxis: {
          data: this.xDateMainland
        },
        yAxis: {
          axisLabel: {
            // y轴设置为%
            show: true,
            interval: 'auto',
            formatter: '{value} %'
          },
          max: 100,
          min: 0
        },
        tooltip: {
          formatter: (e) => {
            return `${e[0].axisValue} <div><span>${e[0].marker}</span> <span>${e[0].seriesName}: </span> <span>${e[0].value}%</span></div> <div><span>${e[1].marker}</span> <span>${e[1].seriesName}: </span> <span>${e[1].value}%</span></div>`
          }
        },
        series: [
          {
            name: '治愈率',
            data: cureRateData,
            itemStyle: {
              color: '#13b593'
            }
          },
          {
            name: '死亡率',
            data: deathRate,
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

        this.title = '全国 总新增/新增境外输入 确诊趋势'
        this.upDataTotal()
      } else if (e === 'sus') {
        this.changeBtnStatus1 = false
        this.changeBtnStatus2 = true
        this.changeBtnStatus3 = false
        this.changeBtnStatus4 = false

        this.title = '全国 现有确诊/疑似/累计确诊 趋势'
        this.upDataJw()
      } else if (e === 'add') {
        this.changeBtnStatus1 = false
        this.changeBtnStatus2 = false
        this.changeBtnStatus3 = true
        this.changeBtnStatus4 = false

        this.title = '全国 累计治愈/死亡 趋势 '
        this.upDataZyAndSw()
      } else {
        this.changeBtnStatus1 = false
        this.changeBtnStatus2 = false
        this.changeBtnStatus3 = false
        this.changeBtnStatus4 = true

        this.title = '全国 治愈率/死亡率 趋势 '
        this.upDataZyRate()
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
