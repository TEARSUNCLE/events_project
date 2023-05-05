import { defineComponent } from "vue"
import styles from '../css/NavBar.module.less'
import useStore from "@/store"
import { Modal, Image } from "ant-design-vue"
import { ExclamationCircleFilled } from "@ant-design/icons-vue"
export default defineComponent({

  setup() {
    const { user } = useStore()

    const showConfirm = () => {
      Modal.confirm({
        title: '温馨提示',
        icon: <ExclamationCircleFilled />,
        content: '确定要退出吗?',
        centered: true,
        okText: "确认",
        cancelText: "取消",
        onOk() {
          user.logout()
        },
        onCancel() { },
      })
    }

    const logout = () => {
      showConfirm()
    }

    return {
      user,
      logout,
    }
  },

  render() {
    const { user, logout } = this
    return (
      <>
        <div class={`${styles.navBar} flexBox flexbetweenX aiCenter pl20 pr20`}>
          <div class="flexBox aiCenter">
            <img src="images/logo.jpg" alt="" width={40} height={40} />
            <p class='fs20 f700 pl5'>智慧管理系统</p>
          </div>

          <div class='flexBox aiCenter'>
            {user.userInfo.user_pic ?
              <Image
                width={30}
                class='hand'
                src={user.userInfo.user_pic}
                preview={{
                  src: user.userInfo.user_pic,
                }}
              /> :
              <img src="images/logo.jpg" alt="" width={30} height={30} class='mr10 avatar' />
            }
            <p class='pr10'>{user.userInfo.nickname || user.userInfo.username}</p>
            <img src="images/layout.png" alt="" width={20} height={20} class='hand' onClick={() => logout()} />
          </div>
        </div>
      </>
    )
  }
})