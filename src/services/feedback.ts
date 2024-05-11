import PocketBase, { parseFilter } from '../utils/pocketBaseRequest';

// 反馈列表
export async function getFeedback(data: API_FEEDBACK.GetFeedbackParams): Promise<{
  list: API_FEEDBACK.GetFeedbackData[]
  total: number 
}> {
  const {
    current, 
    pageSize,
    type,
    deal,
    description,
    replay
  } = data
  return PocketBase.collection('screen_feedback').getList(current, pageSize, {
    filter: parseFilter([
      {
        key: 'type',
        value: type,
        operator: '=',
      },
      {
        key: 'deal',
        value: deal,
        operator: '=',
      },
      {
        key: 'description',
        value: description,
        operator: '~',
      },
      {
        key: 'replay',
        value: replay,
        operator: '~',
      },
    ]),
    expand: 'user',
    fields: 'id,description,type,image,deal,expand.user.username,expand.user.avatar,expand.user.id,created,updated',
  }) as any;
}

// 处理完成
export const dealFeedback = (data: { id: string, replay: string }) => {
  return PocketBase.collection('screen_feedback').update(data.id, {
    deal: true,
    replay: data.replay
  });
};
