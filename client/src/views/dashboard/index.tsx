import { userInfoApi } from "@/api/user"
import useStore from "@/store"
import { defineComponent, onMounted, ref } from "vue"
import styles from './css/index.module.less'
import { Col, Row } from "ant-design-vue"
import LeftChart from "./components/leftChart"
import RightChart from "./components/rightChart"

export default defineComponent({

  setup() {
    const { user } = useStore()

    const list = ref([
      {
        total: 10015,
        title: '总文章数',
        unit: '篇',
        color: '#83a2ed'
      },
      {
        total: 123,
        title: '日新增文章数',
        unit: '篇',
        color: '#6ac6e2'
      },
      {
        total: 35,
        title: '评论总数',
        unit: '条',
        color: '#60d9de'
      },
      {
        total: 123,
        title: '日新增评论数',
        unit: '条',
        color: '#58d88e'
      }
    ])

    const userInfo = async () => {
      const { data } = await userInfoApi()
      if (data.code === 0) {
        user.setUserInfo(data.data)
      }
    }

    onMounted(() => {
      userInfo()

      // const leftChart = echarts.init(document.querySelector("#leftChart") as HTMLElement)
      // const data = [["2023-04-01", 45], ["2023-04-05", 70], ["2023-04-09", 75], ["2023-04-13", 102], ["2023-04-17", 130], ["2023-04-21", 85], ["2023-04-25", 200], ["2023-04-29", 320], ["2023-05-03", 65], ["2023-05-07", 45]]
      // const dateList = data.map(function (item) {
      //   return item[0]
      // });
      // const valueList = data.map(function (item) {
      //   return item[1];
      // });
      // leftChart.setOption({
      //   visualMap: {
      //     show: false,
      //     type: 'continuous',
      //     seriesIndex: 0,
      //     min: 0,
      //     max: 400
      //   },
      //   title: {
      //     left: 'center',
      //     text: '月新增文章数'
      //   },
      //   tooltip: {
      //     trigger: 'axis'
      //   },
      //   xAxis: {
      //     type: 'category',
      //     data: dateList
      //   },
      //   yAxis: {},
      //   grid: {
      //     left: '0',
      //     right: '0',
      //     bottom: '40%',
      //     containLabel: true,
      //   },
      //   series: [
      //     {
      //       type: 'line',
      //       showSymbol: true,
      //       data: valueList,
      //     }
      //   ]
      // })


    })

    return {
      list
    }
  },

  render() {
    const { list } = this
    return (
      <>
        <div class={`${styles.dashboardBox} pl20 pr20`}>
          <div class='headData'>
            <Row justify='space-between' align='center'>
              {list.map((item, index) => {
                return <Col span={5} >
                  <div key={index} class='contentBox textCenter'>
                    <div class='flexBox flexcenterX pt10 pb10' style={{ alignItems: 'baseline' }}>
                      <h1 style={{ color: item.color }} class={'fs34'}>{item.total}</h1>
                      <p style={{ color: item.color }} class={'fs18 pl10'}>{item.unit}</p>
                    </div>
                    <p class='title pt5 pb5 fs16'>{item.title}</p>
                  </div>
                </Col>
              })}
            </Row>
          </div>

          <div class='mainContent mt20 flexBox'>
            <LeftChart class='mr30 pl15 pt15 pr15' style={{ 'borderRadius': '5px' }} />
            <RightChart class='pl15 pt15 pr15' style={{ 'borderRadius': '5px' }} />
          </div>
        </div>
      </>
    )
  }
})