import { updatePwdApi } from "@/api/user"
import useStore from "@/store"
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

    const { user } = useStore()

    const defaultForm = reactive({
      oldPwd: '',
      newPwd: '',
      confirmPwd: ''
    })

    const handleOk = async () => {
      const values = await ruleForm.value.validateFields().then(values => values)
      if (!values) return
      if (defaultForm.newPwd !== defaultForm.confirmPwd) return message.error('新密码和确认密码不一致!')

      const { data } = await updatePwdApi({ oldPwd: defaultForm.oldPwd, newPwd: defaultForm.newPwd })
      if (data.code === 0) {
        message.success('已修改')
        emit('setModalFn', 'resetPwd', 'success')
      }
    }

    const handleCancel = () => {
      emit('setModalFn', 'resetPwd', 'cancel')
    }

    return {
      defaultForm,
      handleOk,
      handleCancel,
      ruleForm,
      user,
    }
  },

  render(props) {
    const { defaultForm, handleOk, handleCancel } = this
    return (
      <>
        <div id={props.curItem.time as string}>
          <Modal
            title={'修改密码'}
            visible={props.isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={600}
            okText={'修改'}
          >
            <div>
              <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 19 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                model={defaultForm}
                ref='ruleForm'
              >
                <Form.Item
                  label="原密码"
                  name="oldPwd"
                  rules={[
                    { required: true, message: '请输入原密码!', trigger: ['blur'] },
                    { min: 6, max: 12, message: '密码长度为6~12位!', trigger: ['blur'] }
                  ]}
                >
                  <Input
                    v-model={[defaultForm.oldPwd, 'value']}
                    placeholder="请输入原密码"
                  />
                </Form.Item>
                <Form.Item
                  label="新密码"
                  name="newPwd"
                  rules={[
                    { required: true, message: '请输入新密码!', trigger: ['blur'] },
                    { min: 6, max: 12, message: '密码长度为6~12位!', trigger: ['blur'] }
                  ]}
                >
                  <Input
                    v-model={[defaultForm.newPwd, 'value']}
                    placeholder="请输入新密码"
                  />
                </Form.Item>
                <Form.Item
                  label="确认新密码"
                  name="confirmPwd"
                  rules={[
                    { required: true, message: '再次输入新密码!', trigger: ['blur'] },
                    { min: 6, max: 12, message: '密码长度为6~12位!', trigger: ['blur'] }
                  ]}
                >
                  <Input
                    v-model={[defaultForm.confirmPwd, 'value']}
                    placeholder="再次输入新密码"
                  />
                </Form.Item>
              </Form>
            </div>
          </Modal>
        </div>
      </>
    )
  }
})