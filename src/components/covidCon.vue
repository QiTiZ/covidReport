<template>
  <div>
    <section class="covid-con">
      <div class="covid-main">
        <div class="covid-title">
          <b>{{ title }}</b>
        </div>
        <slot></slot>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'covidCon',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.covid-con {
  margin: 0 10px;
  .covid-main {
    position: relative;
    margin-top: 12px;
    height: auto;
    background-color: #fff;
    border-radius: 15px;
    .covid-title {
      padding: 12px 0 0 5px;
      position: relative;
      display: flex;
      align-items: center;
      height: 0.35rem;
      color: #4d79f3;
      font-size: 15px;
      margin-right: 0.1rem;
      font-weight: 700;
      b {
        margin-left: 15px;
      }
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 8px;
        left: 8px;
        width: 5px;
        height: 20px;
        border-radius: 5px;
        background-color: #4d79f3;
      }
    }
  }
}
</style>
