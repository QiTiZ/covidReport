<template>
  <div class="covidMap" ref="mapRef">
    <van-loading size="24px">拼命加载中...</van-loading>
  </div>
</template>

<script>
import worldMap from '@/assets/js/world.json'
import { getFyData } from '@/utils/getFyList.js'
import nameMap from '@/assets/js/nameMap.json'
export default {
  name: 'Covid',
  data() {
    return {
      chartInstance: null,
      initOption: null
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    async initChart() {
      const { data: res } = await getFyData()
      const mapJsonData = JSON.parse(res.slice(13, -2))
      const regionData = []

      mapJsonData.data.worldlist.map((item) => {
        regionData.push({
          name: item.name,
          value: item.value
        })
      })

      this.chartInstance = this.$echarts.init(this.$refs.mapRef)
      this.$echarts.registerMap('world', worldMap)

      this.initOption = {
        series: [
          {
            type: 'map',
            map: 'world',
            top: 'center',
            nameMap: nameMap,
            label: {
              show: false,
              fontSize: 9
            },
            // 地图缩放
            zoom: 1.15,
            itemStyle: {
              // 地图区域颜色
              areaColor: '#fff'
            },
            data: regionData,
            zlevel: 0
          }
        ],
        visualMap: [
          {
            show: false,
            pieces: [
              { min: 10000000, color: 'rgb(140, 7, 9)' },
              { min: 5000000, max: 10000000, color: 'rgb(183, 9, 9)' },
              { min: 1000000, max: 5000000, color: 'rgb(230, 50, 50)' },
              { min: 100000, max: 1000000, color: 'rgb(255, 107, 83)' },
              { min: 10000, max: 100000, color: 'rgb(250, 154, 132)' },
              { min: 5000, max: 9999, color: 'rgb(254, 201, 187)' },
              { min: 1, max: 4999, color: ' rgb(253, 229, 219)' },
              { value: 0, color: '#fff' }
            ]
          }
        ],
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          borderColor: 'black',
          backgroundColor: 'black',
          extraCssText: ' opacity:0.75;',
          textStyle: {
            color: '#fff'
          },
          formatter: (e) => {
            if (!e.value) {
              return `地区：<b>${e.name}</b>   <div>现有确诊：0</div> `
            }
            return `地区：<b>${e.name}</b>   <div>现存确诊：${e.value}</div> `
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
  position: relative;
  height: 210px;
}

::v-deep .van-loading {
  position: relative;
  color: #c8c9cc;
  font-size: 0;
  vertical-align: middle;
  text-align: center;
  transform: translateY(90px);
  /* align-items: center; */
  /* justify-content: center; */
  /* top: 50%; */
}
</style>
