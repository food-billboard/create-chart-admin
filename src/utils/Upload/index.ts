import type { UploadFile } from 'antd/es/upload/interface';
import {
  uploadFileImprove,
} from '@/services';

// change
// percent progress
export function UploadImage(
  value: UploadFile,
  {
    onChange,
  }: {
    onChange?: (value: UploadFile) => void;
  },
) {
  const { originFileObj } = value;

  uploadFileImprove(originFileObj!).then((data) => {
    value.url = createImproveUploadResultFileUrl(data);
    value.status = 'done';
    onChange?.(value);
  });
}

// improve 没有直接返回文件路径，需要自己拼
export const createImproveUploadResultFileUrl = (
  data: Upload.MediaData,
) => {
  const { collectionId, id, file } = data;
  return `${process.env.API_IMPROVE_URL}/api/files/${collectionId}/${id}/${file}`;
};
