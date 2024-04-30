import PocketBase from '../utils/pocketBaseRequest';

// 文件上传
export async function uploadFileImprove(
  file: File,
): Promise<Upload.MediaData> {
  const formData = new FormData();
  formData.append('file', file);
  return PocketBase.collection('media').create(formData);
}