import { defineComponent, reactive, ref } from "vue"
import { Button, Form, Input, Space, message } from "ant-design-vue"
import { LockOutlined, UserOutlined, createFromIconfontCN } from "@ant-design/icons-vue"
import { Rule } from "ant-design-vue/lib/form"
import { loginApi, registerApi } from "@/api/user"
import styles from './css/index.module.less'
import { setToken } from "@/utils/storage"
import { useRouter } from "vue-router"
import useStore from "@/store"

export default defineComponent({

  setup() {
    const ruleForm = ref<any>(null)
    // 区分登录还是注册，默认登录
    const isLogin = ref<boolean>(true)
    const router = useRouter()
    const { user } = useStore()

    const formData = reactive({
      username: '',
      password: ''
    })

    const handleLogin = async () => {
      const values = await ruleForm.value.validateFields().then((values: any) => values)
      if (values) {
        if (isLogin.value) {
          // 登录
          const { data } = await loginApi(formData)
          if (data.code === 0) {
            // 登录成功
            setToken(data.token)
            user.setLoginTime(new Date().getTime().toString())
            router.push('/dashboard')
          }
        } else {
          const { data } = await registerApi(formData)
          if (data.code === 0) {
            // 登录成功
            message.success('注册成功，可以登录啦!')
            ruleForm.value.resetFields()
            isLogin.value = true
          }
        }
      }
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleLogin()
    })

    const inputFocus = (num: string) => {
      const line = Array.from(document.querySelectorAll('.bottomLine'))
      const icon = Array.from(document.querySelectorAll('.site-form-item-icon'))
      line[+num - 1]?.classList.add('commonBefore')
      icon[+num - 1]?.classList.add('commonColor')
    }

    const inputBlur = (num: string) => {
      const line = Array.from(document.querySelectorAll('.bottomLine'))
      const icon = Array.from(document.querySelectorAll('.site-form-item-icon'))
      line[+num - 1]?.classList.remove('commonBefore')
      icon[+num - 1]?.classList.remove('commonColor')
    }

    const toggleStatus = (state: boolean) => {
      ruleForm.value.resetFields()
      isLogin.value = state
    }

    const usernameValidator = () => {
      const reg = /^[a-zA-Z0-9]{1,10}$/
      if (!formData.username) {
        return Promise.reject(isLogin ? '请输入用户名!' : '请设置用户名!')
      } else if (!reg.test(formData.username)) {
        return Promise.reject(isLogin ? '请输入1~10位大小写字母和数字!' : '请设置1~10位大小写字母和数字!')
      } else {
        return Promise.resolve()
      }
    }

    const rules: Record<string, Rule[]> = {
      username: [{ required: true, validator: usernameValidator, trigger: 'blur' }],
      password: [
        { required: true, message: isLogin ? '请输入密码!' : '请设置密码!', trigger: 'blur' },
        { pattern: new RegExp(/^[a-zA-Z0-9]{6,10}$/), message: '6~10位大小写字母或数字字符等!', trigger: 'blur' }
      ],
    }

    return {
      inputFocus,
      inputBlur,
      formData,
      rules,
      ruleForm,
      handleLogin,
      isLogin,
      toggleStatus,
    }
  },

  render() {
    const { inputFocus, inputBlur, formData, rules, handleLogin, isLogin, toggleStatus } = this
    const Icon = createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/c/font_4038700_c1js7ua0304.js'
    })
    return (
      <div class={`${styles.loginBox} flexWrap`}>
        <div class='loginForm bg-ff'>
          <p class='c-333 textCenter title pb50'>{isLogin ? '登录' : '注册'}</p>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            model={formData}
            rules={rules}
            ref='ruleForm'
          >
            <Form.Item
              label=""
              name="username"
            >
              <span class='c-333 pl7'>用户名</span>
              <Input
                prefix={<UserOutlined class="site-form-item-icon" />}
                placeholder={isLogin ? '请输入用户名' : '请设置用户名'}
                v-model={[formData.username, 'value']}
                onfocus={() => inputFocus('1')}
                onblur={() => inputBlur('1')}
              />
              <span class='bottomLine'></span>
            </Form.Item>

            <Form.Item
              label=""
              name="password"
            >
              <span class='c-333 pl7'>密码</span>
              <Input.Password
                prefix={<LockOutlined class="site-form-item-icon" />}
                placeholder={isLogin ? '请输入密码' : '请设置密码'}
                v-model={[formData.password, 'value']}
                onfocus={() => inputFocus('2')}
                onblur={() => inputBlur('2')}
              />
              <span class='bottomLine'></span>
            </Form.Item>
          </Form>
          <div class='mb30 textRight mr10'>
            {isLogin ?
              <a href="#" class='commonHover'>忘记密码?</a> :
              <a href="#" class='commonHover' onClick={() => toggleStatus(true)}>已有账号?去登录</a>
            }
          </div>

          <Space direction="vertical" style={{ width: '100%' }}>
            <Button type="primary" block shape="round" class="fs16" onClick={() => handleLogin()}>
              {isLogin ? '登录' : '注册'}
            </Button>
          </Space>

          {isLogin &&
            <div>
              <div class='pt50 pb15 textCenter c-666'>
                <span>第三方登录</span>
              </div>

              <div class='textCenter mb15'>
                <a href="#" class='icon'>
                  <Icon type="icon-facebook" />
                </a>
                <a href="#" class='icon'>
                  <Icon type="icon-tuite1" />
                </a>
                <a href="#" class='icon'>
                  <Icon type="icon-google" />
                </a>
              </div>

              <div class='textCenter'>
                <a href="#" class='commonHover' onClick={() => toggleStatus(false)}>立即注册</a>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
})