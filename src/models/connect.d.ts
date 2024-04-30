import { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';

export { GlobalModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    user?: boolean;
    data?: boolean;
    settings?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  data: ProSettings;
  user: UserModelState;
  loading: Loading
  settings: ProSettings
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
