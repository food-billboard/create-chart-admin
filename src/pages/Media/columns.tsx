import React from 'react'
import { DatePicker, Image } from 'antd'
import dayjs from 'dayjs'
import { createUploadResultFileUrl } from '@/utils/utils'

const { RangePicker } = DatePicker

export default [
  {
    title: 'id',
    dataIndex: 'id',
    hideInSearch: true,
    copyable: true,
  },
  {
    title: '文件地址',
    dataIndex: 'src',
    hideInSearch: true,
    renderText: (_: any, record: any) => {
      const url = createUploadResultFileUrl(record)
      return (
        <Image src={url} width={100} />
      )
    }
  },
  {
    title: '创建时间',
    dataIndex: 'created',
    sorter: true,
    hideInSearch: true,
    renderText: (val: string) => {
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  {
    title: '创建时间',
    dataIndex: 'created',
    valueType: 'dateRange',
    hideInTable: true,
    renderFormItem: (_: any, { type, defaultRender, ...rest }: any) => {
      return <RangePicker {...rest} />
    },
    search: {
      transform: (value: any) => {
        return {
          start_date: value[0],
          end_end: value[1],
        };
      },
    },
  },
  // {
  //   title: '内容',
  //   dataIndex: 'content',
  //   valueType: 'text',
  //   hideInTable: true,
  // },
  {
    title: '更新时间',
    dataIndex: 'updated',
    sorter: true,
    hideInSearch: true,
    renderText: (val: string) => dayjs(val).format('YYYY-MM-DD HH:mm:ss')
  },
]