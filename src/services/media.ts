import PocketBase from '../utils/pocketBaseRequest';

// 获取媒体资源列表
export async function getMediaList(
  params: API_MEDIA.MediaParams,
): Promise<API_MEDIA.MediaDataRes> {
  const { current, pageSize } = params;
  return PocketBase.collection('media')
    .getList<API_MEDIA.ResponseListData<API_MEDIA.MediaData>>(
      current,
      pageSize,
      {
        
      }
    ) as any;
}

// 删除媒体资源
export async function deleteMedia(
  params: { id: string }
) {
  return PocketBase.collection('media')
    .delete(params.id)
}