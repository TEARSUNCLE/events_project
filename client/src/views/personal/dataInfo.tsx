import { updateInfoApi } from "@/api/user"
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
      nickname: user.userInfo.nickname || '',
      email: user.userInfo.email || ''
    })

    const handleOk = async () => {
      if (!(defaultForm.nickname.trim() || defaultForm.email.trim())) return message.error('请输入昵称和邮箱!')
      const reg = /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-zA-Z\.]{2,6})$/
      if (!reg.test(defaultForm.email)) return message.error('请填写正确的邮箱地址')

      const params = {
        ...defaultForm,
        id: user.userInfo.id
      }
      // for (const key in params) {
      //   if (!params[key]) delete params[key]
      // }
      const { data } = await updateInfoApi(params)
      if (data.code === 0) {
        message.success('已修改')
        emit('setModalFn', 'dataInfo', 'success')
      }
    }

    const handleCancel = () => {
      emit('setModalFn', 'dataInfo', 'cancel')
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
    const { defaultForm, handleOk, handleCancel, user } = this
    return (
      <>
        <div id={props.curItem.time as string}>
          <Modal
            title={'修改用户信息'}
            visible={props.isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={600}
            okText={'提交'}
          >
            <div>
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
                  label="账号"
                  name="account"
                >
                  <Input value={user.userInfo.username} disabled placeholder="请输入账号" />
                </Form.Item>
                <Form.Item
                  label="用户昵称"
                  name="nickname"
                >
                  <Input
                    v-model={[defaultForm.nickname, 'value']}
                    placeholder="请输入用户昵称"
                    showCount={{ formatter: (info: { count: number }) => <span>{info.count}/6</span> }}
                    maxLength={6}
                  />
                </Form.Item>
                <Form.Item
                  label="用户邮箱"
                  name="email"
                >
                  <Input
                    v-model={[defaultForm.email, 'value']}
                    placeholder="请输入用户邮箱"
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