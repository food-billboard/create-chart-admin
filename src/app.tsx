import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

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