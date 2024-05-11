import React, { useRef, useCallback, memo, useMemo } from 'react'
import { message, Space } from 'antd'
import ProTable from '@ant-design/pro-table'
import type { ActionType } from '@ant-design/pro-table'
import { connect } from 'umi'
import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'
import FeedbackModal from './components/FeedbackModal'
import type { IFeedbackModalRef } from './components/FeedbackModal'
import { mapStateToProps, mapDispatchToProps } from './connect'
import column from './columns'
import { getFeedback, dealFeedback } from '@/services'

const FeedbackManage = memo(() => {

  const actionRef = useRef<ActionType>()
  const feedbackRef = useRef<IFeedbackModalRef>(null)

  /**
   * 添加节点
   * @param fields
   */
  const handleAdd = useCallback(async (fields) => {
    const hide = message.loading('正在修改')

    return dealFeedback(fields)
    .then(() => {
      message.success('操作成功')
      hide()
      actionRef.current?.reload()
    })
    .catch(() => {
      message.success('操作失败，请重试')
      hide()
    })

  }, [])

  const edit = useCallback((data: API_FEEDBACK.GetFeedbackData) => {
    feedbackRef.current?.open(data)
  }, [])

  const columns: any[] = useMemo(() => {
    return [
      ...column ,
      {
        title: '操作',
        key: 'option',
        dataIndex: 'option',
        valueType: 'option',
        fixed: 'right',
        render: (_: any, record: API_FEEDBACK.GetFeedbackData) => {
          return (
            <Space>
              {
                !record.deal && (
                  <a
                    onClick={edit.bind(null, record)}
                  >
                    完成处理
                  </a>
                )
              }
            </Space>
          )
        }
      }
    ]
  
  }, [edit])

  const fetchData = useCallback(async (params: any) => {
    const { current, ...nextParams } = params
    let newParams = {
      ...nextParams,
      currPage: current - 1
    }
    newParams = pickBy(newParams, identity)
    return getFeedback(newParams)
    .then(({ list, total }) => {
      return { 
        data: list, 
        total 
      }
    })
    .catch(() => ({ data: [], total: 0 }))
  }, [])

  const onInputOk = useCallback(async (value) => {
    return handleAdd(value)
    .then(() => true)
    .catch(() => false)
  }, [handleAdd])

  return (
    <>
      <ProTable
        scroll={{ x: 'max-content' }}
        headerTitle="用户反馈列表"
        actionRef={actionRef}
        pagination={{defaultPageSize: 10}}
        rowKey="id"
        request={fetchData}
        columns={columns}
        rowSelection={{}}
      />
      <FeedbackModal
        ref={feedbackRef}
        onOk={onInputOk}
      />
  </>
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackManage)