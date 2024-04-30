import React from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'

const { RangePicker } = DatePicker

export const commentView = () => {
  return [
    {
      title: '文字内容',
      dataIndex: 'text',
      ellipsis: true,
      hideInSearch: true,
      renderText: (_: any, record: API_USER.IGetFeedbackData) => {
        return record.content.text
      }
    },
    {
      title: '图片内容',
      dataIndex: 'image',
      hideInSearch: true,
    },
  ]
}

export default [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'id',
    dataIndex: '_id',
    hideInSearch: true,
  },
  ...commentView(),
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    sorter: true,
    valueType: 'date',
    hideInSearch: true,
    renderFormItem: (_: any, { type, defaultRender, ...rest }: any) => {
      return <RangePicker {...rest} />
    },
    renderText: (val: string) => moment(val).format('YYYY-MM-DD hh:mm:ss')
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value: any) => {
        return {
          start_date: value[0],
          end_end: value[1],
        };
      },
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    sorter: true,
    hideInSearch: true,
    renderText: (val: string) => moment(val).format('YYYY-MM-DD hh:mm:ss')
  },
]