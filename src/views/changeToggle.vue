<template>
  <div>
    <section class="layout" :class="{ isFixed: layoutFixedStatus }">
      <div class="layout-con">
        <div
          class="layout-country"
          @click="layoutActive = true"
          :class="{ 'layout-con-active': layoutActive }"
        >
          全国疫情
        </div>
        <div
          class="layout-world"
          @click="covidWorld"
          :class="{ 'layout-con-active': !layoutActive }"
        >
          世界疫情
        </div>
        <div class="layout-img" @click="showPopup">
          <img src="../assets/images/layout.png" alt="" />
        </div>
      </div>
    </section>

    <!-- 顶栏右侧弹出层 -->
    <van-popup
      v-model="show"
      position="top"
      :style="{ height: '20%' }"
      closeable
      round
    >
      <div class="popup">
        <div class="popup-title">专题目录</div>
        <div class="pupop-item">
          <div
            class="pupop-country"
            @click="layoutActive = true"
            :class="{ 'layout-con-active': layoutActive }"
          >
            全国疫情
          </div>
          <div
            class="pupop-world"
            @click="layoutActive = false"
            :class="{ 'layout-con-active': !layoutActive }"
          >
            世界疫情
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'layoutCon',
  data() {
    return {
      layoutFixedStatus: false,
      layoutActive: true,
      show: false
    }
  },
  created() {},
  methods: {
    // 顶栏固定
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop

      // 固定导航栏
      if (scrollTop > 150) {
        this.layoutFixedStatus = true
      } else {
        this.layoutFixedStatus = false
      }
    },
    // 展示顶栏弹出层
    showPopup() {
      this.show = true
    },
    // 切换世界疫情
    covidWorld() {
      this.layoutActive = false
      this.$toast({
        message: '',
        icon: 'like-o'
      })
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll) // Dom树加载完毕
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll) // 销毁页面时清除
  }
}
</script>

<style lang="less" scoped>
// layout
.layout {
  border-bottom: 1px solid #e4e4e4;
  position: relative;
  width: 100%;
  height: 40px;
  background-color: #fff;
  .layout-con {
    display: flex;
    align-items: center;
    height: 40px;
    font-size: 15px;
    .layout-country {
      position: relative;
      margin: 0 10px;
    }
    .layout-world {
      position: relative;
      margin: 0 10px;
    }
    .layout-img {
      position: absolute;
      right: 0;
      width: 40px;
      height: 40px;
      border-left: 2px solid #f4f4f4;
      img {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 5px;
      }
    }
  }
}
// 激活状态
.layout-con-active {
  color: red;
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -6px;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    width: 0.3rem;
    height: 0.1rem;
    background: #fe350e;
    border-radius: 0.06rem;
  }
}

// 固定导航栏
.isFixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}

// 弹出层样式
.popup-title {
  text-align: center;
  padding: 7px 0 5px 0;
  font-size: 20px;
  font-weight: 700;
  border-bottom: 2px solid #f4f4f4;
}
::v-deep .van-popup__close-icon--top-right {
  top: 10px;
  height: 10%;
}
.pupop-item {
  display: flex;
  justify-content: center;
  margin: 0 10px;
  text-align: center;
  font-size: 16px;
  .pupop-country {
    flex: 1;
    margin-right: 30px;
    border: 1px solid gray;
    padding: 5px 12px;
    border-radius: 15px;
  }
  .pupop-world {
    flex: 1;
    border: 1px solid gray;
    padding: 5px 12px;
    border-radius: 15px;
  }
}
</style>
