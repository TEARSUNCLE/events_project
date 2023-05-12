import { defineComponent, reactive } from "vue"
import styles from '../css/NavBar.module.less'
import useStore from "@/store"
import { Modal, Image, Dropdown, Space, Menu } from "ant-design-vue"
import { DownOutlined, ExclamationCircleFilled } from "@ant-design/icons-vue"
import DataInfo from "@/views/personal/dataInfo"
import ChangeAvatar from "@/views/personal/changeAvatar"
import ChangePwd from "@/views/personal/changePwd"
export default defineComponent({

  setup() {
    const { user } = useStore()

    const modalShow = reactive({
      dataInfo: false,
      changeAvatar: false,
      resetPwd: false,
      time: new Date().getTime().toString()
    })

    const menu = (
      <Menu>
        <Menu.Item key="dataInfo" onClick={() => handleModal('dataInfo')}>基本资料</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="changeAvatar" onClick={() => handleModal('changeAvatar')}>更换头像</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="resetPwd" onClick={() => handleModal('resetPwd')}>修改密码</Menu.Item>
      </Menu>
    );

    const handleModal = (key: string) => {
      modalShow[key] = true
    }

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

    const setModalFn = (module: string, type: string) => {
      if (type === 'success') {
        user.getUserInfo()
      }
      modalShow[module] = false
    }

    return {
      user,
      logout,
      menu,
      handleModal,
      modalShow,
      setModalFn,
    }
  },

  render() {
    const { user, logout, menu, handleModal, modalShow, setModalFn } = this
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
            <p class='pr10'>
              <Dropdown overlay={menu} placement={'bottom'} overlayStyle={{ 'marginTop': '12px' }} onClick={() => handleModal()}>
                <a onClick={e => e.preventDefault()}>
                  <Space>
                    {user.userInfo.nickname || user.userInfo.username}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </p>
            <img src="images/layout.png" alt="" width={20} height={20} class='hand' onClick={() => logout()} />
          </div>
        </div>

        {/* 修改信息 */}
        {modalShow.dataInfo && <DataInfo isModalVisible={modalShow.dataInfo} onSetModalFn={setModalFn} />}
        {/* 更换头像 */}
        {modalShow.changeAvatar && <ChangeAvatar isModalVisible={modalShow.changeAvatar} onSetModalFn={setModalFn} />}
        {/* 修改密码 */}
        {modalShow.resetPwd && <ChangePwd isModalVisible={modalShow.resetPwd} onSetModalFn={setModalFn} />}
      </>
    )
  }
})