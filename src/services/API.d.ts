declare namespace API {
  export interface CurrentUser {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
    type?: string;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
}

declare namespace API_USER {
  export enum UserRole {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    DEVELOPMENT = 'DEVELOPMENT',
    SUB_DEVELOPMENT = 'SUB_DEVELOPMENT',
    CUSTOMER = 'CUSTOMER',
    USER = 'USER',
  }

  export enum UserStatus {
    SIGNIN = 'SIGNIN',
    SIGNOUT = 'SIGNOUT',
    FREEZE = 'FREEZE',
  }

  export interface IGetUserListParams {
    currPage?: number;
    pageSize?: number;
    start_date?: string;
    end_date?: string;
    role?: keyof typeof UserRole;
    status?: keyof typeof API.UserStatus;
    content?: string;
  }

  export interface IGetUserFansListParams extends IGetUserListParams {
    id: string;
  }

  export interface IGetUserAttentionsListParams extends IGetUserFansListParams {}

  export interface IGetUserFansListRes extends IGetUserListRes {}

  export interface IGetUserAttentionsListRes extends IGetUserListRes {}

  export interface IGetUserListRes {
    total: number;
    list: IGetUserListResData[];
  }

  export interface IGetUserListResData {
    id: string;
    hot: number;
    fans_count: number;
    issue_count: number;
    comment_count: number;
    store_count: number;
    attentions_count: number;
    username: string;
    mobile: number;
    email: string;
    roles: keyof typeof UserRole;
    created: string;
    updated: string;
    status: keyof typeof UserStatus;
    avatar: string;
  }

  export interface IPostUserParams {
    mobile: number;
    password: string;
    email: string;
    username: string;
    avatar: string;
    description: string;
    // role: keyof typeof UserRole
    role: string;
  }

  export interface IPutUserParams extends IPostUserParams {
    id: string;
  }

  export interface IDeleteUserParams extends Pick<IPUTUserParams, 'id'> {}

  export interface IGetUserDetailParams extends IDeleteUserParams {}

  export interface IGetUserDetailRes extends IGetUserListResData {}

  export interface IDeleteUserCommentParams {
    id: string;
  }

  export type TSourceType = 'comment' | 'movie';

  export interface IGetUserCommentListParams
    extends Exclude<IGetUserListParams, 'role' | 'status' | 'content'> {
    id: string;
    source_type?: TSourceType;
    like?: 1 | -1;
    comment?: 1 | -1;
  }

  export interface ICommentData {
    id: string;
    user_info: {
      id: string;
      username: string;
    };
    created: string;
    updated: string;
    sub_comments: number;
    total_like: number;
    source: string;
    source_type: TSourceType;
    content: {
      text: string;
      image: string[];
      video: string[];
    };
  }

  export interface IGetUserCommentListRes {
    total: number;
    list: ICommentData[];
  }

  export type TFeedbackStatus = 'DEALING' | 'DEAL';

  export interface IGetFeedbackListParams
    extends Exclude<IGetUserListParams, 'role' | 'status' | 'content'> {
    status?: TFeedbackStatus;
  }

  export interface IGetFeedbackData {
    id: string;
    user_info: {
      id: string;
      username: string;
    };
    created: string;
    updated: string;
    status: TFeedbackStatus;
    content: {
      text: string;
      image: string[];
      video: string[];
    };
  }

  export interface IGetFeedbackListRes {
    total: number;
    list: IGetFeedbackData[];
  }

  export interface IPutFeedbackParams {
    id: string;
    description?: string;
    status: TFeedbackStatus;
  }

  export interface IDeleteFeedbackParams extends IDeleteUserParams {}

  export interface IGetUserIssueListParams extends Exclude<IGetFeedbackListParams, 'status'> {
    status?: API_DATA.IDataStatus;
  }

  export interface IGetUserIssueData {
    id: string;
    name: string;
    author: {
      id: string;
      username: string;
    };
    created: string;
    updated: string;
    glance: number;
    hot: number;
    rate_person: number;
    total_rate: number;
    status: API_DATA.IDataStatus;
    comment_count: number;
    tag_count: number;
    barrage_count: number;
  }

  export interface IGetUserIssueListRes {
    total: number;
    list: IGetUserIssueData[];
  }

  export interface IGetUserRateData {
    id: string;
    name: string;
    author_rate: number;
    rate_person: number;
    total_rate: number;
    source_type: API_DATA.IDataSourceType;
    created: string;
    value: number;
  }

  export interface IGetUserRateListParams extends Exclude<IGetUserIssueListParams, 'status'> {
    value?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  }

  export interface IGetUserRateListRes {
    total: number;
    list: IGetUserRateData[];
  }
}

declare namespace API_ADMIN {
  export interface IGetAdminInfoRes {
    id: string;
    hot: number;
    fans: number;
    issue: number;
    comment: number;
    store: number;
    attentions: number;
    username: string;
    mobile: number;
    email: string;
    roles: keyof typeof API_USER.API_USER;
    created: string;
    updated: string;
    avatar: string;
    description: string;
  }

  export interface IPutAdminInfoParams {
    username: string;
    avatar: string;
    description: string;
    mobile: number;
    email: string;
    password: string;
  }

  export interface IGetAdminIssueListParams {
    currPage?: number;
    pageSize?: number;
  }

  export interface IGetAdminCommentListParams extends IGetAdminIssueListParams {
    like?: 1 | -1;
    comment?: 1 | -1;
  }

  export interface IGetAdminIssueListData {
    id: string;
    name: string;
    created: string;
    updated: string;
    glance: number;
    hot: number;
    rate_person: number;
    total_rate: number;
    status: API_DATA.IDataStatus;
    barrage_count: number;
    tag_count: number;
    comment_count: number;
    description: string;
    poster: string;
    images: string[];
  }

  export interface IGetAdminIssueListRes {
    list: IGetAdminIssueListData[];
    total: number;
  }

  export interface IGetAdminCommentData {
    id: string;
    created: string;
    updated: string;
    sub_comments: number;
    total_like: number;
    source: string;
    source_type: API_ADMIN.TSourceType;
    content: {
      text: string;
      image: string[];
      video: string[];
    };
  }

  export interface IGetAdminCommentListRes {
    total: number;
    list: IGetAdminCommentData[];
  }
}

declare namespace Upload {
  export type MediaData = {
    // 文件对应的数据id
    collectionId: string;
    // 文件对应的数据集名
    collectionName: string;
    created: string;
    // 文件
    file: string;
    // 文件id
    id: string;
    updated: string;
  };
}

declare namespace API_MEDIA {

  export type ResponseListData<T = any> = {
    data: {
      res: {
        list: T[];
        total: number;
      };
    };
  };

  export type MediaParams = {
    current: number;
    pageSize: number;
    classic?: string;
  };

  export type MediaData = {
    // 文件对应的数据id
    collectionId: string;
    // 文件对应的数据集名
    collectionName: string;
    created: string;
    // 文件
    file: string;
    // 文件id
    id: string;
    updated: string;
  };

  export type MediaDataRes = {
    total: number;
    list: MediaData[];
  };

  export type MediaClassicData = {
    label: string;
    value: string;
  };

  export type AddMediaClassicParams = {
    label: string;
  };

  export type UpdateMediaClassParams = AddMediaClassicParams & {
    value: string;
  };

  export type AddMediaDataParams = {
    collectionId: string;
    id: string;
    file: string;
  };

  export type DeleteMediaDataParams = AddMediaDataParams;
}

declare namespace API_SCREEN {
  export type IGetScreenMockData = {
    data_kind: string;
    id: string;
    description: string;
    config_type: string;
    config: any;
    user: {
      username: string;
      avatar: string;
      id: string;
    };
    created: string;
    updated: string;
  };

  export type IPostScreenMockDataParams = {
    data_kind: string;
    description?: string;
    config_type: Required<IGetScreenMockParams['date_type']>;
    config: any;
  };

  export type IPutScreenMockDataParams = IPostScreenMockDataParams & {
    id: string;
  };

  export type IGetScreenMockRes = {
    total: number;
    list: IGetScreenMockData[];
  };

  export type IGetScreenListParams = {
    currPage?: number;
    pageSize?: number;
    content?: string;
    enable?: '0' | '1';
    created?: [string, string];
    flag?: 'PC' | 'H5';
  };

  export type IGetScreenListData = {
    id: string;
    flag: 'PC' | 'H5';
    name: string;
    description: string;
    created: string;
    updated: string;
    user: {
      username: string;
      avatar: string;
      id: string;
    };
    enable: boolean;
    poster: string;
    version: string;
  };

  export type IGetScreenListRes = {
    total: number;
    list: IGetScreenListData[];
  };

  export type ILeadInScreenParams = {
    id: string;
    type: 'screen' | 'model';
  };

  export type IGetScreenMockParams = {
    content?: string;
    date_type?:
      | 'color'
      | 'date'
      | 'address'
      | 'web'
      | 'text'
      | 'image'
      | 'number'
      | 'boolean'
      | 'name';
  };
}

declare namespace API_FEEDBACK {

  export type GetFeedbackParams = {
    current: number;
    pageSize: number;
    type: string 
    deal: boolean 
    description: string 
    replay: string 
  }

  export type GetFeedbackData = {
    id: string 
    description: string 
    type: string 
    image: string[] 
    deal: boolean 
    replay: string 
    created: string 
    updated: string 
    expand: {
      user: {
        username: string 
        id: string 
        avatar: string 
      }
    }
  }

}
