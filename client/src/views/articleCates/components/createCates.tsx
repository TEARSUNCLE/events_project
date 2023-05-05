import { createCatesApi, updateCatesApi } from "@/api/articleCates"
import { Form, Input, Modal, message } from "ant-design-vue"
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

    const formData = reactive({
      name: '' || props.curItem.name,
      alias: '' || props.curItem.alias,
      id: '' || props.curItem.id
    })

    const handleOk = () => {
      ruleForm.value.validateFields().then(async values => {
        if (values) {
          if (props.curItem.id) {
            const { data } = await updateCatesApi(formData)
            if (data.code === 0) {
              message.success('修改成功')
              emit('setModalFn', 'create', 'success')
            }
          } else {
            delete formData.id
            const { data } = await createCatesApi(formData)
            if (data.code === 0) {
              message.success('添加成功')
              emit('setModalFn', 'create', 'success')
            }
          }
        }
      })
    }
    const handleCancel = () => {
      emit('setModalFn', 'create', 'close')
    }

    return {
      formData,
      handleOk,
      handleCancel,
      ruleForm,
    }
  },

  render(props) {
    const { formData, handleOk, handleCancel } = this
    return (
      <>
        <div id={props.curItem.time as string}>
          <Modal
            title={props.curItem.id ? '修改文章分类' : '新增文章分类'}
            visible={props.isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={600}
          >
            <Form
              name="basic"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              model={formData}
              ref='ruleForm'
            >
              <Form.Item
                label="分类名称"
                name="name"
                rules={[{ required: true, message: '请输入分类名称!', trigger: ['blur'] }]}
              >
                <Input v-model={[formData.name, 'value']} placeholder="请输入分类名称!" />
              </Form.Item>
              <Form.Item
                label="分类别名"
                name="alias"
                rules={[{ required: true, message: '请输入分类别名!', trigger: ['blur'] }]}
              >
                <Input v-model={[formData.alias, 'value']} placeholder="请输入分类别名!" />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </>
    )
  }
})