import React, { useRef, useCallback, memo, useMemo } from 'react';
import { Space, Button, Upload } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import { connect } from 'umi';
import { mapStateToProps, mapDispatchToProps } from './connect';
import column from './columns';
import { getMediaList, uploadFileImprove, deleteMedia } from '@/services';
import { commonDeleteMethod } from '@/utils';

const MediaManage = memo(() => {
  const actionRef = useRef<ActionType>();

  const handleRemove = useCallback(async (selectedRows: API_MEDIA.MediaData[]) => {
    return commonDeleteMethod<API_MEDIA.MediaData>(
      selectedRows,
      (row: API_MEDIA.MediaData) => {
        const { id } = row;
        return deleteMedia({
          id,
        });
      },
      actionRef.current?.reloadAndRest,
    );
  }, []);

  const columns: any[] = useMemo(() => {
    return [
      ...column,
      {
        title: '操作',
        key: 'option',
        dataIndex: 'option',
        valueType: 'option',
        fixed: 'right',
        width: 80,
        render: (_: any, record: API_MEDIA.MediaData) => {
          return (
            <Space>
              <a style={{ color: 'red' }} onClick={() => handleRemove([record])}>
                删除
              </a>
            </Space>
          );
        },
      },
    ];
  }, [handleRemove]);

  const fetchData = useCallback(async (params: any) => {
    const { current, ...nextParams } = params;
    const newParams = {
      ...nextParams,
      current: current,
    };
    return getMediaList(newParams)
      .then((data) => {
        return { 
          data: data.list, 
          total: data.total
        }
      })
  }, []);

  return (
    <ProTable
      scroll={{ x: 'max-content' }}
      headerTitle="媒体资源列表"
      pagination={{ defaultPageSize: 10 }}
      actionRef={actionRef}
      rowKey="id"
      request={fetchData}
      columns={columns}
      rowSelection={false}
      search={false}
      toolBarRender={() => {
        return [
          <Upload
            accept='image/*'
            multiple={false}
            beforeUpload={async (file) => {
              await uploadFileImprove(file)
              actionRef.current?.reloadAndRest?.()
              return false 
            }}
            showUploadList={false}
          >
            <Button type="primary">
              新增
            </Button>
          </Upload>
        ]
      }}
    />
  );
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaManage);
