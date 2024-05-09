import { defineConfig } from 'umi';
import { merge } from 'lodash';
import proxy from './proxy';
import routerConfig from './router-config';

const { REACT_APP_ENV } = process.env;

const commonConfig = {
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'hash',
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  theme: {
    'primary-color': '#1890ff',
  },
  routes: routerConfig,
  // @ts-ignore
  title: false,
  proxy: (proxy as any)[REACT_APP_ENV || 'prod'],
  manifest: {
    basePath: '/',
  },
};

const developmentConfig: any = merge({}, commonConfig, {
  define: {
    'process.env.REACT_APP_ENV': 'dev',
    'process.env.API_IMPROVE_URL': process.env.API_IMPROVE_URL
  },
});

const productionConfig: any = merge({}, commonConfig, {
  define: {
    'process.env.REACT_APP_ENV': 'prod',
    'process.env.API_IMPROVE_URL': process.env.API_IMPROVE_URL
  },
  chunks: ['antdesigns', 'vendors', 'commons', 'umi'],
  //-----打包配置
  base: '/api/backend/',
  publicPath: '/api/backend/',
  chainWebpack(config: any) {
    // 过滤掉momnet的那些不使用的国际化文件
    config
      .plugin('replace')
      .use(require('webpack').ContextReplacementPlugin)
      // .tap(() => {
      //   return [/moment[/\\]locale$/, /zh-cn/];
      // });

    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          minChunks: 1,
          automaticNameDelimiter: '.',
          cacheGroups: {
            lfpantdesigns: {
              name: 'antdesigns',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](antd|@ant-design)/,
              priority: 10,
            },
            lfpvendors: {
              name: 'vendors',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](lodash|react|dva|postcss)/,
              priority: 10,
            },
            lfpcommons: {
              name: 'commons',
              // 其余同步加载包
              chunks: 'all',
              minChunks: 2,
              priority: 1,
              // 这里需要注意下，webpack5会有问题， 需加上这个 enforce: true，
              // refer: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/257#issuecomment-432594711
              enforce: true,
            },
          },
        },
      },
    });
  },
});

let realConfig;

switch (REACT_APP_ENV) {
  case 'prod':
    realConfig = productionConfig;
    break;
  default:
    realConfig = developmentConfig;
}

export default defineConfig(realConfig);
