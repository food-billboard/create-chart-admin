const { REACT_APP_ENV } = process.env;

export default [
  {
    path: '/user',
    // layout: false,
    component: '@/layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: '@/pages/User',
      },
      {
        name: 'register',
        path: '/user/register',
        component: '@/pages/Register',
        title: '注册',
      },
      {
        name: 'forget',
        path: '/user/forget',
        component: '@/pages/Forget',
        title: '忘记密码',
      },
    ],
  },
  {
    path: '/',
    // component: '@/layouts/SecurityLayout',
    // wrappers: ['@/layouts/Authority'],
    routes: [
      {
        path: '/',
        component: '@/layouts/BasicLayout',
        routes: [
          {
            path: '/',
            redirect: '/home',
          },
          {
            path: '/home',
            component: '@/pages/Dashboard',
            name: 'home',
            icon: 'home',
            title: '首页',
          },
          {
            path: '/media',
            name: 'media',
            icon: 'picture',
            title: '媒体资源管理',
            routes: [
              {
                path: '/media',
                component: '@/pages/Media',
              },
              {
                path: '/media/image',
                component: '@/pages/Image',
                title: '图片详情',
                name: 'mediadetailimage',
                hideInMenu: true,
              },
            ],
          },
          {
            path: '/feedback',
            component: '@/pages/Feedback',
            name: 'feedback',
            icon: 'tool',
            title: '反馈管理',
          },
          {
            path: '/screen',
            name: 'screen',
            title: '大屏管理',
            icon: 'fund',
            routes: [
              {
                path: '/screen/list',
                title: '实例管理',
                name: 'list',
                routes: [
                  {
                    path: '/screen/list',
                    component: '@/pages/Screen',
                  },
                ],
              },
              {
                path: '/screen/model',
                title: '模板管理',
                name: 'model',
                routes: [
                  {
                    path: '/screen/model',
                    component: '@/pages/ScreenModel',
                  },
                ],
              },
              {
                path: '/screen/mock',
                title: 'mock数据管理',
                name: 'mock',
                routes: [
                  {
                    path: '/screen/mock',
                    component: '@/pages/ScreenMock',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
