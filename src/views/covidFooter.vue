<template>
  <div>
    <footer>
      <div class="loveOneself">
        <div class="tip">
          <van-icon name="like" />
          <span class="tip-title">积极防护，保护自己，戴口罩，勤洗手</span>
          <van-icon name="like" />
        </div>

        <div class="icon">
          <img src="@/assets/images/footerIcon.png" alt="" />
        </div>

        <div class="tag">
          <span>上百度APP搜索 新型冠状病毒肺炎</span>
          <span>了解最新进展及权威预防知识</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'footerCon',
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.loveOneself {
  margin-top: 15px;
  height: 280px;
  background-color: #10aeb5;
  border-radius: 8px;
  position: relative;
  .tip {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    top: 30px;
    margin: 0 10px;
    background-color: #fff;
    height: 50px;
    border-radius: 12px;
    width: 95%;
    .tip-title {
      font-size: 15px;
      font-weight: 700;
    }
  }
}

::v-deep .van-icon {
  color: red;
  margin: 0 10px;
  font-size: 15px;
}

.icon {
  position: relative;
  img {
    position: absolute;
    top: 100px;
    transform: translateX(20%);
    width: 72%;
    height: auto;
  }
}

.tag {
  position: relative;
  display: flex;
  top: 150px;
  flex-direction: column;
  align-items: center;
  span {
    font-size: 14px;
    color: #fff;
    opacity: 0.8;
  }
}
</style>
