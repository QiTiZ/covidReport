import axios from 'axios'

/**
 *
 * 新闻资讯
 */
export const getFastNews = () => {
  return axios.get(
    '/fastNews/app.news/24hours_news.d.json?conf=timeline_v2&page=1&pageSize=3&pageType=kangYiNewsFlash'
  )
}

/**
 *
 * 疫情数据
 */
export const getFyData = () => {
  return axios.get('/fyData/project/fymap/ncp2020_full_data.json')
}

/**
 *
 * 31省市最新数据
 */
export const getFyRencentData = () => {
  return axios.get(
    '/recentList/project/fymap/ncp2020_feiyan_procity_loc_data.jsonp?callback=callbacklocation'
  )
}

// 境外输入TOP10
export const getJWSRTop10 = () => {
  return axios.get('/gwpreData/ncp/top_jwsr?sortby=certainto&n=10')
}

// 境外输入TOP10
export const getVaccine = () => {
  return axios.get(
    '/vaccineData/newsqa/v1/automation/modules/list?modules=VaccineTopData'
  )
}

// 重点国家疫情确诊趋势
export const getPriorityCountry = () => {
  return axios.get(
    '/gwpreData/ncp/multi_history_get?citycode=SCUS0001,SCIN0091,SCBR0055,SCFR0033,SCDE0049,SCGB0044,SCRU0007,SCKR0082&callback=dataAPImulti&_=1653892529468'
  )
}

// 海外昨日新增TOP10
export const getWorldTop = () => {
  return axios.get(
    '/gwpreData/ncp/top_history?sortby=certain_inc&callback=dataTOP10inc&_=1653898307631'
  )
}

// 海外七日涨幅TOP10
export const getWorldPercentTop = () => {
  return axios.get(
    '/gwpreData/ncp/top_history?sortby=7daycertain_inc&callback=dataAPITop10inc7&_=1653903305994'
  )
}
