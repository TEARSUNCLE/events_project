import { updateAvatarApi } from "@/api/user"
import useStore from "@/store"
import { PlusOutlined } from "@ant-design/icons-vue"
import { Modal, Upload, message } from "ant-design-vue"
import { defineComponent, reactive, ref } from "vue"

export default defineComponent({
  props: {
    isModalVisible: {
      type: Boolean,
      required: true
    },
    curItem: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    }
  },
  emits: ['setModalFn'],
  setup(props, { emit }) {
    const ruleForm = ref<any>(null)
    const fileList = ref<any[]>([])

    const { user } = useStore()

    const defaultForm = reactive({
      avatar: ''
    })

    // 上传前校验
    const beforeUploadCover = (file: any) => {
      const size = file.size / 1024 / 1024 < 3
      if (!size) {
        message.error("大小不能超过3M!")
        return false
      }
      return true
    }

    const onChange = (file) => {
      if (file) {
        fileList.value = []
        fileList.value.push(file.file)
        const reader = new FileReader()
        reader.readAsDataURL(file.file)
        reader.onload = (res) => {
          defaultForm.avatar = res.target?.result as string
        }
      }
    }

    // 封面删除
    const onRemove = () => {
      fileList.value = []
      message.success('移除成功!')
    }

    const handleOk = async () => {
      if (!defaultForm.avatar) return message.error('请上传头像!')

      const params = {
        ...defaultForm,
        id: user.userInfo.id
      }
      console.log(67, params)


      const { data } = await updateAvatarApi(params)
      if (data.code === 0) {
        message.success('已修改')
        emit('setModalFn', 'changeAvatar', 'success')
      }
    }

    const handleCancel = () => {
      emit('setModalFn', 'changeAvatar', 'cancel')
    }

    return {
      defaultForm,
      handleOk,
      handleCancel,
      ruleForm,
      user,
      beforeUploadCover,
      onChange,
      onRemove,
      fileList,
    }
  },

  render(props) {
    const { defaultForm, handleOk, handleCancel, beforeUploadCover, onChange, onRemove, fileList } = this
    return (
      <>
        <div id={props.curItem.time as string}>
          <Modal
            title={'更换头像'}
            visible={props.isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText='修改'
            width={600}
          >
            <div>
              <Upload
                name="avatar"
                accept=".jpg,.png"
                list-type="picture-card"
                showUploadList={false}
                beforeUpload={beforeUploadCover}
                onRemove={onRemove}
                customRequest={(file) => onChange(file)}
                maxCount={1}
              >
                {fileList.length ?
                  <img src={defaultForm.avatar as string} alt="" width={100} height={100} style={{ objectFit: 'cover' }} /> :
                  <div class="ant-upload-text">
                    <PlusOutlined />
                    <p>上传</p>
                  </div>
                }
              </Upload>
            </div>
          </Modal>
        </div>
      </>
    )
  }
})