// GI 默认使用离线数据模式的站点
const GI_DEPOLY_OFFLINE_SITE = [
  'graphinsight.antv.vision',
  'graphinsight.antgroup.com',
  'localhost',
  '127.0.0.1',
  'gi-external-pre.alipay.com',
  'antv-insight-pre.alipay.com',
  'insight.antv.antgroup.com',
];
/** 是否是开发环境 */
//@ts-ignore
export const IS_DEV_ENV = process.env.NODE_ENV === 'development';

export const GI_SITE = {
  get IS_OFFLINE() {
    const GI_SITE_ENV = localStorage.getItem('GI_SITE_ENV');
    if (!GI_SITE_ENV) {
      return GI_DEPOLY_OFFLINE_SITE.includes(window.location.hostname); //初始化的时候，根据部署白名单
    }
    return GI_SITE_ENV === 'ONLINE' ? false : true;
  },
  get SERVICE_URL() {
    const { hostname, protocol } = window.location;
    const port = 7001;
    let online = `${protocol}//${hostname}:${port}`;
    if (!IS_DEV_ENV) {
      online = window.location.origin + window.location.pathname;
    }

    return GI_SITE.IS_OFFLINE ? 'https://graphinsight-pre.alipay.com' : online;
  },
};

export const GI_LOGO_URL = {
  light: '/public/image/graphinsight.light.svg',
  ali: '/public/image/graphinsight.light.svg',
  dark: '/public/image/graphinsight.dark.svg',
};
export const G6VP_LOGO_URL = {
  light: '/public/image/g6vp.light.svg',
  ali: '/public/image/g6vp.light.svg',
  dark: '/public/image/g6vp.dark.svg',
};

export const LOGO_URL = GI_SITE.IS_OFFLINE ? G6VP_LOGO_URL : GI_LOGO_URL;

export const GI_QR_URL =
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*AC9gR462u1wAAAAAAAAAAAAADmJ7AQ/original';
export const G6VP_QR_URL =
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*H5-ERLOWTqIAAAAAAAAAAAAADmJ7AQ/original';
export const QR_URL = GI_SITE.IS_OFFLINE ? G6VP_QR_URL : GI_QR_URL;
