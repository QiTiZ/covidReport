<template>
  <div>
    <section class="banner">
      <div class="banner-con">
        <img src="../assets/images/banner.png" alt="" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'bannerCon',
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
// 疫情场所查询banner
.banner {
  margin-top: 15px;
  .banner-con {
    margin: 0 10px;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
