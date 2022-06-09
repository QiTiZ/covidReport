<template>
  <div>
    <section class="header">
      <div class="header-title">
        <div class="header-icon">
          <span class="wb-icon"></span>
          <span class="sina-icon"></span>
        </div>
        <h3>实时动态追踪</h3>
        <h2>新冠肺炎疫情</h2>
      </div>
      <span class="header-tag" @click="goyqChannel">抗疫频道</span>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HeaderCon',
  data() {
    return {}
  },
  created() {},
  methods: {
    // 去往疫情频道
    goyqChannel() {
      this.$toast({
        message: '爱你哟',
        icon: 'like-o'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  position: relative;
  height: 140px;
  padding-bottom: 0;

  background: url('../assets/images/header.png') center top / 100% no-repeat;
}
.header-title {
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 0.3em 0.4rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .header-icon {
    display: flex;
    align-items: center;
    .wb-icon {
      width: 37.92px;
      height: 15.4px;
      margin-right: 0.3125rem;
      background: url('../assets/images/wb.png') 50% / contain no-repeat;
    }
    .sina-icon {
      width: 50px;
      height: 15.4px;
      background: url('../assets/images/sina.png') 50% / contain no-repeat;
    }
  }
  h3 {
    font-size: 0.25rem;
    color: #fff;
    line-height: 3.5;
    margin-bottom: -20px;
  }
  h2 {
    font-size: 0.8rem;
    color: #fff;
    text-shadow: 0 0.04rem 0 #789ce9;
    margin-top: 5px;
    font-weight: 600;
  }
}
.header-tag {
  position: absolute;
  display: flex;
  align-items: center;
  text-align: center;
  top: 10px;
  right: 15px;
  height: 20px;
  font-size: 10px;
  color: #fff;
  padding: 2px 9px 2px 12px;
  line-height: 20px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.2);
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    margin-left: 5px;
    background: url('../assets/images/header-tag.png') 50% / contain no-repeat;
  }
}
</style>
