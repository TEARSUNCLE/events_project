import { AppstoreOutlined, FileTextOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons-vue"
import { Menu } from "ant-design-vue"
import { defineComponent, ref } from "vue"
import styles from '../css/SideNav.module.less'
import { useRoute, useRouter } from "vue-router"
export default defineComponent({

  setup() {
    const menuList = ref([
      {
        key: 'dashboard',
        icon: <HomeOutlined />,
        label: '首页',
      },
      {
        key: 'articleCates',
        icon: <FileTextOutlined />,
        label: '文章类别',
      },
      {
        key: 'articleList',
        icon: <FileTextOutlined />,
        label: '文章列表',
      },
      {
        key: 'personal',
        icon: <UserOutlined />,
        label: '个人中心',
        children: [
          {
            key: 'info',
            icon: <AppstoreOutlined />,
            label: '基本资料',
          },
          {
            key: 'avatar',
            icon: <AppstoreOutlined />,
            label: '更换头像',
          },
          {
            key: 'resetPwd',
            icon: <AppstoreOutlined />,
            label: '重置密码',
          },
        ]
      },
    ])

    const router = useRouter()
    const route = useRoute()

    const selectedKeys = ref([route.path.replace("/", "")])

    const handleClick = (row: { key: string }) => {
      if (row) {
        selectedKeys.value = [row.key]
        router.push(`/${row.key}`)
      }
    }

    return {
      menuList,
      handleClick,
      selectedKeys
    }
  },

  render() {
    const { menuList, handleClick, selectedKeys } = this
    return (
      <>
        <div class={styles.sideNav}>
          <Menu
            theme="light"
            mode="inline"
            style={{ width: '220px' }}
            v-model:selectedKeys={selectedKeys}
          >
            {menuList.map(item => {
              if (item.children) {
                return (
                  <Menu.SubMenu key={item.key} onclick={() => handleClick(item)} title={
                    <>
                      {item.icon}
                      <span>{item.label}</span>
                    </>
                  }
                  >
                    {item.children.map(child => {
                      return (
                        <Menu.Item key={child.key} onclick={() => handleClick(child)}>
                          {child.icon}
                          <span>{child.label}</span>
                        </Menu.Item>
                      )
                    })
                    }
                  </Menu.SubMenu>
                )
              } else {
                return (
                  <Menu.Item key={item.key} onclick={() => handleClick(item)}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Menu.Item>
                )
              }
            })
            }
          </Menu>
        </div >
      </>
    )
  }
})