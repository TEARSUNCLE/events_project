import { defineComponent, onMounted, onUnmounted } from "vue"
import * as echarts from 'echarts'

export default defineComponent({
  props: {
    width: {
      type: String,
      required: true
    },
    height: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    let chart: echarts.ECharts | null = null

    const handleResize = () => {
      chart && chart.resize()
    }

    onMounted(() => {
      chart = echarts.init(document.querySelector(`#${props.id}`) as HTMLElement)
      chart.setOption(props.options)

      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
      chart && chart.dispose()
    })
  },

  render(props) {
    return (
      <div
        id={props.id}
        class='bg-ff pl15 pt15 pr15'
        style={{ width: props.width, height: props.height, borderRadius: '5px' }}
      />
    )
  }
})