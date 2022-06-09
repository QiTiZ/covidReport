<template>
  <div>
    <div class="recent-subTitle">7:00-10:00为更新高峰，数据若滞后敬请谅解</div>

    <div class="main">
      <div class="main-title">
        <div class="titleCon">{{ cityName }}</div>
        <div class="titleCon">
          <i>新增</i>
        </div>
        <div class="titleCon">
          <i>累计确诊</i>
        </div>
        <div class="titleCon">
          <i>死亡</i>
        </div>
        <div class="titleCon">
          <i>治愈</i>
        </div>
        <div class="titleCon">
          <i>详情</i>
        </div>
      </div>
    </div>

    <div class="main-list">
      <div
        class="main-list-item"
        v-for="(item, i) in tableList.slice(0, showTotal)"
        :key="i"
      >
        <div class="titleCon">
          {{ item.name }}
        </div>
        <div class="titleCon">
          <i>{{ item.conadd }}</i>
        </div>
        <div class="titleCon">
          <i>{{ tableList.length === 34 ? item.value : item.conNum }}</i>
        </div>
        <div class="titleCon">
          <i>{{ item.deathNum }}</i>
        </div>
        <div class="titleCon">
          <i>{{ item.cureNum }}</i>
        </div>
        <a
          class="titleCon"
          :href="
            tableList.length === 34
              ? `https://news.sina.cn/project/fy2020/yq_province.shtml?province=${item.ename}`
              : `https://news.sina.cn/project/fy2020/yq_province.shtml?country=${item.citycode}`
          "
        >
          <i
            >详情
            <img src="../assets/images/ic_arrow_right_blue.png" alt="" />
          </i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    cityName: {
      type: String,
      default: ''
    },
    tableList: {
      type: Array,
      default: () => []
    },
    showTotal: {
      type: Number,
      default: 10
    },
    showAllListBtn: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
.recent-subTitle {
  margin: 10px 0 0 5px;
  font-size: 11px;
  color: #888;
}
.main {
  margin-top: 5px;
  .main-title {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    align-items: center;
    .titleCon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20%;
      height: 20px;
      padding: 5px 0;
      margin-left: 1px;
      i {
        font-style: normal;
      }
      &:nth-child(1) {
        width: 28%;
        background-color: #eaeaea;
        margin-left: 0;
      }
      &:nth-child(2) {
        width: 23%;
        background-color: #ffe2dc;
      }
      &:nth-child(3) {
        width: 23%;
        background-color: #ffc9c9;
      }
      &:nth-child(4) {
        width: 19%;
        background-color: #b4c0d5;
      }
      &:nth-child(5) {
        width: 22%;
        background-color: #c0ece0;
      }
      &:nth-child(6) {
        width: 21%;
        background-color: #e3e7f3;
      }
      .arrow {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: -8px;
        span {
          width: 5px;
          height: 7px;
          opacity: 0.2;
        }
        .arrowActive {
          color: #f46767;
          opacity: 1;
        }
      }
    }
  }
}

.main-list {
  font-size: 10px;
  color: #555;
  .main-list-item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 0 12px 3px;
    &:nth-child(even) {
      background-color: #f3f3f3;
    }
    &:nth-last-child(1) {
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
    }
    a {
      color: #000;
    }
    .titleCon {
      width: 20%;
      display: flex;
      align-content: center;
      text-align: center;
      justify-content: center;
      &:nth-child(1) {
        width: 25%;
      }
      &:nth-child(2) {
        width: 23%;
      }
      &:nth-child(3) {
        width: 23%;
      }
      &:nth-child(4) {
        width: 19%;
      }
      &:nth-child(5) {
        width: 22%;
      }
      &:nth-child(6) {
        width: 21%;
        margin-right: -2px;
        img {
          width: 11px;
          height: 11px;
          margin-left: -3px;
          vertical-align: middle;
        }
      }
    }
    i {
      font-style: normal;
    }
  }
}
</style>
