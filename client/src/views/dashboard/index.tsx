import useStore from "@/store"
import { defineComponent, onMounted, reactive, ref } from "vue"
import styles from './css/index.module.less'
import { Col, Row } from "ant-design-vue"
import MyCharts from "@/components/myCharts"
import * as echarts from 'echarts'

const data = [["2023-04-09", Math.floor(Math.random() * 351)], ["2023-04-13", Math.floor(Math.random() * 351)], ["2023-04-17", Math.floor(Math.random() * 351)], ["2023-04-21", Math.floor(Math.random() * 351)], ["2023-04-25", Math.floor(Math.random() * 351)], ["2023-04-29", Math.floor(Math.random() * 351)], ["2023-05-03", Math.floor(Math.random() * 351)], ["2023-05-07", Math.floor(Math.random() * 351)]]
const dateList = data.map(function (item) {
  return item[0]
})
const valueList = data.map(function (item) {
  return item[1]
})
export default defineComponent({

  setup() {
    const chartOptions = reactive({
      main: {
        title: {
          left: 'center',
          text: '文章访问量',
        },
        legend: {
          top: '8%',
          left: 'center',
          textStyle: {
            fontSize: 15,
          }
        },
        tooltip: {},
        grid: {
          left: '1%',
          right: '4%',
          top: '20%',
          bottom: '5%',
          containLabel: true
        },
        dataset: {
          source: [
            ['type', '奇趣事', '会生活', '爱旅行', '趣美味'],
            ['2月', 800, 400, 500, 600],
            ['3月', 700, 450, 650, 550],
            ['4月', 900, 500, 500, 650],
            ['5月', 1100, 650, 770, 900]
          ]
        },
        xAxis: { name: '月份', type: 'category' },
        yAxis: {
          name: '访问量',
          axisTick: { show: false },
          axisLabel: { textStyle: { align: 'right' } }
        },
        series: [
          { type: 'bar', barCategoryGap: '35%', barGap: '30%', barWidth: '10%' },
          { type: 'bar', barCategoryGap: '35%', barGap: '30%', barWidth: '10%' },
          { type: 'bar', barCategoryGap: '35%', barGap: '30%', barWidth: '10%' },
          { type: 'bar', barCategoryGap: '35%', barGap: '30%', barWidth: '10%' }
        ]
      },
      leftChart: {
        title: {
          left: 'center',
          text: '月新增文章数量'
        },
        tooltip: {
          textStyle: {
            color: '#000'
          },
          padding: [10, 10],
          trigger: 'axis',
          backgroundColor: '#fff',
          borderColor: 'rgba(112, 119, 242, 0.8)',
          borderWidth: 1,
          axisPointer: {
            lineStyle: {
              color: 'RGBA(105, 136, 217, 1)',
            }
          }
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        toolbox: {
          show: false
        },
        xAxis: {
          name: '日期',
          type: 'category',
          data: dateList,
          axisLine: {
            lineStyle: {
              // color: 'rgba(193, 207, 220, 1)',
            }
          },
          axisLabel: {
            textStyle: {
              color: "rgba(0, 0, 0, 1)"
            }
          },
        },
        yAxis: [
          {
            name: '月新增文章数',
            type: 'value',
            minInterval: 50,
            axisLabel: {
              textStyle: {
                color: "rgba(0, 0, 0, 1)"
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                // color: '#cdd5e2'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(193, 207, 220, 1)',
              }
            },
          }
        ],
        series: [
          {
            name: '该月新增文章数量',
            type: 'line',
            data: valueList,
            symbolSize: 10,
            symbol: 'circle',
            showSymbol: true,
            smooth: false,
            yAxisIndex: 0,
            lineStyle: {
              width: 2,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'RGBA(96, 122, 209, 1)'
              },
              {
                offset: 1,
                color: 'RGBA(96, 122, 209, 1)'
              }
              ]),
              shadowColor: 'RGBA(96, 122, 209, 0.4)',
              shadowBlur: 10,
              shadowOffsetY: 10
            },
            itemStyle: {
              normal: {
                color: 'rgba(167, 181, 230, 1)',
                borderColor: '#fff',
                borderWidth: 3,
                shadowColor: 'rgba(167, 181, 230, 0.7)',
                shadowBlur: 5,
              }
            },
            areaStyle: {
              opacity: 1,
              //区域填充样式
              //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: "RGBA(184, 204, 241, 1)"
              },
              {
                offset: 0.5,
                color: "RGBA(184, 204, 241, 0.5)"
              },
              {
                offset: 0.7,
                color: "RGBA(184, 204, 241, 0)"
              }
              ], false),
              //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              shadowBlur: 0
            }
          },
        ]
      },
      rightChart: {
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
      }
    })

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

    onMounted(() => {
      user.getUserInfo()
    })

    return {
      list,
      chartOptions,
    }
  },

  render() {
    const { list, chartOptions } = this
    return (
      <>
        <div class={`${styles.dashboardBox} pl5 pr5`}>
          <div class='headData'>
            <Row justify='space-between' align='center'>
              {list.map((item, index) => {
                return <Col span={5} >
                  <div key={index} class='contentBox textCenter'>
                    <div class='flexBox flexcenterX pt5 pb5' style={{ alignItems: 'baseline' }}>
                      <h1 style={{ color: item.color }} class={'fs34'}>{item.total}</h1>
                      <p style={{ color: item.color }} class={'fs18 pl10'}>{item.unit}</p>
                    </div>
                    <p class='title pt5 pb5 fs16'>{item.title}</p>
                  </div>
                </Col>
              })}
            </Row>
          </div>

          <div class='mainContent mt15'>
            <div class='flexBox mb10'>
              <MyCharts
                width={56 + 'vw'}
                height={38 + 'vh'}
                id='leftChart'
                options={chartOptions.leftChart}
                style={{ 'marginRight': '1vw' }}
              />
              <MyCharts
                width={30 + 'vw'}
                height={38 + 'vh'}
                id='rightChart'
                options={chartOptions.rightChart}
              />
            </div>
            <MyCharts
              width={87 + 'vw'}
              height={40 + 'vh'}
              id='chart'
              options={chartOptions.main}
            />
          </div>
        </div>
      </>
    )
  }
})