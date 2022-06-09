<template>
  <div class="covidMap" ref="mapRef"></div>
</template>

<script>
import chinaMap from '@/assets/js/china.json'
import { getFyData } from '@/utils/getFyList.js'

export default {
  name: 'Covid',
  data() {
    return {
      chartInstance: null,
      chinaDataList: null,
      initOption: null
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.initChart()
  },
  methods: {
    async getData() {
      const { data: res } = await getFyData()
      const mapJsonData = JSON.parse(res.slice(13, -2))

      this.chinaDataList = mapJsonData.data
      const list = this.chinaDataList.list.map((item) => {
        return {
          name: item.name,
          cure: item.cureNum,
          value: item.value,
          deathNum: item.deathNum
        }
      })

      this.initOption.series[0].data = list
      this.chartInstance.setOption(this.initOption)
    },
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.mapRef)
      this.$echarts.registerMap('china', chinaMap)

      this.initOption = {
        series: [
          {
            type: 'map',
            map: 'china',
            top: '6%',
            label: {
              show: true,
              fontSize: 9
            },
            // 地图缩放
            zoom: 1.15,
            itemStyle: {
              // 地图区域颜色
              areaColor: '#fff'
            },
            data: [{}],
            zlevel: 0
          }
        ],
        visualMap: [
          {
            type: 'piecewise',
            itemWidth: '8px',
            itemHeight: '8px',
            orient: 'horizontal',
            top: '94%',
            left: 30,
            pieces: [
              { min: 10000, color: 'rgb(184, 9, 9)' },
              { min: 1000, max: 9999, color: 'rgb(245, 117, 103)' },
              { min: 100, max: 999, color: 'rgb(255, 153, 133' },
              { min: 1, max: 49, color: ' rgb(255, 229, 219)' },
              { value: 0, color: '#fff' }
            ],
            textStyle: {
              fontSize: 12
            },
            textGap: 4,
            padding: [
              0, // 上
              5, // 右
              0, // 下
              5 // 左
            ]
          }
        ],
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          borderColor: 'black',
          backgroundColor: 'black',
          extraCssText: ' opacity:0.7;',
          textStyle: {
            color: '#fff'
          },
          formatter: (e) => {
            return `地区：<b>${e.name}</b>  <div>累计确诊：<b>${e.value}</b></div>  <div>累计治愈：<b>${e.data.cure}</b></div> <div>累计死亡：<b>${e.data.deathNum}</b></div>`
          }
        }
      }
      this.chartInstance.setOption(this.initOption)
    }
  }
}
</script>

<style lang="less" scoped>
.covidMap {
  height: 270px;
}
</style>
