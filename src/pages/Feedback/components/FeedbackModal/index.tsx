import React, { forwardRef, useImperativeHandle, useState, useCallback } from 'react'
import { Modal, Input } from 'antd'

export type TFeedbackEditData = API_FEEDBACK.GetFeedbackData

export interface IFeedbackModalRef {
  open: (data?: TFeedbackEditData) => void
}

export interface IFeedbackModalProps {
  onOk?: (data: {
    replay: string 
    id?: string 
  }) => Promise<boolean>
  onCancel?: () => Promise<boolean>
}

export default forwardRef<IFeedbackModalRef, IFeedbackModalProps>((props, ref) => {

  const { onOk, onCancel } = props

  const [ visible, setVisible ] = useState(false)
  const [ inputValue, setInputValue ] = useState('')
  const [ feedbackId, setFeedbackId ] = useState('')

  const openModal = useCallback((values?: TFeedbackEditData) => {
    setFeedbackId(values?.id || '')
      setVisible(true)
  }, [])

  useImperativeHandle(ref, () => ({
    open: openModal
  }), [openModal])

  const onInputOk = useCallback(async () => {
    let res = true 
    if(onOk) {
      res = await onOk({
        replay: inputValue,
        id: feedbackId
      })
    }
    if(res) {
      setVisible(false)
    }
  }, [onOk, inputValue, feedbackId])

  const onInputCancel = useCallback(async () => {
    let res = true 
    if(onCancel) {
      res = await onCancel()
    }
    if(res) {
      setVisible(false)
    }
  }, [onCancel])

  return (
    <Modal
    open={visible}
      okText="确定"
      cancelText="取消"
      title='提示'
      onOk={onInputOk}
      onCancel={onInputCancel}
    >
      <Input.TextArea
        autoSize
        defaultValue="输入对此次处理的描述"
        maxLength={100}
        showCount
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </Modal>
  )

})