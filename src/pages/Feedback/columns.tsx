import dayjs from 'dayjs'

export default [
  {
    title: 'id',
    dataIndex: 'id',
    hideInSearch: true,
  },
  {
    title: '问题描述',
    dataIndex: 'description',
    ellipsis: true,
    width: 200,
  },
  {
    title: '截图',
    dataIndex: 'image',
    hideInSearch: true,
  },
  {
    title: '回复内容',
    dataIndex: 'replay',
    width: 200,
  },
  {
    title: '处理情况',
    dataIndex: 'deal',
    valueType: 'switch',
    width: 100,
    renderText: (value: any) => value ? '处理完成' : '待处理'
  },
  {
    title: '创建时间',
    dataIndex: 'created',
    sorter: true,
    valueType: 'date',
    hideInSearch: true,
    renderText: (val: string) => dayjs(val).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: '更新时间',
    dataIndex: 'updated',
    sorter: true,
    hideInSearch: true,
    renderText: (val: string) => dayjs(val).format('YYYY-MM-DD HH:mm:ss')
  },
]