export const barInit = {
  animation: false,

  legend: {
    icon: 'circle',
    itemWidth: 8,
    top: '2%',
    left: '5%'
  },
  grid: {
    left: '-10%',
    top: '8%',
    right: '8%',
    bottom: '8%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    borderColor: '#999',
    axisPointer: {
      type: 'shadow'
    },
    backgroundColor: '#fff',
    extraCssText: 'z-index:2'
  },
  xAxis: {
    type: 'value',
    position: 'top',
    axisLabel: {
      fontSize: 10
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#8d8d8d'
      }
    },
    splitNumber: 4
  },
  yAxis: {
    type: 'category',
    show: false,
    inverse: true // 反转坐标轴
  },
  series: [
    {
      type: 'bar',
      label: {
        show: true,
        formatter: (e) => {
          return ` ${e.name}`
        },
        position: 'right',
        distance: 10
      },
      barWidth: '40%',
      zlevel: 0
    }
  ]
}
