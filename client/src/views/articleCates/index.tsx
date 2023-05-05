import { articleCatesApi, delCatesApi } from "@/api/articleCates";
import { ExclamationCircleFilled, PlusCircleOutlined } from "@ant-design/icons-vue";
import { Button, Modal, message } from "ant-design-vue";
import Table, { ColumnsType } from "ant-design-vue/lib/table";
import { defineComponent, onMounted, reactive, ref } from "vue"
import CreateCates from "./components/createCates";

export default defineComponent({
  setup() {
    const list = ref<any[]>([])

    const otherData = reactive({
      create: false,
      item: {},
      time: new Date().getTime().toString()
    })

    const columns: ColumnsType = [
      {
        title: '分类名称',
        dataIndex: 'name',
        width: '35%',
      },
      {
        title: '分类别名',
        dataIndex: 'alias',
        width: '35%'
      },
      {
        title: '操作',
        align: 'center',
        customRender: ({ text }: any) => {
          return <div class='flexBox flexcenterX' style={{ color: '#4F5EDA' }}>
            <div class='mr10 hand' onClick={() => handleModal(text, 'create')}>编辑</div>
            <div class='hand' onClick={() => showConfirm(text.id)}>删除</div>
          </div>
        }
      },
    ]

    const getListHand = async () => {
      const { data } = await articleCatesApi({})
      if (data.code === 0) {
        list.value = data.data
      }
    }

    const handleModal = (row = {}, type) => {
      if (row) otherData.item = row
      otherData[type] = !otherData[type]
    }

    const setModalFn = (module: string, type: string) => {
      if (type === 'success') {
        getListHand()
      }
      otherData[module] = false
    }

    const handleDel = async (id: number) => {
      const { data } = await delCatesApi(id)
      if (data.code === 0) {
        message.success('已删除')
      }
    }

    const showConfirm = (id: number) => {
      Modal.confirm({
        title: '温馨提示',
        icon: <ExclamationCircleFilled />,
        content: '确定要删除该数据吗？',
        centered: true,
        okText: "确认",
        cancelText: "取消",
        onOk() {
          handleDel(id)
        },
        onCancel() {
          console.log('Cancel');
        },
      })
    }

    onMounted(() => {
      getListHand()
    })

    return {
      columns,
      list,
      otherData,
      handleModal,
      setModalFn,
    }
  },

  render() {
    const { columns, list, otherData, handleModal, setModalFn } = this
    return (
      <>
        <div class='pl5 pr5'>
          <div>
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              class={'searchBtns fs12'}
              onClick={() => handleModal({}, 'create')}
            >
              新增类别
            </Button>
          </div>

          <div>
            <Table
              class='mt5'
              columns={columns}
              dataSource={list}
              pagination={false}
              scroll={{ x: '100%' }}
              rowKey={'id'}
              row-class-name={(_record: any, index: number) => (index % 2 !== 1 ? 'table-striped' : null)}
            />
          </div>

          {otherData.create && <CreateCates isModalVisible={otherData.create} curItem={{ ...otherData.item, time: otherData.time }} onSetModalFn={setModalFn} />}
        </div>
      </>
    )
  }
})