export const init = {
  animation: false,
  title: {
    subtext: '单位: 例',
    right: 25
  },
  legend: {
    icon: 'circle',
    itemWidth: 8,
    top: '2%',
    left: '5%'
  },
  grid: {
    left: '3%',
    top: '15%',
    right: '5%',
    bottom: '8%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    borderColor: '#eee',
    backgroundColor: '#fff',
    extraCssText: 'z-index:2'
  },
  xAxis: {
    type: 'category',
    // 坐标轴刻度
    axisTick: {
      show: false
    },
    axisLabel: {
      inside: false,
      fontSize: 10,
      interval: 5,
      rotate: 40,
      showMaxLabel: true
    },
    axisLine: {
      show: false
    },
    boundaryGap: true
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      type: 'line',
      smooth: true,
      zlevel: 0,
      symbol: 'none'
    },
    {
      type: 'line',
      smooth: true,
      zlevel: 0,
      symbol: 'none'
    },
    {
      type: 'line',
      smooth: true,
      zlevel: 0,
      symbol: 'none'
    }
  ]
}
