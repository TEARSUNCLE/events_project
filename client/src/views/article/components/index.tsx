import { createArticleApi, updateArticleApi } from "@/api/article"
import UeEditor from "@/components/UeEditor"
import { PlusOutlined } from "@ant-design/icons-vue"
import { Form, Input, Modal, Select, Upload, message } from "ant-design-vue"
import { defineComponent, getCurrentInstance, reactive, ref, watch } from "vue"

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
    const { proxy } = getCurrentInstance() as any

    const ruleForm = ref<any>(null)
    const editorRef = ref<any>(null)
    const fileList = ref<any[]>([])
    const avatarImg = ref<String>('')

    const defaultForm = reactive({
      title: '' || props.curItem.title,
      cate_id: null || props.curItem.cate_id,
      content: '' || props.curItem.content,
      status: props.curItem.status || '1',
      cover_img: null,
      id: '' || props.curItem.id
    })

    watch(() => props.curItem, (newVal) => {
      if (newVal.cover_img) avatarImg.value = proxy.config.IMG_URL + newVal.cover_img.replaceAll("\\", '/')
    }, { immediate: true, deep: true })

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
          avatarImg.value = res.target?.result as string
        }
      }
    }

    // 封面删除
    const onRemove = () => {
      fileList.value = []
      message.success('移除成功!')
    }

    const handleOk = async () => {
      const params = {
        ...defaultForm,
        content: editorRef.value?.getContent(),
        cover_img: fileList.value[0]
      }

      if (!params.title) return message.error('请输入文章标题!')
      if (!params.cate_id) return message.error('请选择文章类别!')
      if (!params.content) return message.error('请输入文章内容!')
      if (!params.cover_img) return message.error('请上传文章封面!')

      const formData = new FormData()
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          formData.append(key, params[key])
        }
      }

      if (props.curItem.id) {
        const { data } = await updateArticleApi(formData)
        if (data.code === 0) {
          message.success('修改成功')
          emit('setModalFn', 'create', 'success')
        }
      } else {
        delete params.id
        const { data } = await createArticleApi(formData)
        if (data.code === 0) {
          message.success('添加成功')
          emit('setModalFn', 'create', 'success')
        }
      }

    }
    const handleCancel = () => {
      emit('setModalFn', 'create', 'close')
    }

    return {
      defaultForm,
      handleOk,
      handleCancel,
      ruleForm,
      editorRef,
      fileList,
      beforeUploadCover,
      onRemove,
      onChange,
      avatarImg,
    }
  },

  render(props) {
    const { defaultForm, handleOk, handleCancel, fileList, beforeUploadCover, onRemove, onChange, avatarImg } = this
    return (
      <>
        <div id={props.curItem.time as string}>
          <Modal
            title={props.curItem.id ? '修改文章' : '新增文章'}
            visible={props.isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
          >
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              <Form
                name="basic"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 20 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                model={defaultForm}
                ref='ruleForm'
              >
                <Form.Item
                  label="文章标题"
                  name="title"
                  rules={[{ required: true, message: '请输入文章标题!', trigger: ['blur'] }]}
                >
                  <Input v-model={[defaultForm.title, 'value']} placeholder="请输入文章标题" />
                </Form.Item>
                <Form.Item
                  label="文章类别"
                  name="cate_id"
                  rules={[{ required: true, message: '请选择文章类别!', trigger: ['blur'] }]}
                >
                  <Select
                    placeholder="请选择分类类别"
                    style={{ width: '100%' }}
                    v-model={[defaultForm.cate_id, 'value']}
                    options={props.curItem.cateTypes && props.curItem.cateTypes.map(item => {
                      return {
                        value: item.id,
                        label: item.name
                      }
                    })}
                  />
                </Form.Item>
                <Form.Item
                  label="文章状态"
                  name="status"
                  rules={[{ required: true, message: '请选择文章状态!', trigger: ['blur'] }]}
                >
                  <Select
                    placeholder="请选择文章状态"
                    style={{ width: '100%' }}
                    v-model={[defaultForm.status, 'value']}
                    options={[
                      { value: '1', label: '已发布' },
                      { value: '2', label: '草稿' },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label="文章内容"
                  name="content"
                  rules={[{ required: true, message: '请输入文章内容!', trigger: ['blur'] }]}
                >
                  <UeEditor id="contentEditor" ref={'editorRef'} v-model={[defaultForm.content, 'value']} maxHeight={220} />
                </Form.Item>
                <Form.Item
                  label="文章封面"
                  name="cover_img"
                  rules={[{ required: true, message: '请上传文章封面!', trigger: ['blur'] }]}
                >
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
                      <img src={avatarImg as string} alt="" width={100} height={100} style={{ objectFit: 'cover' }} /> :
                      <div class="ant-upload-text">
                        <PlusOutlined />
                        <p>上传</p>
                      </div>
                    }

                  </Upload>
                </Form.Item>
              </Form>
            </div>
          </Modal>
        </div>
      </>
    )
  }
})