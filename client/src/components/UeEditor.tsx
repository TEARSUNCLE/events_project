/*
 * @Author: djw
 * @Description: UE编辑器组件
 */
import { defineComponent, ref, onMounted, watch, onUnmounted } from 'vue'
export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    },
    //为确保多tab的时候，id是唯一的，传进来的id必须是唯一的
    id: {
      type: String,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    //最多可输入字符数
    maximumWords: {
      type: Number,
      default: 65535
    },
    maxHeight: {
      type: Number,
      default: 300
    },
    //编辑框工具栏
    toolbars: {
      type: Array,
      default: () => {
        return [
          'source',
          'undo',
          'redo',
          'bold',
          'formatmatch',
          'forecolor',
          'insertorderedlist',
          'insertunorderedlist',
          'justifyleft',
          'justifyright',
          'justifycenter',
          'indent',
          'superscript',
          'subscript',
          'fontsize',
          'lineheight',
          'link',
          'simpleupload',
          'insertimage',
          'underline',
          'inserttable',
          'insertvideo',
          'attachment'
        ]
      }
    }
  },
  setup(props) {
    const editor: any = ref(null)
    const isSetContent = ref(false)

    const loadScript = (path: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = path
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    }

    const handleInit = async () => {
      if (!window.hasOwnProperty('UE')) {
        await loadScript('/static/UE/ueditor.config.js')
        await loadScript('/static/UE/ueditor.all.min.js')
        await loadScript('/static/UE/lang/en/en.js')
        await loadScript('/static/UE/ueditor.parse.min.js')
      }

      // 初始化UE
      editor.value = (window as any).UE.getEditor(props.id, {
        fontsize: [12, 14, 16, 18, 20, 24, 36],
        enableDragUpload: true,
        enablePasteUpload: true,
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: props.maxHeight,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口
        serverUrl: ``,
        UEDITOR_HOME_URL: '/static/UE/',
        maximumWords: props.maximumWords,
        toolbars: [props.toolbars],
        //抓取远程图片是否开启
        catchRemoteImageEnable: false,
        //纯文本复制设置
        retainOnlyLabelPasted: true,
        pasteplain: false,
        AIS_PUBLIC_URL: '', //额外添加的参数，用于配置静态目录
        filterTxtRules: (function () {
          return {
            '-': 'script style object iframe embed input select',
            img: 'img',
            p: { $: {} }
          }
        })(),
        readonly: props.readonly
      })

      editor.value.addListener('ready', () => {
        // 载完成后，放入内容
        if (props.value) {
          (editor.value as any).setContent && (editor.value as any).setContent(props.value)
        }
        isSetContent.value = true
      })
    }
    //放入内容
    const setContent = (value: string, bool?: boolean) => {
      if (isSetContent.value) {
        (editor.value as any).setContent(value, bool)
      }
    }
    //获取UE编辑器的内容
    const getContent = () => {
      return (editor.value as any).getContent()
    }
    // 销毁编辑器
    const destroyed = () => {
      (editor.value as any).destroy()
    }
    onMounted(async () => {
      await handleInit()
    })
    onUnmounted(() => {
      destroyed()
    })
    watch(
      () => props.value,
      (newVal) => {
        setContent(newVal as string)
      }
    )
    return {
      getContent
    }
  },
  render() {
    return (
      <script id={this.id} type="text/plain"></script>
    )
  }
})