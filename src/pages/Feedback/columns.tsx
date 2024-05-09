import React from 'react'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'

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
    dataIndex: 'id',
    hideInSearch: true,
  },
  ...commentView(),
  {
    title: '创建时间',
    dataIndex: 'created',
    sorter: true,
    valueType: 'date',
    hideInSearch: true,
    renderFormItem: (_: any, { type, defaultRender, ...rest }: any) => {
      return <RangePicker {...rest} />
    },
    renderText: (val: string) => dayjs(val).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: '创建时间',
    dataIndex: 'created',
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
    dataIndex: 'updated',
    sorter: true,
    hideInSearch: true,
    renderText: (val: string) => dayjs(val).format('YYYY-MM-DD HH:mm:ss')
  },
]