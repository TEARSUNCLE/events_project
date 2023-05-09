import { Transition, defineComponent } from "vue"
import NavBar from "./components/NavBar"
import SideNav from "./components/SideNav"
import { RouterView } from "vue-router"
import { Content } from "ant-design-vue/lib/layout/layout"
import styles from './css/Home.module.less'
import { ConfigProvider } from "ant-design-vue"
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default defineComponent({

  setup() { },

  render() {
    return (
      <>
        <ConfigProvider locale={zhCN}>
          <section class={styles.home}>
            <div>
              {/* 顶部 */}
              <NavBar />

              <div class='flexBox'>
                {/* 侧边栏 */}
                <SideNav />

                {/* 主体内容 */}
                <Content>
                  <Transition>
                    <RouterView />
                  </Transition>
                </Content>
              </div>
            </div>
          </section>
        </ConfigProvider>
      </>
    )
  }
})