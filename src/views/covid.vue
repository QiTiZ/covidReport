<template>
  <div>
    <!-- 头部 -->
    <covidHeader></covidHeader>
    <!-- 全国世界疫情切换 -->
    <changeToggle></changeToggle>
    <quickNews></quickNews>
    <covidNumber></covidNumber>
    <chinaMap></chinaMap>
    <covidHesuan></covidHesuan>
    <precent31ProvinceList></precent31ProvinceList>
    <covidTools></covidTools>

    <recentListLine></recentListLine>
    <totalListLine></totalListLine>
    <chinaData></chinaData>
    <covidFence></covidFence>
    <vaccine></vaccine>
    <covidWorldNumber></covidWorldNumber>
    <worldMap></worldMap>
    <worldTop></worldTop>
    <worldData></worldData>
    <covidFooter></covidFooter>
  </div>
</template>

<script>
import covidHeader from './covidHeader.vue'
import changeToggle from './changeToggle.vue'
import quickNews from './quickNews.vue'
import covidNumber from './covidNumber.vue'
import chinaMap from './Map/chinaMap.vue'
import covidHesuan from './covidHesuan.vue'
import precent31ProvinceList from './precent31ProvinceList.vue'
import covidTools from './covidTools.vue'
import recentListLine from './Line/mainland/mainland.vue'
import totalListLine from './Line/nation/nation.vue'
import chinaData from './chinaData.vue'
import covidFence from './covidFence.vue'
import vaccine from './vaccine.vue'
import covidWorldNumber from './covidWorldNumber.vue'
import worldMap from './Map/worldMap.vue'
import worldData from './worldData.vue'
import covidFooter from './covidFooter.vue'
import worldTop from './Bar/world/worldTop.vue'
export default {
  name: 'covid',
  components: {
    covidHeader,
    changeToggle,
    quickNews,
    covidNumber,
    chinaMap,
    covidHesuan,
    precent31ProvinceList,
    covidTools,
    recentListLine,
    totalListLine,
    chinaData,
    covidFence,
    vaccine,
    covidWorldNumber,
    worldMap,
    worldTop,
    worldData,
    covidFooter
  }
}
</script>

<style lang="less" scoped></style>
