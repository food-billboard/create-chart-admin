import { isNil } from 'lodash';
import PocketBase from 'pocketbase';
import { useAnyDva } from '@/hooks';

const pb = new PocketBase(process.env.API_IMPROVE_URL);

pb.beforeSend = function (url, options) {
  // TODO
  return {
    url,
    options,
  };
};

pb.afterSend = function (response, data) {
  console.log(response, data);
  const { status, redirected } = response;
  const { page, perPage, totalItems, items } = data;

  // ? 请求失败
  if (status !== 200) {
    // TODO
  }

  // ? 重定向
  if (redirected) {
    // TODO
  }

  // 列表
  if (!isNil(page) && !isNil(perPage) && !!~totalItems) {
    return {
      data: {
        res: {
          list: items.map((item: any) => {
            return {
              ...item,
              _id: item.id,
            };
          }),
          total: totalItems,
        },
      },
    };
  }

  // 把id变成_id
  if (data.id)
    return {
      ...data,
      _id: data.id,
    };

  return data;
};

export function parseFilter(
  value: {
    key: string;
    value?: any;
    operator?: string;
    ignore?: 'nil' | 'empty-string' | null;
  }[],
  operator: '&&' | '||' = '&&',
) {
  return value
    .filter((item) => {
      const { value: itemValue, ignore = 'empty-string' } = item;
      if (!itemValue) {
        if (ignore === 'nil') {
          return !isNil(itemValue);
        } else if (ignore === 'empty-string') {
          return itemValue !== '';
        }
      }
      return true;
    })
    .map((item) => {
      return `${item.key} ${item.operator || '~'} ${item.value}`;
    })
    .join(` ${operator} `);
}

export default pb;

export function getUserInfo() {
  return '2045448404569423872';
  const { getState } = useAnyDva();
  const userId = getState().user.currentUser._id;
  return userId;
}
