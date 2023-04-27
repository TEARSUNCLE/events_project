import { defineComponent, onMounted } from "vue"
import * as echarts from 'echarts'

export default defineComponent({

  setup() {
    onMounted(() => {
      const rightChart = echarts.init(document.querySelector("#rightChart") as HTMLElement)
      rightChart.setOption({

        title: {
          left: 'center',
          text: '分类文章数量比'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '10%',
          left: 'center',
          textStyle: {
            fontSize: 15,
          }
        },
        series: [
          {
            name: '数据图',
            type: 'pie',
            radius: ['40%', '65%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
              normal: {
                show: true,
                textStyle: {
                  fontSize: 15
                },
                emphasis: {
                  show: true
                },
                lableLine: {
                  normal: {
                    show: true
                  },
                  emphasis: {
                    show: true
                  }
                }
              },
            },

            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },

            labelLine: {
              show: true,
              normal: {
                length: 18
              }
            },

            data: [
              { value: 1048, name: '奇趣事' },
              { value: 580, name: '会生活' },
              { value: 735, name: '爱旅行' },
              { value: 484, name: '趣美味' },
              {
                // value: 1048 + 735 + 580 + 484 + 300,
                itemStyle: {
                  color: 'none',
                  decal: {
                    symbol: 'none'
                  }
                },
                label: {
                  show: false
                }
              }
            ],
            
            top: '10%'
          }
        ]
      })
    })
  },

  render() {
    return (
      <div id="rightChart" class='bg-ff'></div>
    )
  }
})