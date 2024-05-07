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
      list: items.map((item: any) => {
        return {
          ...item,
          id: item.id,
        };
      }),
      total: totalItems,
    };
  }

  return data;
};

export function parseFilter(
  value: {
    key: string;
    value?: any;
    operator?: string;
    ignore?: 'nil' | 'empty-string' | true | null;
  }[],
  operator: '&&' | '||' = '&&',
) {
  return value
    .filter((item) => {
      const { value: itemValue, ignore = true } = item;
      if (!itemValue) {
        if (ignore === 'nil') {
          return !isNil(itemValue);
        } else if (ignore === 'empty-string') {
          return itemValue !== '';
        }
        return false 
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
  const userId = getState().user.currentUser.id;
  return userId;
}
