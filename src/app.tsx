import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

export const dva = {
  config: {
    onError(e: any) {
      console.error(e.message);
    },
  },
}


export const locale = {
  default: 'zh-CN'
}

export const render = (nextRender: any) => {
  nextRender()
}