import { request } from '@/utils'
import PocketBase, {
  parseFilter,
} from '../utils/pocketBaseRequest';

// 大屏列表
export const getScreenList = (
  params: API_SCREEN.IGetScreenListParams,
):Promise<API_SCREEN.IGetScreenListRes> => {
  const { currPage, pageSize, content, flag } = params;
  return PocketBase.collection('screen').getList<API_SCREEN.IGetScreenListRes>(
    currPage,
    pageSize,
    {
      filter: parseFilter([
        {
          key: 'flag',
          value: flag,
          operator: '=',
        },
        {
          key: 'name',
          value: content,
          operator: '~',
        },
        {
          key: 'description',
          value: content,
          operator: '~',
        },
      ]),
      expand: 'user',
      fields: 'id,description,name,flag,poster,enable,expand.user.username,expand.user.avatar,expand.user.id,created,updated,version',
    },
  ) as any;
};

// 大屏删除
export const deleteScreen = (
  params: { id: string },
) => {
  return PocketBase.collection('screen').delete(params.id);
};

// 大屏启用
export const enableScreen = (data: { id: string }) => {
  return PocketBase.collection('screen').update(data.id, {
    enable: true,
  });
};

// 大屏禁用
export const disabledScreen = (
  params: { id: string }
) => {
  return PocketBase.collection('screen').update(params.id, {
    enable: false,
  });
};

// 大屏模板列表
export const getScreenModelList = (
  params: API_SCREEN.IGetScreenListParams,
): Promise<API_SCREEN.IGetScreenListRes> => {
  const { currPage, pageSize, content, flag } = params;
  return PocketBase.collection('model').getList<API_SCREEN.IGetScreenListRes>(
    currPage,
    pageSize,
    {
      filter: parseFilter([
        {
          key: 'flag',
          value: flag,
          operator: '=',
        },
        {
          key: 'name',
          value: content,
          operator: '~',
        },
        {
          key: 'description',
          value: content,
          operator: '~',
        },
      ]),
      fields: 'id,description,name,flag,poster,enable',
    },
  ) as any;
};

// 大屏模板删除
export const deleteScreenModel = (
  params: { id: string }
) => {
  return PocketBase.collection('model').delete(params.id);
};



// mock数据列表
export const getScreenMockList = async (params: API_SCREEN.IGetScreenMockParams) => {
  return request<API_SCREEN.IGetScreenMockRes>('/api/manage/screen/mock', {
    method: 'GET',
    params
  })
}

// mock数据新增
export const postScreenMock = async (data: API_SCREEN.IPostScreenMockDataParams) => {
  return request('/api/manage/screen/mock', {
    method: 'POST',
    data
  })
}

// mock数据删除
export const deleteScreenMock = async (params: { id: string }) => {
  return request('/api/manage/screen/mock', {
    method: 'DELETE',
    params
  })
}

// mock数据修改
export const updateScreenMock = async (data: API_SCREEN.IPutScreenMockDataParams) => {
  return request('/api/manage/screen/mock', {
    method: 'PUT',
    data
  })
}

// 大屏模板导入
export const leadInScreen = async (data: API_SCREEN.ILeadInScreenParams) => {
  return request('/api/screen/pre/leadin', {
    method: 'POST',
    data
  })
}

// 大屏模板导出
export const exportScreen = async (data: API_SCREEN.ILeadInScreenParams) => {
  return request('/api/screen/pre/export', {
    method: 'POST',
    data,
    responseType: 'arraybuffer',
    origin: true 
  })
}