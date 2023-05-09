import { articleListApi, delArticleApi } from "@/api/article";
import { ExclamationCircleFilled, PlusCircleOutlined } from "@ant-design/icons-vue";
import { Button, Col, Input, Modal, Pagination, RangePicker, Row, Select, message } from "ant-design-vue";
import Table, { ColumnsType } from "ant-design-vue/lib/table";
import { computed, defineComponent, onMounted, reactive, ref } from "vue"
import dayjs from 'dayjs'
import { articleCatesApi } from "@/api/articleCates";
import styles from './css/index.module.less'
import CreateArticle from "./components/index";

export default defineComponent({
  setup() {
    const list = ref<any[]>([])
    const articleCates = ref<any[]>([])
    const total = ref<number>(0)

    const otherData = reactive({
      create: false,
      item: {},
      time: new Date().getTime().toString()
    })

    const searchData = reactive({
      data: {
        page: 1,
        pageSize: 10,
        title: '',
        cate_id: null,
        status: null,
        pub_date: ''
      }
    })

    const columns: ColumnsType = [
      {
        title: '文章标题',
        dataIndex: 'title',
        width: '25%',
        align: 'center'
      },
      {
        title: '分类',
        width: '15%',
        align: 'center',
        customRender: ({ text }: any) => {
          return <div>{() => handleCateId(text.cate_id) || '-'}</div>
        }
      },
      {
        title: '发布时间',
        width: '20%',
        align: 'center',
        customRender: ({ text }: any) => {
          return <div>{text.pub_date ? dayjs(text.pub_date * 1000).format('YYYY-MM-DD HH:mm:ss') : '-'}</div>
        }
      },
      {
        title: '状态',
        // dataIndex: 'status',
        width: '15%',
        align: 'center',
        customRender: ({ text }: any) => {
          return <div>{+text.status === 1 ? '已发布' : '草稿'}</div>
        }
      },
      {
        title: '操作',
        align: 'center',
        customRender: ({ text }: any) => {
          return <div class='flexBox flexcenterX' style={{ color: '#4F5EDA' }}>
            <div class='mr10 hand' onClick={() => handleModal(text, 'create')}>编辑</div>
            <div class='mr10 hand'>详情</div>
            <div class='hand' onClick={() => showConfirm(text.id)}>删除</div>
          </div>
        }
      },
    ]

    const changeCates = computed(() => {
      return articleCates.value.map(item => {
        return {
          key: item.id,
          value: item.id,
          label: item.name
        }
      })
    })

    const getListHand = async () => {
      for (const key in searchData.data) {
        if ([null, undefined, ''].includes(searchData.data[key])) delete searchData.data[key]
      }
      const params = {
        ...searchData.data
      }
      if (params.pub_date) {
        params.start = dayjs(params.pub_date[0]).unix()
        params.end = dayjs(params.pub_date[1]).unix()
        delete params.pub_date
      }
      const { data } = await articleListApi(params)
      if (data.code === 0) {
        list.value = data.data.entries
        total.value = data.data.total
      }
    }

    const getCates = async () => {
      const { data } = await articleCatesApi({})
      if (data.code === 0) {
        articleCates.value = data.data
      }
    }

    const handleCateId = (id: number) => {
      if (articleCates.value.length) {
        return articleCates.value.find(item => item.id === id).name
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
      const { data } = await delArticleApi({ id })
      if (data.code === 0) {
        message.success('已删除')
        getListHand()
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
          console.log('Cancel')
        },
      })
    }

    const pageChange = (page: number, pageSize: number) => {
      searchData.data.page = page
      searchData.data.pageSize = pageSize
      getListHand()
    }

    const handleReset = () => {
      searchData.data.title = ''
      searchData.data.cate_id = null
      searchData.data.status = null
      searchData.data.pub_date = ''
    }

    onMounted(() => {
      getCates()
      getListHand()
    })

    return {
      columns,
      list,
      otherData,
      total,
      handleModal,
      setModalFn,
      changeCates,
      searchData,
      getListHand,
      handleReset,
      pageChange,
      articleCates,
    }
  },

  render() {
    const {
      columns,
      list,
      otherData,
      total,
      handleModal,
      setModalFn,
      changeCates,
      searchData,
      getListHand,
      handleReset,
      pageChange,
      articleCates
    } = this
    return (
      <>
        <div class={`${styles.articleBox} pl5 pr5`}>
          <div>
            <Row gutter={40}>
              <Col span={4} class='pb15'>
                <Input
                  placeholder="文章标题"
                  v-model={[searchData.data.title, 'value']}
                />
              </Col>
              <Col span={4} class='pb15'>
                <Select
                  placeholder="文章类别"
                  style={{ width: '100%' }}
                  v-model={[searchData.data.cate_id, 'value']}
                  options={[{ value: '-1', label: '全部' }, ...changeCates]}
                />
              </Col>
              <Col span={9} class='pb15'>
                <RangePicker
                  showTime={{ defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')] }}
                  style={{ 'width': '100%' }}
                  placeholder={['开始时间', '结束时间']}
                  v-model={[searchData.data.pub_date, 'value']}
                />
              </Col>
              <Col span={4} class='pb15'>
                <Select
                  placeholder="文章状态"
                  style={{ width: '100%' }}
                  v-model={[searchData.data.status, 'value']}
                  options={[
                    { value: '-1', label: '全部' },
                    { value: '1', label: '已发布' },
                    { value: '2', label: '草稿' },
                  ]}
                />
              </Col>
            </Row>
          </div>
          <div class='mb5 flexBox flexcenterX'>
            <Button class='mr20 pageBtn searchBtn search' onClick={() => getListHand()}>查询</Button>
            <Button class='pageBtn resetBtn reset' onClick={() => handleReset()}>重置</Button>
          </div>
          <div>
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              class={'searchBtns fs12'}
              onClick={() => handleModal({}, 'create')}
            >
              新增文章
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

          <div class='textCenter mt10'>
            <Pagination
              current={searchData.data.page}
              defaultPageSize={searchData.data.pageSize}
              total={total}
              pageSizeOptions={['15', '10', '20', '50', '100']}
              showSizeChanger
              showQuickJumper
              onChange={(page: number, pageSize: number) => pageChange(page, +pageSize)}
              locale={{
                items_per_page: '条/页',
                jump_to: '跳转至',
                page: '页',
                prev_page: '上一页',
                next_page: '下一页',
              }}
              showTotal={(total: number) => `共${total}条`}
            />
          </div>

          {otherData.create && <CreateArticle isModalVisible={otherData.create} curItem={{ ...otherData.item, time: otherData.time, cateTypes: articleCates }} onSetModalFn={setModalFn} />}
        </div>
      </>
    )
  }
})