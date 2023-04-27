import { defineComponent, onMounted } from "vue"
import * as echarts from 'echarts'

export default defineComponent({

  setup() {
    onMounted(() => {
      const leftChart = echarts.init(document.querySelector("#leftChart") as HTMLElement)
      const data = [["2023-04-01", 45], ["2023-04-05", 70], ["2023-04-09", 75], ["2023-04-13", 102], ["2023-04-17", 130], ["2023-04-21", 85], ["2023-04-25", 200], ["2023-04-29", 320], ["2023-05-03", 65], ["2023-05-07", 45]]
      const dateList = data.map(function (item) {
        return item[0]
      })
      const valueList = data.map(function (item) {
        return item[1]
      })
      leftChart.setOption({
        visualMap: {
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: 400
        },

        title: {
          left: 'center',
          text: '月新增文章数'
        },

        tooltip: {
          trigger: 'axis'
        },

        xAxis: {
          type: 'category',
          data: dateList
        },

        yAxis: {},

        grid: {
          left: '0',
          right: '0',
          bottom: '5%',
          containLabel: true,
        },

        series: [
          {
            type: 'line',
            showSymbol: true,
            data: valueList,
          }
        ]
      })

    })
  },

  render() {
    return (
      <div id="leftChart" class='bg-ff'></div>
    )
  }
})