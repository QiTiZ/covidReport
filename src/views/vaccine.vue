<template>
  <div>
    <covid-con :title="title">
      <div class="chinaVaccine">
        <div class="jiezhong">
          <i>中国累计接种</i>
          <span
            >{{ chinaVaccine }}
            <em>亿剂</em>
          </span>
        </div>
        <div class="borderBB"></div>
        <div class="jiezhong">
          <i>中国每百人接种</i>
          <span class="hunder"
            >{{ chinaHundredVaccine }}
            <em>剂</em>
          </span>
        </div>
      </div>

      <div class="divider"></div>

      <div class="chinaVaccine">
        <div class="jiezhong">
          <i>全球累计接种</i>
          <span
            >{{ worldVaccine }}
            <em>亿剂</em>
          </span>
        </div>
        <div class="borderBB"></div>
        <div class="jiezhong">
          <i>全球每百人接种</i>
          <span class="hunder"
            >{{ worldHundredVaccine }}
            <em>剂</em>
          </span>
        </div>
      </div>
    </covid-con>
  </div>
</template>

<script>
import { getVaccine } from '../utils/getFyList'
export default {
  name: '',
  data() {
    return {
      chinaVaccine: '',
      chinaHundredVaccine: '',
      worldVaccine: '',
      worldHundredVaccine: '',
      title: '全球新冠疫苗接种追踪'
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const { data: res } = await getVaccine()
      this.vaccineData = res.data.VaccineTopData['中国']
      this.chinaHundredVaccine =
        res.data.VaccineTopData['中国'].total_vaccinations_per_hundred
      const aa = this.vaccineData.total_vaccinations.toString()
      this.chinaVaccine = aa.slice(0, 3) + ',' + aa.slice(3, 4)

      this.vaccineWoerldData = res.data.VaccineTopData['全球']
      this.worldHundredVaccine =
        res.data.VaccineTopData['全球'].total_vaccinations_per_hundred
      const bb = this.vaccineWoerldData.total_vaccinations.toString()
      this.worldVaccine = bb.slice(0, 3) + ',' + bb.slice(3, 4)
    }
  }
}
</script>

<style lang="less" scoped>
.chinaVaccine {
  margin: 0 10px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;

  .jiezhong {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 15px 0;
    i {
      font-style: normal;
      font-size: 12px;
    }
    span {
      margin-top: 5px;
      font-size: 20px;
      color: #178b50;
      font-weight: 600;
      em {
        font-size: 10px;
        font-style: normal;
      }
    }
    .hunder {
      color: #4e5a65;
    }
  }
  .borderBB {
    border: 0.1px solid #eee;
    height: 40px;
    margin-top: 15px;
  }
}

// 分割线
.divider {
  border: 0.1px solid #eee;
  margin: 0 10px;
}
</style>
